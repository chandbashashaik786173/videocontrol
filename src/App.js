import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);
  const speedOverlayRefs = useRef([]);

  const videoUrls = [
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    "https://www.w3schools.com/html/movie.mp4",
  ];

  useEffect(() => {
    if (activeVideoIndex !== null) {
      videoRefs.current[activeVideoIndex].playbackRate = playbackSpeed;
      speedOverlayRefs.current[
        activeVideoIndex
      ].innerText = `${playbackSpeed.toFixed(2)}x`;
    }

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          adjustSpeed(0.25);
          break;
        case "ArrowDown":
          adjustSpeed(-0.25);
          break;
        case "r":
          resetSpeed();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playbackSpeed, activeVideoIndex]);

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const adjustSpeed = (increment) => {
    const newSpeed = Math.min(Math.max(playbackSpeed + increment, 0.25), 2);
    handleSpeedChange(newSpeed);
  };

  const resetSpeed = () => {
    handleSpeedChange(1);
  };

  const handleVideoPlay = (index) => {
    setActiveVideoIndex(index);
  };

  return (
    <div className="container">
      <h1 className="header">Online Video Playback Speed Control</h1>
      <div className="video-grid">
        {videoUrls.map((url, index) => (
          <div key={index} className="video-container">
            <div
              className="video-overlay"
              ref={(el) => (speedOverlayRefs.current[index] = el)}
            >
              {activeVideoIndex === index ? `${playbackSpeed.toFixed(2)}x` : ""}
            </div>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              controls
              width="100%"
              style={{ borderRadius: "8px", marginBottom: "10px" }}
              onPlay={() => handleVideoPlay(index)}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="video-title">Video {index + 1}</h3>
          </div>
        ))}
      </div>

      <div className="speed-buttons">
        <button onClick={() => handleSpeedChange(0.5)} className="button">
          0.5x
        </button>
        <button onClick={() => handleSpeedChange(1)} className="button">
          1x (Normal)
        </button>
        <button onClick={() => handleSpeedChange(1.5)} className="button">
          1.5x
        </button>
        <button onClick={() => handleSpeedChange(2)} className="button">
          2x
        </button>
      </div>

      <div className="shortcuts">
        <p>
          <strong>Keyboard Shortcuts:</strong>
        </p>
        <p>
          <strong>Arrow Up:</strong> Increase Speed
        </p>
        <p>
          <strong>Arrow Down:</strong> Decrease Speed
        </p>
        <p>
          <strong>R:</strong> Reset Speed to 1x
        </p>
      </div>
    </div>
  );
};

export default App;
