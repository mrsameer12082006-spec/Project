import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * SchemeSathi3DScene
 * Oryzo.ai-inspired Single Persistent 3D Object with Scroll-Linked Choreography
 * 
 * Features:
 * 1. Single 3D Hero Object: SchemeSathi Heraldic Shield & Compounding Passbook Plates.
 * 2. Silky Damped Mouse Inertia (lerp 0.06).
 * 3. Z-Depth Scroll Timeline scrubbing rotation, camera position, and plate separation.
 * 4. Screen-Space 3D Hotspot Pins tracking 3D coordinates.
 * 5. Automatic offscreen pause, tab blur pause, and silent fallback if WebGL is unavailable.
 */
export default function SchemeSathi3DScene({
  activeProfile = 'farmer',
  effectiveOption = 1,
  className = ''
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      return Boolean(gl && gl.getParameter);
    } catch (e) {
      return false;
    }
  });
  const [hotspots, setHotspots] = useState({
    healthcare: { x: 0, y: 0, visible: false },
    housing: { x: 0, y: 0, visible: false },
    farmer: { x: 0, y: 0, visible: false }
  });

  useEffect(() => {
    if (!webglSupported) return;

    // Accessibility: Skip WebGL on prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWebglSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, scene, camera;
    let mainGroup, plateHealthcare, plateHousing, plateFarmer;
    let animId;
    let isRunning = true;
    let isVisible = true;

    // Mouse tracking with inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    // Scroll progress tracker (0.0 to 1.0)
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    try {
      // 1. Renderer Setup
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      // 2. Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(38, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 4.2);

      // 3. Cinematic Studio Lighting (Warm Alabaster + Civic Emerald Rim)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      // Key light from top-left (crisp specular sheen)
      const keyLight = new THREE.DirectionalLight(0xfffaed, 1.6);
      keyLight.position.set(-3, 4, 3);
      scene.add(keyLight);

      // Fill light from bottom-right
      const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.5);
      fillLight.position.set(3, -2, 2);
      scene.add(fillLight);

      // Signature Civic Emerald Rim Light from behind
      const rimLight = new THREE.DirectionalLight(0x059669, 2.2);
      rimLight.position.set(0, 1, -2.5);
      scene.add(rimLight);

      // 4. Construct the SchemeSathi Shield Geometry
      const createShieldGeometry = (scale = 1.0) => {
        const shape = new THREE.Shape();
        // Symmetrical heraldic protective shield
        shape.moveTo(0, 1.15 * scale);
        shape.bezierCurveTo(0.65 * scale, 1.15 * scale, 0.95 * scale, 0.95 * scale, 0.95 * scale, 0.5 * scale);
        shape.bezierCurveTo(0.95 * scale, -0.05 * scale, 0.55 * scale, -0.65 * scale, 0, -1.15 * scale);
        shape.bezierCurveTo(-0.55 * scale, -0.65 * scale, -0.95 * scale, -0.05 * scale, -0.95 * scale, 0.5 * scale);
        shape.bezierCurveTo(-0.95 * scale, 0.95 * scale, -0.65 * scale, 1.15 * scale, 0, 1.15 * scale);

        return new THREE.ExtrudeGeometry(shape, {
          depth: 0.08,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.03,
          bevelSegments: 4
        });
      };

      mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // Materials for the 3 compounding entitlement plates
      const matHealthcare = new THREE.MeshStandardMaterial({
        color: 0x0284c7, // Sky Blue (PM-JAY)
        roughness: 0.22,
        metalness: 0.35,
        clearcoat: 0.4,
        clearcoatRoughness: 0.1
      });

      const matHousing = new THREE.MeshStandardMaterial({
        color: 0xd97706, // Ochre Amber (PMAY-G)
        roughness: 0.22,
        metalness: 0.45,
        clearcoat: 0.4,
        clearcoatRoughness: 0.1
      });

      const matFarmer = new THREE.MeshStandardMaterial({
        color: 0x059669, // Civic Emerald (PM-KISAN)
        roughness: 0.18,
        metalness: 0.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.08
      });

      // Gold-foil bevel edge material
      const matGoldEdge = new THREE.MeshStandardMaterial({
        color: 0xf5f4ee,
        roughness: 0.25,
        metalness: 0.85
      });

      // Plate 1: Healthcare Plate (Base / Back)
      plateHealthcare = new THREE.Mesh(createShieldGeometry(1.0), [matHealthcare, matGoldEdge]);
      plateHealthcare.position.set(0, 0, -0.09);
      mainGroup.add(plateHealthcare);

      // Plate 2: Housing Plate (Middle)
      plateHousing = new THREE.Mesh(createShieldGeometry(0.92), [matHousing, matGoldEdge]);
      plateHousing.position.set(0, 0, 0);
      mainGroup.add(plateHousing);

      // Plate 3: Farmer DBT Shield (Front Emblem)
      plateFarmer = new THREE.Mesh(createShieldGeometry(0.84), [matFarmer, matGoldEdge]);
      plateFarmer.position.set(0, 0, 0.09);
      mainGroup.add(plateFarmer);

      // Inner Core Accent (Crosshair Axis)
      const coreGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 32);
      coreGeom.rotateX(Math.PI / 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x10b981,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.9
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      coreMesh.position.set(0, 0, 0.16);
      mainGroup.add(coreMesh);

      // 5. Mouse Move Handler (Damped Inertia Physics)
      const onMouseMove = (e) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        mouseX = (e.clientX / width - 0.5) * 2;
        mouseY = (e.clientY / height - 0.5) * 2;
        targetRotY = mouseX * 0.45;
        targetRotX = -mouseY * 0.35;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      // 6. Scroll Handler (Scroll-Linked Camera Choreography)
      const onScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        targetScrollProgress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // 7. Resize Handler
      const onResize = () => {
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      window.addEventListener('resize', onResize);

      // 8. Visibility / Offscreen Pause Observer
      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(canvas);

      const onVisibilityChange = () => {
        isVisible = document.visibilityState === 'visible';
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      // Vectors for projecting 3D coordinates to 2D hotspot pins
      const vHealthcare = new THREE.Vector3();
      const vHousing = new THREE.Vector3();
      const vFarmer = new THREE.Vector3();

      let startTime = performance.now();

      // 9. Main Render Loop
      const render = (now) => {
        if (!isRunning) return;

        if (isVisible) {
          const time = (now - startTime) * 0.001;

          // Silky Lerp on Cursor Inertia (Oryzo Damping)
          currentRotX += (targetRotX - currentRotX) * 0.06;
          currentRotY += (targetRotY - currentRotY) * 0.06;

          // Smooth Scroll Progress Lerp
          scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

          // Gentle ambient float
          const floatOffset = Math.sin(time * 1.4) * 0.04;

          // ── Scroll Stage Transformations ──────────────────────
          if (scrollProgress < 0.25) {
            // Chapter 1: Hero Section (Central Hovering Shield)
            const heroT = scrollProgress / 0.25;
            
            // On desktop, position comfortably beside headline & console
            mainGroup.position.x = 0;
            mainGroup.position.y = floatOffset;
            mainGroup.position.z = -heroT * 0.5;

            mainGroup.rotation.x = currentRotX + heroT * 0.2;
            mainGroup.rotation.y = currentRotY + heroT * 0.4;
            mainGroup.rotation.z = Math.sin(time * 0.8) * 0.02;

            // United passbook (plates together)
            plateHealthcare.position.z = -0.08;
            plateHousing.position.z = 0;
            plateFarmer.position.z = 0.08;

            camera.position.z = 4.2;
          } else if (scrollProgress < 0.55) {
            // Chapter 2 & 3: Entitlement Bento (Compounding Exploded View)
            const bentoT = (scrollProgress - 0.25) / 0.3;
            
            mainGroup.position.x = Math.sin(bentoT * Math.PI) * 0.3;
            mainGroup.position.y = floatOffset;
            mainGroup.position.z = -0.3;

            mainGroup.rotation.x = 0.25 + currentRotX * 0.5;
            mainGroup.rotation.y = 0.6 + currentRotY * 0.5;
            mainGroup.rotation.z = 0.05;

            // Explode / Separate the 3 plates in 3D space (Wise / Oryzo pattern)
            const explodeDist = Math.sin(bentoT * Math.PI) * 0.42;
            plateHealthcare.position.set(-explodeDist * 0.5, explodeDist * 0.6, -0.08 - explodeDist);
            plateHousing.position.set(0, 0, 0);
            plateFarmer.position.set(explodeDist * 0.5, -explodeDist * 0.6, 0.08 + explodeDist);

            camera.position.z = 4.2 - bentoT * 0.3;
          } else {
            // Chapter 4: Kiosk Pipeline & Closing Finale
            const endT = (scrollProgress - 0.55) / 0.45;
            
            mainGroup.position.x = 0;
            mainGroup.position.y = -endT * 0.3 + floatOffset;
            mainGroup.position.z = -0.4 - endT * 0.8;

            mainGroup.rotation.x = currentRotX * 0.4;
            mainGroup.rotation.y = time * 0.2 + currentRotY * 0.4;
            mainGroup.rotation.z = 0;

            // Re-collapse plates
            plateHealthcare.position.set(0, 0, -0.08);
            plateHousing.position.set(0, 0, 0);
            plateFarmer.position.set(0, 0, 0.08);

            camera.position.z = 4.2 + endT * 1.5;
          }

          // Project 3D Hotspot Coordinates to 2D Screen Space
          if (scrollProgress > 0.22 && scrollProgress < 0.58) {
            plateHealthcare.getWorldPosition(vHealthcare);
            vHealthcare.project(camera);
            plateHousing.getWorldPosition(vHousing);
            vHousing.project(camera);
            plateFarmer.getWorldPosition(vFarmer);
            vFarmer.project(camera);

            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            setHotspots({
              healthcare: {
                x: (vHealthcare.x * 0.5 + 0.5) * w,
                y: (-(vHealthcare.y * 0.5) + 0.5) * h,
                visible: true
              },
              housing: {
                x: (vHousing.x * 0.5 + 0.5) * w,
                y: (-(vHousing.y * 0.5) + 0.5) * h,
                visible: true
              },
              farmer: {
                x: (vFarmer.x * 0.5 + 0.5) * w,
                y: (-(vFarmer.y * 0.5) + 0.5) * h,
                visible: true
              }
            });
          } else {
            setHotspots(prev => ({
              healthcare: { ...prev.healthcare, visible: false },
              housing: { ...prev.housing, visible: false },
              farmer: { ...prev.farmer, visible: false }
            }));
          }

          renderer.render(scene, camera);
        }

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);

    } catch (err) {
      console.warn('WebGL initialization failed, falling back to pure CSS:', err);
      setWebglSupported(false);
    }

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (renderer) renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return null; // Graceful zero-overhead fallback to CSS
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Screen-Space 3D Hotspot Pins (Oryzo Pattern) */}
      {hotspots.healthcare.visible && (
        <div
          style={{
            transform: `translate3d(${hotspots.healthcare.x}px, ${hotspots.healthcare.y}px, 0) translate(-50%, -100%)`,
            transition: 'opacity 200ms ease'
          }}
          className="absolute pointer-events-auto select-none"
        >
          <div className="spatial-glass px-2.5 py-1 rounded-full border border-sky-400/40 text-[10px] font-extrabold text-sky-900 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
            <span>₹5,00,000 Health Cover</span>
          </div>
        </div>
      )}

      {hotspots.housing.visible && (
        <div
          style={{
            transform: `translate3d(${hotspots.housing.x}px, ${hotspots.housing.y}px, 0) translate(-50%, -100%)`,
            transition: 'opacity 200ms ease'
          }}
          className="absolute pointer-events-auto select-none"
        >
          <div className="spatial-glass px-2.5 py-1 rounded-full border border-amber-400/40 text-[10px] font-extrabold text-amber-900 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>₹1,30,000 Housing Grant</span>
          </div>
        </div>
      )}

      {hotspots.farmer.visible && (
        <div
          style={{
            transform: `translate3d(${hotspots.farmer.x}px, ${hotspots.farmer.y}px, 0) translate(-50%, -100%)`,
            transition: 'opacity 200ms ease'
          }}
          className="absolute pointer-events-auto select-none"
        >
          <div className="spatial-glass px-2.5 py-1 rounded-full border border-emerald-400/40 text-[10px] font-extrabold text-emerald-900 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>₹6,000 Farmer DBT</span>
          </div>
        </div>
      )}
    </div>
  );
}
