import React, { useState, useEffect, useRef } from "react";
import "./DetectionStudio.css";

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(
  /\/+$/,
  "",
);

const DetectionStudio = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedModel, setSelectedModel] = useState("YOLOv13");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState(null);
  const [videoFrames, setVideoFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const changeFileInputRef = useRef(null);

  // Reset state when switching tabs
  useEffect(() => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setError(null);
    setIsDragging(false);
    setVideoFrames([]);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
    setVideoMetadata(null);
  }, [activeTab]);

  // Video playback effect
  useEffect(() => {
    if (!isPlaying || videoFrames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        const next = prev + 1;
        if (next >= videoFrames.length) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 100); // ~10 FPS playback for smoother result

    return () => clearInterval(interval);
  }, [isPlaying, videoFrames.length]);

  // Update detection result when frame index changes
  useEffect(() => {
    if (videoFrames.length > 0 && videoFrames[currentFrameIndex] && videoMetadata) {
      setDetectionResult({
        ...videoFrames[currentFrameIndex],
        total_frames: videoMetadata.total_frames,
        processed_frames: videoFrames.length,
        current_frame: currentFrameIndex + 1
      });
    }
  }, [currentFrameIndex, videoFrames, videoMetadata]);

  const handleFileUpload = (file) => {
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
      // Reset detection result when changing file
      setDetectionResult(null);
      setVideoFrames([]);
      setVideoMetadata(null);
    }
  };

  const handleChangeFile = () => {
    if (changeFileInputRef.current) {
      changeFileInputRef.current.click();
    }
  };

  const handleDetection = async () => {
    if (!uploadedFile) {
      setError(`Please upload ${activeTab === "video" ? "a video" : "an image"} first`);
      return;
    }

    setIsDetecting(true);
    setError(null);
    setDetectionResult(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Convert model name to backend format
      const modelKey =
        selectedModel === "YOLOv13" ? "yolo13n_clahe" : "yolo26s";
      formData.append("model", modelKey);

      // Use different endpoint for video
      const endpoint = activeTab === "video" ? "detect-video" : "detect";
      const response = await fetch(`${apiBase}/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Detection failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // For video, store all frames and display first one
      if (activeTab === "video" && data.frames && data.frames.length > 0) {
        setVideoFrames(data.frames);
        setCurrentFrameIndex(0);
        setVideoMetadata({
          total_frames: data.total_frames,
          processed_frames: data.frames.length
        });
        setDetectionResult({
          ...data.frames[0],
          total_frames: data.total_frames,
          processed_frames: data.frames.length,
          current_frame: 1
        });
      } else {
        setDetectionResult(data);
        setVideoFrames([]);
        setVideoMetadata(null);
      }
    } catch (err) {
      console.error("Detection error:", err);
      setError(
        err.message ||
          "Failed to detect. Make sure the backend server is running.",
      );
    } finally {
      setIsDetecting(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setError(null);
  };

  return (
    <section id="detection" className="detection-studio">
      <div className="detection-container">
        <div className="detection-header">
          <h2 className="detection-title">Detection Studio</h2>
          <p className="detection-description">
            Upload an image or video, or use your camera for real-time waste
            detection
          </p>
        </div>

        <div className="detection-content">
          <div className="model-selection">
            <label className="model-label">Select Detection Model</label>
            <div className="model-options">
              <button
                className={`model-option ${selectedModel === "YOLOv13" ? "active" : ""}`}
                onClick={() => setSelectedModel("YOLOv13")}
              >
                <div className="model-option-header">
                  <span className="model-name">YOLOv13</span>
                  {selectedModel === "YOLOv13" && (
                    <span className="model-badge">Selected</span>
                  )}
                </div>
                <p className="model-desc">
                  Faster inference, optimized for edge devices
                </p>
              </button>
              <button
                className={`model-option ${selectedModel === "YOLOv26" ? "active" : ""}`}
                onClick={() => setSelectedModel("YOLOv26")}
              >
                <div className="model-option-header">
                  <span className="model-name">YOLOv26</span>
                  {selectedModel === "YOLOv26" && (
                    <span className="model-badge">Selected</span>
                  )}
                </div>
                <p className="model-desc">
                  Higher accuracy, larger model architecture
                </p>
              </button>
            </div>
          </div>

          <div className="tab-system">
            <div className="tab-header">
              <button
                className={`tab-button ${activeTab === "image" ? "active" : ""}`}
                onClick={() => setActiveTab("image")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 15.833V4.167C17.5 3.246 16.754 2.5 15.833 2.5H4.167C3.246 2.5 2.5 3.246 2.5 4.167V15.833C2.5 16.754 3.246 17.5 4.167 17.5H15.833C16.754 17.5 17.5 16.754 17.5 15.833Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.083 8.333C7.775 8.333 8.333 7.775 8.333 7.083C8.333 6.391 7.775 5.833 7.083 5.833C6.391 5.833 5.833 6.391 5.833 7.083C5.833 7.775 6.391 8.333 7.083 8.333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 12.5L13.333 8.333L4.167 17.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Image
              </button>
              <button
                className={`tab-button ${activeTab === "video" ? "active" : ""}`}
                onClick={() => setActiveTab("video")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5.833L12.5 9.167V5.833C12.5 4.913 11.754 4.167 10.833 4.167H4.167C3.246 4.167 2.5 4.913 2.5 5.833V14.167C2.5 15.087 3.246 15.833 4.167 15.833H10.833C11.754 15.833 12.5 15.087 12.5 14.167V10.833L17.5 14.167V5.833Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Video
              </button>
              <button
                className={`tab-button ${activeTab === "camera" ? "active" : ""}`}
                onClick={() => setActiveTab("camera")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 13.333C11.381 13.333 12.5 12.214 12.5 10.833C12.5 9.452 11.381 8.333 10 8.333C8.619 8.333 7.5 9.452 7.5 10.833C7.5 12.214 8.619 13.333 10 13.333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 14.167V6.667C2.5 5.746 3.246 5 4.167 5H6.667L8.333 2.5H11.667L13.333 5H15.833C16.754 5 17.5 5.746 17.5 6.667V14.167C17.5 15.087 16.754 15.833 15.833 15.833H4.167C3.246 15.833 2.5 15.087 2.5 14.167Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Live Camera
              </button>
            </div>

            <div className="tab-content">
              {(activeTab === "image" || activeTab === "video") && (
                <div className="upload-detection-layout">
                  <div className="upload-zone">
                    <h3 className="zone-title">
                      Input {activeTab === "image" ? "Image" : "Video"}
                    </h3>
                    {!previewUrl ? (
                      <div
                        className={`dropzone ${isDragging ? "dragging" : ""}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <div className="dropzone-icon">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M42 30V38C42 38.53 41.789 39.039 41.414 39.414C41.039 39.789 40.53 40 40 40H8C7.47 40 6.961 39.789 6.586 39.414C6.211 39.039 6 38.53 6 38V30"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M34 16L24 6L14 16"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M24 6V30"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h3 className="dropzone-title">Click to Upload</h3>
                        <p className="dropzone-description">
                          Upload your image or video by clicking the button
                          below.
                        </p>
                        <label className="dropzone-button">
                          Select File
                          <input
                            type="file"
                            accept={
                              activeTab === "image" ? "image/*" : "video/*"
                            }
                            onChange={handleFileInputChange}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="preview-container">
                        <div className="preview-wrapper">
                          {activeTab === "image" ? (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="preview-image"
                            />
                          ) : (
                            <video
                              src={previewUrl}
                              controls
                              className="preview-video"
                            />
                          )}
                          <button
                            className="change-file-btn"
                            onClick={handleChangeFile}
                            title="Change file"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27542C16.8482 4.26548 15.4745 3.55976 13.9917 3.22426C12.5089 2.88876 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7246C4.87913 17.7147 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <input
                            ref={changeFileInputRef}
                            type="file"
                            accept={
                              activeTab === "image" ? "image/*" : "video/*"
                            }
                            onChange={handleFileInputChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      className="run-detection-button"
                      onClick={handleDetection}
                      disabled={!previewUrl || isDetecting}
                    >
                      {isDetecting ? "Detecting..." : "Start Detection"}
                    </button>

                    {error && <div className="error-message">{error}</div>}
                  </div>

                  <div className="result-zone">
                    <h3 className="zone-title">Detection Result</h3>
                    <div
                      className={`result-placeholder ${detectionResult ? "has-result" : ""}`}
                    >
                      {!previewUrl ? (
                        <>
                          <svg
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="30"
                              cy="30"
                              r="25"
                              stroke="#D4C4B0"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                            />
                            <circle cx="30" cy="30" r="5" fill="#D4C4B0" />
                          </svg>
                          <p>Results will appear here after detection</p>
                        </>
                      ) : detectionResult ? (
                        <div className="detection-results">
                          <div className="annotated-image-container">
                            <div className="result-image-wrapper">
                              <img
                                src={detectionResult.image}
                                alt="Detection Result"
                                className="result-image"
                              />
                              {activeTab === "video" && videoFrames.length > 0 && (
                                <div className="video-overlay-controls">
                                  <button
                                    className="video-overlay-play-btn"
                                    onClick={() => {
                                      if (currentFrameIndex >= videoFrames.length - 1) {
                                        setCurrentFrameIndex(0);
                                      }
                                      setIsPlaying(!isPlaying);
                                    }}
                                  >
                                    {isPlaying ? (
                                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="12" y="8" width="6" height="24" fill="white" rx="2"/>
                                        <rect x="22" y="8" width="6" height="24" fill="white" rx="2"/>
                                      </svg>
                                    ) : (
                                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8L32 20L12 32V8Z" fill="white"/>
                                      </svg>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="detection-info">
                            <div className="info-row">
                              <div className="info-item">
                                <span className="info-label">Model Used:</span>
                                <span className="info-value">
                                  {selectedModel}
                                </span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Detected:</span>
                                <span className="info-value count-badge">
                                  {detectionResult.detections?.length || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="ready-text">Ready for detection</p>
                          <p>
                            Click "Start Detection" to analyze the {activeTab}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "camera" && (
                <div className="camera-container">
                  <div className="camera-feed">
                    <div className="camera-placeholder">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40 53.333C46.443 53.333 51.667 48.109 51.667 41.667C51.667 35.225 46.443 30 40 30C33.557 30 28.333 35.225 28.333 41.667C28.333 48.109 33.557 53.333 40 53.333Z"
                          stroke="#7D5A3D"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 56.667V26.667C10 24.457 11.79 22.667 14 22.667H26.667L33.333 10H46.667L53.333 22.667H66C68.21 22.667 70 24.457 70 26.667V56.667C70 58.877 68.21 60.667 66 60.667H14C11.79 60.667 10 58.877 10 56.667Z"
                          stroke="#7D5A3D"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>Camera feed will appear here</p>
                      <button className="camera-start-button">
                        Start Camera
                      </button>
                    </div>
                  </div>
                  <div className="camera-result">
                    <h3 className="zone-title">Live Detection</h3>
                    <div className="result-placeholder">
                      <p>Real-time detection results will stream here</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetectionStudio;
