from __future__ import annotations

import io
import json
import os

import cv2
from fastapi import FastAPI, File, Form, UploadFile, WebSocket
from fastapi.middleware.cors import CORSMiddleware

try:
    from .inference import ModelRegistry, decode_image
except ImportError:  # Allows running `python main.py` directly.
    from inference import ModelRegistry, decode_image

app = FastAPI(title="Waste Detection API")

def _get_allowed_origins() -> list[str]:
    raw = os.getenv("ALLOWED_ORIGINS")
    if not raw:
        return ["http://localhost:5173", "http://127.0.0.1:5173"]
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


app.add_middleware(
    CORSMiddleware,
    allow_origins=_get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_registry = ModelRegistry()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/detect")
async def detect(
    file: UploadFile = File(...),
    model: str = Form("yolo13n_clahe"),
) -> dict[str, object]:
    image_bytes = await file.read()
    image = decode_image(image_bytes)
    return model_registry.predict(model, image)


@app.post("/detect-video")
async def detect_video(
    file: UploadFile = File(...),
    model: str = Form("yolo13n_clahe"),
    max_frames: int = Form(30),
) -> dict[str, object]:
    """Process video file and return detections for sampled frames."""
    video_bytes = await file.read()
    video_data = io.BytesIO(video_bytes)
    
    # Write to temp file for OpenCV
    import tempfile
    with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp:
        tmp.write(video_bytes)
        tmp_path = tmp.name
    
    cap = cv2.VideoCapture(tmp_path)
    frame_results: list[dict] = []
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_step = max(1, total_frames // max_frames)
    
    frame_idx = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_idx % frame_step == 0 and len(frame_results) < max_frames:
            result = model_registry.process_video_frame(model, frame)
            frame_results.append({
                "frame_number": frame_idx,
                **result,
            })
        
        frame_idx += 1
    
    cap.release()
    
    import os
    os.unlink(tmp_path)
    
    return {
        "total_frames": total_frames,
        "frames": frame_results,
    }


@app.websocket("/detect-stream")
async def detect_stream(websocket: WebSocket) -> None:
    """WebSocket endpoint for live camera stream."""
    await websocket.accept()
    model_key = "yolo13n_clahe"
    frame_count = 0
    print(f"[WebSocket] Client connected")
    
    try:
        while True:
            try:
                data = await websocket.receive_text()
                frame_count += 1
            except Exception as e:
                # Client disconnected or connection closed
                print(f"[WebSocket] Receive error (frame {frame_count}): {e}")
                break
            
            try:
                msg = json.loads(data)
                
                if msg.get("type") == "config":
                    model_key = msg.get("model", "yolo13n_clahe")
                    print(f"[WebSocket] Config set to model: {model_key}")
                elif msg.get("type") == "frame":
                    import base64
                    frame_data_b64 = msg.get("data", "")
                    if not frame_data_b64:
                        print(f"[Frame {frame_count}] Empty frame data!")
                        continue
                    
                    frame_data = base64.b64decode(frame_data_b64)
                    image = decode_image(frame_data)
                    print(f"[Frame {frame_count}] Decoded image shape: {image.shape}")
                    
                    result = model_registry.process_video_frame(model_key, image)
                    print(f"[Frame {frame_count}] Detected {len(result.get('detections', []))} objects")
                    
                    await websocket.send_text(json.dumps(result))
            except json.JSONDecodeError as e:
                print(f"[Frame {frame_count}] JSON decode error: {e}")
            except Exception as e:
                print(f"[Frame {frame_count}] Processing error: {type(e).__name__}: {e}")
    except Exception as e:
        print(f"[WebSocket] Fatal error: {type(e).__name__}: {e}")
    finally:
        print(f"[WebSocket] Client disconnected after {frame_count} frames")
