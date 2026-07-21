"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050507, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const count = window.innerWidth < 700 ? 650 : 1400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const white = new THREE.Color(0xf5f2ff);
    const purple = new THREE.Color(0x9257ff);
    const cyan = new THREE.Color(0x55e6d2);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positions[offset] = (Math.random() - 0.5) * 18;
      positions[offset + 1] = (Math.random() - 0.5) * 14;
      positions[offset + 2] = Math.random() * -16 + 3;

      const color = index % 19 === 0 ? cyan : index % 7 === 0 ? purple : white;
      colors[offset] = color.r;
      colors[offset + 1] = color.g;
      colors[offset + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: window.innerWidth < 700 ? 0.035 : 0.026,
      transparent: true,
      opacity: 0.76,
      vertexColors: true,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.34;
      pointerY = (event.clientY / window.innerHeight - 0.5) * -0.28;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const render = () => {
      points.rotation.y += 0.00042;
      points.rotation.z += 0.00012;
      camera.position.x += (pointerX - camera.position.x) * 0.018;
      camera.position.y += (pointerY - camera.position.y) * 0.018;
      camera.position.z = 4 - Math.min(window.scrollY * 0.00022, 1.3);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener("resize", onResize);
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });
    if (reducedMotion) renderer.render(scene, camera);
    else render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="starfield" ref={hostRef} aria-hidden="true" />;
}
