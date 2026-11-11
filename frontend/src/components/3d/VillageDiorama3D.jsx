import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Sprout, Home as HomeIcon, HeartPulse, RotateCw, ZoomIn, Eye, Sparkles } from 'lucide-react';

/**
 * VillageDiorama3D: A stylized low-poly 3D miniature village diorama
 * built directly with Three.js. Represents the 3 core pillars of Indian
 * central welfare:
 * 1. PM-KISAN: Sprouting agricultural farmland
 * 2. PMAY-G: Kutcha dwelling transforming into a permanent Pucca brick house
 * 3. PM-JAY: Community health dispensary protected by an emerald cover dome
 */
export default function VillageDiorama3D({
  focusZone = 'overview', // 'overview' | 'farm' | 'housing' | 'health'
  hasLand = true,
  isKutcha = true,
  interactive = true,
  className = '',
  height = '480px',
  onSelectZone
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rotationAngleRef = useRef(0.45); // initial yaw
  const targetRotationRef = useRef(0.45);
  const pitchAngleRef = useRef(0.55); // initial isometric pitch
  const targetPitchRef = useRef(0.55);
  const autoRotateRef = useRef(true);

  // Dynamic mesh references for animations
  const cropsRef = useRef([]);
  const kutchaRoofRef = useRef(null);
  const puccaRoofRef = useRef(null);
  const puccaWallsRef = useRef(null);
  const healthDomeRef = useRef(null);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0.8, 0));
  const currentCameraTargetRef = useRef(new THREE.Vector3(0, 0.8, 0));
  const currentCameraPosRef = useRef(new THREE.Vector3(12, 11, 14));

  const [activeZone, setActiveZone] = useState(focusZone);
  const [isRotating, setIsRotating] = useState(true);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  // Sync internal zone with prop
  useEffect(() => {
    setActiveZone(focusZone);
  }, [focusZone]);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

  // Update camera target based on active zone
  useEffect(() => {
    if (activeZone === 'farm') {
      cameraTargetRef.current.set(-2.5, 0.6, 1.8);
      autoRotateRef.current = false;
      setIsRotating(false);
    } else if (activeZone === 'housing') {
      cameraTargetRef.current.set(2.4, 1.2, -1.2);
      autoRotateRef.current = false;
      setIsRotating(false);
    } else if (activeZone === 'health') {
      cameraTargetRef.current.set(-1.8, 1.2, -2.4);
      autoRotateRef.current = false;
      setIsRotating(false);
    } else {
      cameraTargetRef.current.set(0, 0.8, 0);
    }
  }, [activeZone]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!webGlSupported || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const heightPx = container.clientHeight || 480;

    // ── 1. SCENE & CAMERA ──────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = null; // transparent to blend with off-white background
    sceneRef.current = scene;

    // Isometric perspective camera (telephoto feel: fov 30)
    const camera = new THREE.PerspectiveCamera(30, width / heightPx, 0.5, 100);
    camera.position.set(13, 11, 14);
    cameraRef.current = camera;

    // ── 2. RENDERER ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── 3. LIGHTING ───────────────────────────────────────────────
    // Soft warm ambient fill (Indian morning sun)
    const hemiLight = new THREE.HemisphereLight(0xfffaed, 0xb89f82, 0.85);
    scene.add(hemiLight);

    // Main key sunlight casting sharp, clean contact shadows
    const sunLight = new THREE.DirectionalLight(0xfff6dc, 2.2);
    sunLight.position.set(14, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 40;
    const d = 8;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Soft emerald civic rim light (Lusion / Higgsfield edge highlight)
    const rimLight = new THREE.DirectionalLight(0x10b981, 1.1);
    rimLight.position.set(-14, 8, -12);
    scene.add(rimLight);

    // Warm ambient point light at the village center
    const villageWarmth = new THREE.PointLight(0xf59e0b, 1.2, 12);
    villageWarmth.position.set(0, 2.5, 0);
    scene.add(villageWarmth);

    // ── 4. MATERIALS PALETTE ──────────────────────────────────────
    const matTopsoil = new THREE.MeshLambertMaterial({ color: 0x86a873 }); // lush village grass
    const matTerracotta = new THREE.MeshLambertMaterial({ color: 0xc86446 }); // Indian clay / bricks
    const matBedrock = new THREE.MeshLambertMaterial({ color: 0x47382d }); // deep stratum
    const matFurrow = new THREE.MeshLambertMaterial({ color: 0x544133 }); // rich tilled farm soil
    const matWheat = new THREE.MeshLambertMaterial({ color: 0xeab308 }); // golden wheat / harvest
    const matStalk = new THREE.MeshLambertMaterial({ color: 0x22c55e }); // green sprout
    const matPath = new THREE.MeshLambertMaterial({ color: 0xd8caa8 }); // packed clay path
    const matKutchaStraw = new THREE.MeshLambertMaterial({ color: 0xca8a04 }); // thatch roof
    const matMudWall = new THREE.MeshLambertMaterial({ color: 0xb5855a }); // mud plaster
    const matPuccaConcrete = new THREE.MeshLambertMaterial({ color: 0xf5f5f4 }); // whitewashed pucca wall
    const matPuccaTerrace = new THREE.MeshLambertMaterial({ color: 0xb91c1c }); // red terrace brick
    const matWood = new THREE.MeshLambertMaterial({ color: 0x78350f }); // timber beams
    const matWater = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.8
    });
    const matHealthDome = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transmission: 0.85,
      opacity: 0.45,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      reflectivity: 0.8
    });

    // ── 5. BASE DIORAMA PLATFORM ──────────────────────────────────
    const villageGroup = new THREE.Group();
    scene.add(villageGroup);

    // Floating octagonal island
    const baseRadius = 6.2;
    const baseHeight = 1.4;
    const baseGeo = new THREE.CylinderGeometry(baseRadius, baseRadius * 0.94, baseHeight, 16);
    const baseMesh = new THREE.Mesh(baseGeo, matTopsoil);
    baseMesh.position.y = baseHeight / 2;
    baseMesh.receiveShadow = true;
    villageGroup.add(baseMesh);

    // Bedrock layer underneath
    const bedrockGeo = new THREE.CylinderGeometry(baseRadius * 0.94, baseRadius * 0.86, 0.8, 16);
    const bedrockMesh = new THREE.Mesh(bedrockGeo, matBedrock);
    bedrockMesh.position.y = -0.4;
    villageGroup.add(bedrockMesh);

    // Winding clay path
    const pathGeo = new THREE.CylinderGeometry(baseRadius * 0.98, baseRadius * 0.98, 0.05, 16, 1, false, 0, Math.PI * 0.7);
    const pathMesh = new THREE.Mesh(pathGeo, matPath);
    pathMesh.position.y = baseHeight + 0.02;
    pathMesh.receiveShadow = true;
    villageGroup.add(pathMesh);

    // ── 6. ZONE 1: AGRICULTURAL FARMLAND (PM-KISAN ₹6k) ───────────
    const farmGroup = new THREE.Group();
    farmGroup.position.set(-2.5, baseHeight, 1.8);
    villageGroup.add(farmGroup);

    // Tilled soil plot with furrows
    const plotGeo = new THREE.BoxGeometry(3.6, 0.15, 2.6);
    const plotMesh = new THREE.Mesh(plotGeo, matFurrow);
    plotMesh.position.y = 0.08;
    plotMesh.receiveShadow = true;
    farmGroup.add(plotMesh);

    // Furrow mounds
    for (let f = -1; f <= 1; f += 0.65) {
      const moundGeo = new THREE.BoxGeometry(3.4, 0.08, 0.28);
      const mound = new THREE.Mesh(moundGeo, matFurrow);
      mound.position.set(0, 0.18, f);
      farmGroup.add(mound);
    }

    // Instanced sprouting crops (wheat stalks + leaves)
    const crops = [];
    const stalkGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.75, 5);
    const wheatHeadGeo = new THREE.ConeGeometry(0.12, 0.4, 6);

    for (let row = -0.9; row <= 0.9; row += 0.6) {
      for (let col = -1.3; col <= 1.3; col += 0.52) {
        const crop = new THREE.Group();
        crop.position.set(col + (Math.random() - 0.5) * 0.1, 0.2, row);

        const stalk = new THREE.Mesh(stalkGeo, matStalk);
        stalk.position.y = 0.35;
        stalk.castShadow = true;
        crop.add(stalk);

        const wheatHead = new THREE.Mesh(wheatHeadGeo, matWheat);
        wheatHead.position.y = 0.75;
        wheatHead.castShadow = true;
        crop.add(wheatHead);

        crop.scale.set(1, 1, 1);
        farmGroup.add(crop);
        crops.push({
          group: crop,
          baseY: crop.position.y,
          randomOffset: Math.random() * Math.PI * 2
        });
      }
    }
    cropsRef.current = crops;

    // Small stone water channel / canal
    const canalGeo = new THREE.BoxGeometry(0.35, 0.12, 2.6);
    const canal = new THREE.Mesh(canalGeo, matWater);
    canal.position.set(-1.9, 0.12, 0);
    farmGroup.add(canal);

    // ── 7. ZONE 2: RURAL HOMESTEAD (PMAY-G ₹1.30L GRANT) ───────────
    const houseGroup = new THREE.Group();
    houseGroup.position.set(2.4, baseHeight, -1.2);
    villageGroup.add(houseGroup);

    // Common foundation
    const foundationGeo = new THREE.BoxGeometry(2.8, 0.25, 2.4);
    const foundation = new THREE.Mesh(foundationGeo, matTerracotta);
    foundation.position.y = 0.125;
    foundation.receiveShadow = true;
    foundation.castShadow = true;
    houseGroup.add(foundation);

    // Kutcha hut body (mud plastered walls)
    const kutchaWallsGeo = new THREE.BoxGeometry(2.2, 1.2, 1.8);
    const kutchaWalls = new THREE.Mesh(kutchaWallsGeo, matMudWall);
    kutchaWalls.position.y = 0.85;
    kutchaWalls.castShadow = true;
    kutchaWalls.receiveShadow = true;
    houseGroup.add(kutchaWalls);

    // Wooden door
    const doorGeo = new THREE.BoxGeometry(0.45, 0.8, 0.1);
    const door = new THREE.Mesh(doorGeo, matWood);
    door.position.set(0, 0.65, 0.95);
    houseGroup.add(door);

    // Conical Thatched Straw Roof (Kutcha state)
    const thatchGeo = new THREE.ConeGeometry(1.8, 1.1, 7);
    const kutchaRoof = new THREE.Mesh(thatchGeo, matKutchaStraw);
    kutchaRoof.position.y = 1.95;
    kutchaRoof.castShadow = true;
    houseGroup.add(kutchaRoof);
    kutchaRoofRef.current = kutchaRoof;

    // Pucca Upgrade Parts (whitewashed concrete walls + brick parapet terrace)
    const puccaGroup = new THREE.Group();
    puccaGroup.position.y = 0.85;

    const puccaWalls = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.35, 2.0), matPuccaConcrete);
    puccaWalls.castShadow = true;
    puccaWalls.receiveShadow = true;
    puccaGroup.add(puccaWalls);

    // Flat terrace roof with red brick parapet
    const puccaTerrace = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.2, 2.2), matPuccaTerrace);
    puccaTerrace.position.y = 0.75;
    puccaTerrace.castShadow = true;
    puccaGroup.add(puccaTerrace);

    // Rooftop solar water tank (modernization touch)
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.5, 8), matPuccaConcrete);
    tank.position.set(0.6, 1.1, -0.4);
    tank.castShadow = true;
    puccaGroup.add(tank);

    puccaGroup.visible = !isKutcha;
    houseGroup.add(puccaGroup);
    puccaWallsRef.current = puccaGroup;

    // ── 8. ZONE 3: COMMUNITY HEALTH DISPENSARY (PM-JAY ₹5L) ─────────
    const healthGroup = new THREE.Group();
    healthGroup.position.set(-1.8, baseHeight, -2.4);
    villageGroup.add(healthGroup);

    // Clinic building
    const clinicPlinth = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.2, 2.2), matTerracotta);
    clinicPlinth.position.y = 0.1;
    healthGroup.add(clinicPlinth);

    const clinicWalls = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.3, 1.8), matPuccaConcrete);
    clinicWalls.position.y = 0.85;
    clinicWalls.castShadow = true;
    clinicWalls.receiveShadow = true;
    healthGroup.add(clinicWalls);

    // Entrance portico columns
    for (let c of [-0.7, 0.7]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 6), matPuccaConcrete);
      col.position.set(c, 0.75, 1.1);
      col.castShadow = true;
      healthGroup.add(col);
    }
    const porticoRoof = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.15, 0.8), matTerracotta);
    porticoRoof.position.set(0, 1.35, 1.1);
    healthGroup.add(porticoRoof);

    // Emerald Medical Cross Emblem on Pediment
    const crossGroup = new THREE.Group();
    crossGroup.position.set(0, 1.25, 0.92);
    const crossBarV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 0.05), matStalk);
    const crossBarH = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.05), matStalk);
    crossGroup.add(crossBarV);
    crossGroup.add(crossBarH);
    healthGroup.add(crossGroup);

    // Translucent Emerald Cover Dome (Visualizing ₹5 Lakh Cashless Safety Net)
    const domeGeo = new THREE.SphereGeometry(2.2, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const healthDome = new THREE.Mesh(domeGeo, matHealthDome);
    healthDome.position.set(0, 0.2, 0);
    healthGroup.add(healthDome);
    healthDomeRef.current = healthDome;

    // ── 9. VILLAGE CENTER: SACRED BANYAN TREE & WELL ─────────────────
    const centerGroup = new THREE.Group();
    centerGroup.position.set(0.6, baseHeight, 1.0);
    villageGroup.add(centerGroup);

    // Stone well
    const well = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.5, 10, 1, true), matBedrock);
    well.position.y = 0.25;
    well.castShadow = true;
    centerGroup.add(well);

    const wellWater = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.1, 10), matWater);
    wellWater.position.y = 0.3;
    centerGroup.add(wellWater);

    // Banyan Tree trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 2.2, 8), matWood);
    trunk.position.set(0.8, 1.1, -0.6);
    trunk.castShadow = true;
    centerGroup.add(trunk);

    // Multi-cloud foliage canopy
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });
    const leafClouds = [
      { r: 1.1, x: 0.8, y: 2.4, z: -0.6 },
      { r: 0.85, x: 1.4, y: 2.6, z: -0.2 },
      { r: 0.9, x: 0.3, y: 2.5, z: -0.9 },
      { r: 0.7, x: 0.7, y: 3.1, z: -0.5 }
    ];
    for (const lc of leafClouds) {
      const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(lc.r, 1), leafMat);
      leaves.position.set(lc.x, lc.y, lc.z);
      leaves.castShadow = true;
      centerGroup.add(leaves);
    }

    // ── 10. RESIZE & POINTER EVENTS ───────────────────────────────
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const onPointerDown = (e) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      autoRotateRef.current = false;
      setIsRotating(false);
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      targetRotationRef.current += deltaX * 0.008;
      targetPitchRef.current = Math.max(0.2, Math.min(1.1, targetPitchRef.current + deltaY * 0.005));
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ── 11. ANIMATION & CAMERA LOOP ───────────────────────────────
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto-rotation when not interacting
      if (autoRotateRef.current) {
        targetRotationRef.current += 0.0025;
      }

      // Smooth dampening for rotation & pitch
      rotationAngleRef.current += (targetRotationRef.current - rotationAngleRef.current) * 0.08;
      pitchAngleRef.current += (targetPitchRef.current - pitchAngleRef.current) * 0.08;

      // Calculate camera orbit position based on angles
      const radius = activeZone === 'overview' ? 19 : 14;
      const camY = radius * Math.sin(pitchAngleRef.current);
      const camPlanarDist = radius * Math.cos(pitchAngleRef.current);
      const camX = camPlanarDist * Math.sin(rotationAngleRef.current);
      const camZ = camPlanarDist * Math.cos(rotationAngleRef.current);

      // Smooth camera position and lookAt interpolation (Higgsfield-style inertia)
      currentCameraPosRef.current.lerp(new THREE.Vector3(camX, camY, camZ), 0.05);
      currentCameraTargetRef.current.lerp(cameraTargetRef.current, 0.06);

      camera.position.copy(currentCameraPosRef.current);
      camera.lookAt(currentCameraTargetRef.current);

      // Animate Crops (Spring sprout when hasLand === true; gentle wind sway)
      const targetCropScale = hasLand ? 1.0 : 0.15;
      cropsRef.current.forEach((crop, idx) => {
        // Wind oscillation
        const wind = Math.sin(elapsedTime * 2.5 + crop.randomOffset) * 0.04;
        crop.group.rotation.z = wind;
        crop.group.rotation.x = wind * 0.5;

        // Smooth scale interpolation with spring overshoot
        crop.group.scale.y += (targetCropScale - crop.group.scale.y) * 0.12;
        crop.group.scale.x = Math.min(1.0, crop.group.scale.y * 1.1);
        crop.group.scale.z = crop.group.scale.x;
      });

      // Animate Dwelling (Kutcha to Pucca transition)
      if (kutchaRoofRef.current && puccaWallsRef.current) {
        if (isKutcha) {
          kutchaRoofRef.current.visible = true;
          puccaWallsRef.current.visible = false;
          kutchaRoofRef.current.position.y = 1.95 + Math.sin(elapsedTime * 1.5) * 0.01;
        } else {
          kutchaRoofRef.current.visible = false;
          puccaWallsRef.current.visible = true;
        }
      }

      // Animate Health Cover Dome (Gentle rhythmic heartbeat pulse)
      if (healthDomeRef.current) {
        const pulse = 1 + Math.sin(elapsedTime * 2.0) * 0.03;
        healthDomeRef.current.scale.set(pulse, pulse, pulse);
        healthDomeRef.current.material.opacity = 0.38 + Math.sin(elapsedTime * 2.0) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── 12. CLEANUP ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      renderer.dispose();
      scene.clear();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, [webGlSupported, hasLand, isKutcha]);

  const handleToggleAutoRotate = () => {
    autoRotateRef.current = !autoRotateRef.current;
    setIsRotating(autoRotateRef.current);
  };

  const handleSelectPill = (zoneKey) => {
    setActiveZone(zoneKey);
    if (onSelectZone) onSelectZone(zoneKey);
  };

  if (!webGlSupported) {
    return (
      <div className={`relative rounded-3xl bg-emerald-950/5 border border-emerald-900/10 p-8 text-center flex flex-col items-center justify-center ${className}`} style={{ minHeight: height }}>
        <p className="text-sm font-semibold text-zinc-700">3D Village Simulation</p>
        <p className="text-xs text-zinc-500 mt-1">WebGL acceleration is disabled on this device. Standard view enabled.</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-3xl overflow-hidden select-none border border-black/[0.06] shadow-sm bg-gradient-to-b from-[#F7F5EE] via-[#F4F1E8] to-[#EFECE2] ${className}`} style={{ minHeight: height }}>
      
      {/* 3D Canvas Host */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ minHeight: height }} />

      {/* Top Floating Badge: Active Zone Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full spatial-glass text-xs font-bold text-zinc-800 shadow-2xs border border-white/80">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Interactive Village Simulation</span>
        </div>
      </div>

      {/* Top Right: Viewport Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleToggleAutoRotate}
          title={isRotating ? 'Pause Rotation' : 'Auto Rotate'}
          className={`p-2 rounded-full transition-all duration-150 ${
            isRotating
              ? 'bg-[#111111] text-white shadow-xs'
              : 'spatial-glass text-zinc-700 hover:bg-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      {/* Bottom Floating Control Bar (Meshy / Higgsfield Style) */}
      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Zone Selector Pills */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full spatial-glass border border-white/80 shadow-xs max-w-full overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => handleSelectPill('overview')}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeZone === 'overview'
                ? 'spatial-segmented-pill-active'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => handleSelectPill('farm')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              activeZone === 'farm'
                ? 'spatial-segmented-pill-active text-emerald-800'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Sprout className="w-3 h-3 text-emerald-600" />
            <span>Farm (PM-KISAN)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPill('housing')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              activeZone === 'housing'
                ? 'spatial-segmented-pill-active text-amber-800'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <HomeIcon className="w-3 h-3 text-amber-600" />
            <span>Housing (PMAY-G)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPill('health')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              activeZone === 'health'
                ? 'spatial-segmented-pill-active text-sky-800'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <HeartPulse className="w-3 h-3 text-sky-600" />
            <span>Health (PM-JAY)</span>
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full spatial-glass text-[11px] font-semibold text-zinc-500 border border-white/60">
          <span>Drag to rotate 360°</span>
        </div>

      </div>

    </div>
  );
}
