'use client';

import { useEffect, useRef } from 'react';
import type { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three';
import styles from './OrganicHome.module.css';

const DESKTOP_SEGMENTS = { x: 72, y: 44 };
const MOBILE_SEGMENTS = { x: 42, y: 26 };

export function OrganicHeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cleanup = () => undefined;
    let cancelled = false;

    void import('three')
      .then((THREE) => {
        if (cancelled) return;

        const isMobile = window.matchMedia('(max-width: 760px)').matches;
        const segments = isMobile || reducedMotion ? MOBILE_SEGMENTS : DESKTOP_SEGMENTS;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: !isMobile && !reducedMotion,
          powerPreference: 'high-performance',
        });

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(
          reducedMotion ? 1 : Math.min(window.devicePixelRatio || 1, isMobile ? 1.1 : 1.5),
        );
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
        camera.position.set(0, 0, 7.1);

        const currentGroup = new THREE.Group();
        currentGroup.position.set(isMobile ? 0.9 : 1.75, isMobile ? -0.45 : -0.15, 0);
        currentGroup.rotation.set(-0.12, -0.34, -0.1);
        scene.add(currentGroup);

        const geometry = new THREE.PlaneGeometry(8.4, 6.2, segments.x, segments.y);
        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: {
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2(0, 0) },
            uSea: { value: new THREE.Color('#79b8b1') },
            uFoam: { value: new THREE.Color('#fff4e4') },
            uOxide: { value: new THREE.Color('#ef8c62') },
            uOpacity: { value: reducedMotion ? 0.5 : isMobile ? 0.48 : 0.68 },
          },
          vertexShader: `
            uniform float uTime;
            uniform vec2 uPointer;
            varying vec2 vUv;
            varying float vWave;

            void main() {
              vUv = uv;
              vec3 point = position;
              float broad = sin(point.x * 0.72 + uTime * 0.38) * 0.34;
              float cross = sin(point.y * 1.45 - uTime * 0.27) * 0.16;
              float detail = sin((point.x + point.y) * 2.35 + uTime * 0.58) * 0.055;
              float pointerLift = (uPointer.x * point.y - uPointer.y * point.x) * 0.045;

              point.z += broad + cross + detail + pointerLift;
              point.y += sin(point.x * 0.58 + uTime * 0.22) * 0.11;
              point.x += cos(point.y * 0.54 - uTime * 0.18) * 0.06;

              vWave = broad + cross;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 uSea;
            uniform vec3 uFoam;
            uniform vec3 uOxide;
            uniform float uOpacity;
            varying vec2 vUv;
            varying float vWave;

            void main() {
              float lowerEdge = 0.19 + sin(vUv.x * 5.2) * 0.07;
              float upperEdge = 0.82 + cos(vUv.x * 4.4 + 0.8) * 0.08;
              float lowerMask = smoothstep(lowerEdge, lowerEdge + 0.055, vUv.y);
              float upperMask = 1.0 - smoothstep(upperEdge - 0.055, upperEdge, vUv.y);
              float sideMask = smoothstep(0.01, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 0.99, vUv.x));
              float ribbon = lowerMask * upperMask * sideMask;

              float tide = smoothstep(0.18, 0.82, vUv.x + vWave * 0.22);
              vec3 color = mix(uSea, uFoam, tide);
              color = mix(color, uOxide, smoothstep(0.58, 0.98, vUv.x) * 0.42);

              float highlight = pow(max(0.0, 1.0 - abs(vWave) * 1.9), 3.0);
              float alpha = ribbon * (0.18 + highlight * 0.36) * uOpacity;
              gl_FragColor = vec4(color, alpha);
            }
          `,
        });

        const current = new THREE.Mesh(geometry, material);
        currentGroup.add(current);

        const contourMaterials = [
          new THREE.LineBasicMaterial({ color: '#fff4e4', transparent: true, opacity: 0.42 }),
          new THREE.LineBasicMaterial({ color: '#ef8c62', transparent: true, opacity: 0.55 }),
          new THREE.LineBasicMaterial({ color: '#9dd0c9', transparent: true, opacity: 0.34 }),
        ];
        const contourLines: Array<Line<BufferGeometry, LineBasicMaterial>> = [];

        contourMaterials.forEach((lineMaterial, index) => {
          const points: Vector3[] = [];
          const pointCount = isMobile ? 52 : 82;

          for (let pointIndex = 0; pointIndex < pointCount; pointIndex += 1) {
            const progress = pointIndex / (pointCount - 1);
            const x = -4.15 + progress * 8.3;
            const baseline = -1.25 + index * 1.18;
            const y = baseline + Math.sin(progress * Math.PI * 2.2 + index * 0.8) * 0.38;
            const z = 0.38 + Math.cos(progress * Math.PI * 3 + index) * 0.14;
            points.push(new THREE.Vector3(x, y, z));
          }

          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          line.userData.phase = index * 1.7;
          contourLines.push(line);
          currentGroup.add(line);
        });

        const particleCount = isMobile ? 44 : 92;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let index = 0; index < particleCount; index += 1) {
          const seed = (index * 0.61803398875) % 1;
          particlePositions[index * 3] = -3.9 + seed * 7.8;
          particlePositions[index * 3 + 1] = -2.25 + ((index * 0.38196601125) % 1) * 4.5;
          particlePositions[index * 3 + 2] = 0.25 + ((index * 0.2360679) % 1) * 0.7;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particleMaterial = new THREE.PointsMaterial({
          color: '#fff4e4',
          transparent: true,
          opacity: 0.46,
          size: isMobile ? 0.028 : 0.034,
          sizeAttenuation: true,
          depthWrite: false,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        currentGroup.add(particles);

        const pointerTarget = new THREE.Vector2(0, 0);
        const pointerCurrent = new THREE.Vector2(0, 0);
        let elapsed = 0;
        let lastFrameTime = performance.now();
        let animationFrame = 0;
        let isVisible = true;
        let isDocumentVisible = !document.hidden;

        const resize = () => {
          const { width, height } = host.getBoundingClientRect();
          if (width < 1 || height < 1) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        const disposeScene = () => {
          geometry.dispose();
          material.dispose();
          contourLines.forEach((line) => line.geometry.dispose());
          contourMaterials.forEach((lineMaterial) => lineMaterial.dispose());
          particleGeometry.dispose();
          particleMaterial.dispose();
          renderer.dispose();
        };

        if (reducedMotion) {
          const renderStaticScene = () => {
            resize();
            material.uniforms.uTime.value = 1.4;
            renderer.render(scene, camera);
            host.dataset.sceneState = 'static';
          };
          const staticResizeObserver = new ResizeObserver(renderStaticScene);

          staticResizeObserver.observe(host);
          renderStaticScene();
          cleanup = () => {
            staticResizeObserver.disconnect();
            disposeScene();
          };
          return;
        }

        const renderFrame = () => {
          if (!isVisible || !isDocumentVisible) {
            animationFrame = 0;
            return;
          }

          const now = performance.now();
          elapsed += Math.min((now - lastFrameTime) / 1000, 0.1);
          lastFrameTime = now;
          pointerCurrent.lerp(pointerTarget, 0.045);
          material.uniforms.uTime.value = elapsed;
          material.uniforms.uPointer.value.copy(pointerCurrent);

          currentGroup.rotation.y = -0.34 + pointerCurrent.x * 0.075;
          currentGroup.rotation.x = -0.12 - pointerCurrent.y * 0.055;
          currentGroup.position.y = (isMobile ? -0.45 : -0.15) + pointerCurrent.y * 0.08;
          particles.rotation.z = elapsed * 0.018;
          particles.position.x = Math.sin(elapsed * 0.16) * 0.08;

          contourLines.forEach((line) => {
            line.position.y = Math.sin(elapsed * 0.24 + Number(line.userData.phase)) * 0.055;
            line.rotation.z = Math.sin(elapsed * 0.13 + Number(line.userData.phase)) * 0.018;
          });

          renderer.render(scene, camera);
          host.dataset.sceneState = 'ready';
          animationFrame = window.requestAnimationFrame(renderFrame);
        };

        const start = () => {
          if (animationFrame || !isVisible || !isDocumentVisible) return;
          lastFrameTime = performance.now();
          animationFrame = window.requestAnimationFrame(renderFrame);
        };

        const stop = () => {
          if (!animationFrame) return;
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        };

        const handlePointer = (event: PointerEvent) => {
          const bounds = host.getBoundingClientRect();
          pointerTarget.set(
            ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
            -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
          );
        };

        const handlePointerLeave = () => pointerTarget.set(0, 0);
        const handleVisibility = () => {
          isDocumentVisible = !document.hidden;
          if (isDocumentVisible) start();
          else stop();
        };

        const intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            isVisible = Boolean(entry?.isIntersecting);
            if (isVisible) start();
            else stop();
          },
          { rootMargin: '120px 0px' },
        );
        const resizeObserver = new ResizeObserver(resize);

        window.addEventListener('pointermove', handlePointer, { passive: true });
        window.addEventListener('blur', handlePointerLeave);
        document.addEventListener('visibilitychange', handleVisibility);
        intersectionObserver.observe(host);
        resizeObserver.observe(host);
        resize();
        start();

        cleanup = () => {
          stop();
          window.removeEventListener('pointermove', handlePointer);
          window.removeEventListener('blur', handlePointerLeave);
          document.removeEventListener('visibilitychange', handleVisibility);
          intersectionObserver.disconnect();
          resizeObserver.disconnect();
          disposeScene();
        };
      })
      .catch(() => {
        host.dataset.sceneState = 'fallback';
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.heroScene} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.heroCanvas} data-hero-canvas="black-sea-current" />
    </div>
  );
}
