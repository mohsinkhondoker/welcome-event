"use client";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import confittie from "../public/animation/confittie.json";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [scissorPos, setScissorPos] = useState({ y: 0 });
  const [show, setShow] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const isiPhone = () => {
    return /iPhone|iPod/.test(navigator.userAgent);
  };

  useEffect(() => {
    const container = containerRef.current;
    setScissorPos({ y: container.offsetHeight - 90 }); // Initial position at the bottom
    if (/iPhone|iPod/.test(navigator.userAgent)) {
      setIsApple(true);
    }
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
        if (videoRef.current) {
          videoRef.current.play();
          setPlaying(true);
          setShow(false);
        } else {
        }
      }
    }
  };

  const handleMouseDown = (e) => {
    // e.preventDefault();
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e) => {
    // e.preventDefault();
    handleDragMove(e.clientY);
  };

  const handleMouseUp = (e) => {
    // e.preventDefault();
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    // e.preventDefault();
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    // e.preventDefault();
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    // e.preventDefault();
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
      <video ref={videoRef} muted playsInline>
        <source src="/videos/two-welcome-event.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {playing === true && (
          <Lottie
            animationData={confittie}
            loop={false}
            style={{ width: "500px", margin: "0 auto" }}
          />
        )}
      </div>

      {scissorPos.y !== 0 && (
        <img
          src="/images/golden-scissor.png"
          alt="Scissor"
          className="scissor"
          style={{ top: `${scissorPos.y}px`, display: show ? "block" : "none" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      )}
    </div>
  );
}
