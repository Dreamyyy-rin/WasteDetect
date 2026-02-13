import React, { useState } from "react";
import "./DetectionStudio.css";

const DetectionStudio = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedModel, setSelectedModel] = useState("YOLOv13");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    }
  };

  const handleDetection = () => {
    // Placeholder for backend integration
    console.log("Running detection with model:", selectedModel);
    console.log("Input type:", activeTab);
    console.log("File:", uploadedFile);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
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
          {/* Model Selection */}
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

          {/* Tab System */}
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
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M52.5 37.5V47.5C52.5 48.163 52.237 48.799 51.768 49.268C51.299 49.737 50.663 50 50 50H10C9.337 50 8.701 49.737 8.232 49.268C7.763 48.799 7.5 48.163 7.5 47.5V37.5"
                            stroke="#7D5A3D"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M42.5 20L30 7.5L17.5 20"
                            stroke="#7D5A3D"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M30 7.5V37.5"
                            stroke="#7D5A3D"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="dropzone-text">
                          Drag and drop your {activeTab} here
                        </p>
                        <p className="dropzone-subtext">or</p>
                        <label className="dropzone-button">
                          Browse Files
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
                        <button className="reset-button" onClick={handleReset}>
                          Upload Different File
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="result-zone">
                    <h3 className="zone-title">Detection Result</h3>
                    <div className="result-placeholder">
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
                      ) : (
                        <>
                          <p className="ready-text">Ready for detection</p>
                          <button
                            className="run-detection-button"
                            onClick={handleDetection}
                          >
                            Run Detection
                          </button>
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
