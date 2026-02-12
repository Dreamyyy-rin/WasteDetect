from __future__ import annotations

import base64
from pathlib import Path
from typing import Any

import cv2
import numpy as np
from ultralytics import YOLO

MODEL_CANDIDATES: dict[str, list[str]] = {
    "yolo13n_clahe": ["YOLOv13nClahe.onnx", "YOLOv13nClahe.pt"],
    "yolo26s": ["YOLOv26s.onnx", "YOLOv26s.pt"],
}


def _default_model_paths() -> dict[str, Path]:
    model_dir = Path(__file__).resolve().parents[1] / "models"
    selected: dict[str, Path] = {}
    for key, candidates in MODEL_CANDIDATES.items():
        for filename in candidates:
            path = model_dir / filename
            if path.exists():
                selected[key] = path
                break
        if key not in selected:
            selected[key] = model_dir / candidates[0]
    return selected


def decode_image(image_bytes: bytes) -> np.ndarray:
    data = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Invalid image data")
    return image


def encode_image_base64(image: np.ndarray) -> str:
    success, buffer = cv2.imencode(".jpg", image)
    if not success:
        raise ValueError("Failed to encode image")
    encoded = base64.b64encode(buffer.tobytes()).decode("ascii")
    return f"data:image/jpeg;base64,{encoded}"


def apply_clahe(image: np.ndarray) -> np.ndarray:
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l_clahe = clahe.apply(l_channel)
    merged = cv2.merge((l_clahe, a_channel, b_channel))
    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)


class ModelRegistry:
    def __init__(self, model_paths: dict[str, Path] | None = None) -> None:
        paths = model_paths or _default_model_paths()
        missing = [key for key, path in paths.items() if not path.exists()]
        if missing:
            missing_list = ", ".join(missing)
            raise FileNotFoundError(f"Missing model files for: {missing_list}")
        # Explicit task avoids warnings for ONNX models without metadata.
        self._models = {key: YOLO(str(path), task="detect") for key, path in paths.items()}

    def predict(self, model_key: str, image: np.ndarray) -> dict[str, Any]:
        if model_key not in self._models:
            raise ValueError("Unknown model key")
        if model_key == "yolo13n_clahe":
            image = apply_clahe(image)
        results = self._models[model_key](image)
        result = results[0]
        detections: list[dict[str, Any]] = []
        if result.boxes is not None:
            for box in result.boxes:
                xyxy = [float(x) for x in box.xyxy[0].tolist()]
                conf = float(box.conf[0])
                cls_id = int(box.cls[0])
                label = result.names.get(cls_id, str(cls_id))
                detections.append(
                    {
                        "label": label,
                        "confidence": conf,
                        "bbox": xyxy,
                    }
                )
        annotated = result.plot()
        return {
            "model": model_key,
            "detections": detections,
            "image": encode_image_base64(annotated),
        }

    def process_video_frame(self, model_key: str, frame: np.ndarray) -> dict[str, Any]:
        """Process a single video frame."""
        return self.predict(model_key, frame)
