# Waste Detection Backend

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```
pip install -r requirements.txt
```

## Run

```
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /health` - Health check
- `POST /detect` - Detect waste in a single image (multipart form-data: `file`, `model`)
- `POST /detect-video` - Detect waste in video file (multipart form-data: `file`, `model`, `max_frames`)
- `WS /detect-stream` - WebSocket endpoint for live camera stream (send JSON: `{"type": "config", "model": "yolo13n_clahe"}` or `{"type": "frame", "data": "base64_image"}`)

Model keys:
- `yolo13n_clahe`
- `yolo26s`

## ONNX export (recommended if .pt fails to load)

If your `.pt` was trained with custom layers, export to ONNX from the training environment:

```
yolo export model=YOLOv13nClahe.pt format=onnx
yolo export model=YOLOv26s.pt format=onnx
```

Copy the resulting `.onnx` files into `backend/models/` as:

- `YOLOv13nClahe.onnx`
- `YOLOv26s.onnx`

The backend will auto-pick `.onnx` if present.
