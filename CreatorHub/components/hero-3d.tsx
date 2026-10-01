"use client";

import { useRef } from "react";

export function Hero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", `${x * 14}deg`);
    el.style.setProperty("--my", `${y * -12}deg`);
  }

  function reset() {
    const el = sceneRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0deg");
    el.style.setProperty("--my", "0deg");
  }

  return (
    <div ref={sceneRef} className="hero-3d" onPointerMove={handleMove} onPointerLeave={reset}>
      <div className="hero-3d-glow glow-one" />
      <div className="hero-3d-glow glow-two" />
      <div className="hero-3d-glow glow-three" />
      <div className="scene-3d">
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="cube-3d" aria-hidden="true">
          <div className="cube-face cube-front"><span>AI</span><small>CREATE</small></div>
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
        <div className="float-card float-card-one"><span className="mini-icon">✦</span><div><strong>AI PROMPT</strong><small>Generated</small></div></div>
        <div className="float-card float-card-two"><span className="mini-icon pink">◈</span><div><strong>CONTENT</strong><small>Ready to publish</small></div></div>
        <div className="float-card float-card-three"><span className="mini-icon cyan">↗</span><div><strong>GROW</strong><small>Creator workflow</small></div></div>
        <div className="particle particle-one" />
        <div className="particle particle-two" />
        <div className="particle particle-three" />
        <div className="particle particle-four" />
      </div>
    </div>
  );
}
