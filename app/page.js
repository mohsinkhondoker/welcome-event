"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scissorPos, setScissorPos] = useState({ y: 0 });
  const [show, setShow] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    setScissorPos({ y: container.offsetHeight - 90 }); // Initial position at the bottom
  }, []);

  const handleDragStart = (clientY) => {
    setIsDragging(true);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const middle = containerRect.height / 2;
    const newY = clientY - containerRect.top;

    if (newY >= 0 && newY <= containerRect.height) {
      setScissorPos({ y: newY });

      if (newY >= middle - 50 && newY <= middle + 50 && !playing) {
        videoRef.current.play();
        setPlaying(true);
        setShow(false);
      }
    }
  };

  const handleMouseDown = (e) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="video-background-animation" ref={containerRef}>
      <video ref={videoRef} muted>
        <source src="/videos/welcome-event.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="content">
        <h1>Welcome to My Website</h1>
        <p>This is some overlay text</p>
      </div> */}
      <img
        src="/images/golden-scissor.png"
        alt="Scissor"
        className="scissor "
        style={{ top: `${scissorPos.y}px`, display: show ? "block" : "none" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
}
