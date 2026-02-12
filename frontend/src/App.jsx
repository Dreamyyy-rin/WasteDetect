import { useEffect, useMemo, useRef, useState } from "react";

const MODEL_OPTIONS = [
  { value: "yolo13n_clahe", label: "YOLOv13n + CLAHE" },
  { value: "yolo26s", label: "YOLOv26s (Original)" },
];

export default function App() {
  const [tab, setTab] = useState("image"); // "image", "video", "camera"
  const [file, setFile] = useState(null);
  const [model, setModel] = useState(MODEL_OPTIONS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const wsRef = useRef(null);

  // Auto-play video slideshow
  useEffect(() => {
    if (tab !== "video" || !result?.frames || result.frames.length === 0) return;

    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % result.frames.length);
    }, 500); // 500ms per frame

    return () => clearInterval(interval);
  }, [tab, result?.frames]);

  const previewUrl = useMemo(() => {
    if (!file || tab !== "image") return "";
    return URL.createObjectURL(file);
  }, [file, tab]);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0] || null;
    setResult(null);
    setError("");
    setFile(selected);
  };

  const handleDetectImage = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please choose an image first.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", model);

      const response = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Detection failed. Please check the backend logs.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetectVideo = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please choose a video first.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", model);
      formData.append("max_frames", 15);

      const response = await fetch("http://localhost:8000/detect-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Video detection failed.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      console.log("Starting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 480 }, height: { ideal: 360 } },
      });
      console.log("Camera stream obtained");
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            console.log(
              "Video ready, dimensions:",
              videoRef.current.videoWidth,
              "x",
              videoRef.current.videoHeight
            );
            videoRef.current.play();
            resolve();
          };
        });
      }
      setCameraActive(true);
      setError("");

      // Connect WebSocket for real-time detection
      console.log("Connecting to WebSocket...");
      const ws = new WebSocket("ws://localhost:8000/detect-stream");
      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(JSON.stringify({ type: "config", model }));
        console.log("Config message sent, starting capture loop...");
        // Start capture loop immediately for fastest detection
        captureAndSend(ws);
      };
      ws.onmessage = (event) => {
        try {
          const result = JSON.parse(event.data);
          console.log("Detection result:", result.detections?.length, "objects detected");
          setResult(result);
        } catch (e) {
          console.error("Failed to parse WebSocket message:", e);
        }
      };
      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        setError("WebSocket connection failed");
      };
      ws.onclose = () => {
        console.log("WebSocket closed");
      };
      wsRef.current = ws;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to access camera.";
      console.error(msg, err);
      setError(msg);
    }
  };

  const captureAndSend = async (ws) => {
    if (!cameraActive || !videoRef.current || !canvasRef.current) return;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not open, stopping capture. State:", ws?.readyState);
      return;
    }

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn("Video dimensions not ready");
        setTimeout(() => captureAndSend(ws), 100);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setTimeout(() => captureAndSend(ws), 100);
        return;
      }

      ctx.drawImage(video, 0, 0);

      // Use toDataURL with low quality for faster transmission
      const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
      const b64 = dataUrl.split(",")[1];
      
      if (!b64) {
        console.error("Failed to convert canvas to base64");
        setTimeout(() => captureAndSend(ws), 200);
        return;
      }

      try {
        ws.send(JSON.stringify({ type: "frame", data: b64 }));
        console.log(`[Frame sent] ${b64.length} bytes`);
      } catch (e) {
        console.error("WebSocket send error:", e);
      }
    } catch (e) {
      console.error("Capture error:", e);
    }

    // Continue capture loop - 100ms interval for faster detection
    setTimeout(() => captureAndSend(ws), 100);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setCameraActive(false);
    setResult(null);
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Waste Detection Studio</p>
          <h1>Detect waste with your YOLO models.</h1>
          <p className="subtitle">
            Upload a photo, video, or use live camera to inspect detections.
          </p>
        </div>
      </header>

      <div className="tabs">
        <button
          className={`tab ${tab === "image" ? "active" : ""}`}
          onClick={() => {
            setTab("image");
            setResult(null);
          }}
        >
          Image
        </button>
        <button
          className={`tab ${tab === "video" ? "active" : ""}`}
          onClick={() => {
            setTab("video");
            setResult(null);
          }}
        >
          Video
        </button>
        <button
          className={`tab ${tab === "camera" ? "active" : ""}`}
          onClick={() => {
            setTab("camera");
            setResult(null);
          }}
        >
          Live Camera
        </button>
      </div>

      <div className="hero-card">
        <label className="field">
          <span>Model</span>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {tab === "image" && (
          <form onSubmit={handleDetectImage}>
            <label className="field">
              <span>Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <button className="primary" type="submit" disabled={loading}>
              {loading ? "Running detection..." : "Run detection"}
            </button>
          </form>
        )}

        {tab === "video" && (
          <form onSubmit={handleDetectVideo}>
            <label className="field">
              <span>Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
            </label>
            <button className="primary" type="submit" disabled={loading}>
              {loading ? "Processing video..." : "Analyze video"}
            </button>
          </form>
        )}

        {tab === "camera" && (
          <div>
            {!cameraActive ? (
              <button
                className="primary"
                onClick={startCamera}
                type="button"
              >
                Start Camera
              </button>
            ) : (
              <button
                className="primary danger"
                onClick={stopCamera}
                type="button"
              >
                Stop Camera
              </button>
            )}
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>

      <div className="content">
        <div className="panel">
          <h2>
            {tab === "image" && "Image Preview"}
            {tab === "video" && "Video Upload"}
            {tab === "camera" && "Live Feed"}
          </h2>
          {tab === "image" && previewUrl && (
            <img src={previewUrl} alt="Input preview" />
          )}
          {tab === "image" && !previewUrl && (
            <p className="muted">Upload an image to see it here.</p>
          )}
          {tab === "video" && file && <p className="muted">{file.name}</p>}
          {tab === "video" && !file && (
            <p className="muted">Upload a video to analyze.</p>
          )}
          {tab === "camera" && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  backgroundColor: "#f8f0e4",
                }}
              />
              <canvas
                ref={canvasRef}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        <div className="panel">
          <h2>Detection Result</h2>
          {result?.image ? (
            <img src={result?.image} alt="Detection result" />
          ) : result?.frames ? (
            <div className="video-player">
              <img
                src={result.frames[slideIdx]?.image}
                alt="Video frame"
                key={slideIdx}
              />
              <div className="video-controls">
                <button
                  className="control-btn"
                  onClick={() =>
                    setSlideIdx(
                      (slideIdx - 1 + result.frames.length) % result.frames.length
                    )
                  }
                >
                  ← Prev
                </button>
                <span className="frame-info">
                  Frame {slideIdx + 1} / {result.frames.length}
                </span>
                <button
                  className="control-btn"
                  onClick={() =>
                    setSlideIdx((slideIdx + 1) % result.frames.length)
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            <p className="muted">No detections yet.</p>
          )}
        </div>
      </div>

      <section className="insights">
        <h2>Detections</h2>
        {result?.detections?.length ? (
          <div className="chips">
            {result.detections.map((det, index) => (
              <div className="chip" key={`${det.label}-${index}`}>
                <strong>{det.label}</strong>
                <span>{(det.confidence * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">Run detection to see bounding boxes listed.</p>
        )}
      </section>
    </div>
  );
}
