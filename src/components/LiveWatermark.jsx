import React, { useEffect, useRef } from 'react';

/**
 * LiveWatermark: Hardware-Accelerated WebGL Particle & Dynamic Constellation Field
 * Replaces all static designs/watermarks with pure live interactive WebGL particles.
 * 
 * Features:
 * - Real WebGL shader pipeline (Vertex & Fragment shaders)
 * - Anti-aliased glowing circular particles with 3D depth
 * - Dynamic constellation line mesh via gl.LINES
 * - Real-time cursor repulsion physics (mouse interaction)
 * - Contrast-optimized themes: Deep Sapphire/Navy/Amber in light mode; Neon Cyan/Amber in dark mode
 * - Robust Canvas 2D fallback
 * - 30-40 FPS throttle + IntersectionObserver off-screen pausing for 0% CPU impact
 */
export default function LiveWatermark({ variant = 'wm-cloud' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = 0;
    let height = 0;
    let animId = null;
    let isVisible = false;
    let mouse = { x: -9999, y: -9999, radius: 150 };

    // Auto-detect if parent section is Light or Dark
    const isLight = Boolean(container.closest('.section-light'));

    // Contrast-tuned particle palettes
    const lightColors = [
      { r: 2, g: 132, b: 199, a: 0.85 },   // Deep Sapphire
      { r: 15, g: 23, b: 42, a: 0.78 },    // Deep Navy Slate
      { r: 217, g: 119, b: 6, a: 0.85 },   // Deep Amber Gold
      { r: 29, g: 78, b: 216, a: 0.82 },   // Royal Blue
      { r: 13, g: 148, b: 136, a: 0.80 }   // Deep Cyan-Teal
    ];

    const darkColors = [
      { r: 0, g: 240, b: 255, a: 0.90 },   // Electric Cyan
      { r: 56, g: 189, b: 248, a: 0.85 },  // Sky Neon
      { r: 245, g: 158, b: 11, a: 0.90 },  // Cyber Amber Gold
      { r: 168, g: 85, b: 247, a: 0.85 },  // Electric Violet
      { r: 16, g: 185, b: 129, a: 0.85 }   // Cyber Emerald
    ];

    const activePalette = isLight ? lightColors : darkColors;
    const linkBaseColor = isLight ? { r: 2, g: 132, b: 199 } : { r: 56, g: 189, b: 248 };
    const maxLinkDist = isLight ? 125 : 115;
    const maxLinkAlpha = isLight ? 0.40 : 0.28;

    // WebGL Context
    let gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: false }) ||
           canvas.getContext('experimental-webgl', { alpha: true, antialias: true, depth: false });
    } catch {
      gl = null;
    }

    let particles = [];

    function initParticles() {
      particles = [];
      const count = Math.min(Math.max(Math.floor((width * height) / 18000), 45), 75);

      for (let i = 0; i < count; i++) {
        const col = activePalette[Math.floor(Math.random() * activePalette.length)];
        const z = Math.random() * 0.75 + 0.25; // 3D depth factor (0.25 to 1.0)
        
        let vx = (Math.random() - 0.5) * 0.65 * z;
        let vy = (Math.random() - 0.5) * 0.65 * z;

        // Subtle organic movement tailored by section variant
        if (variant.includes('cloud')) {
          vx += 0.2 * z; // Atmospheric horizontal drift
        } else if (variant.includes('ai')) {
          vx *= 1.25;
          vy *= 1.25;
        } else if (variant.includes('circuit')) {
          vx *= 1.15;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx,
          vy,
          baseRadius: (Math.random() * 2.5 + 2.0) * (isLight ? 1.25 : 1.1),
          r: col.r / 255,
          g: col.g / 255,
          b: col.b / 255,
          a: col.a * (Math.random() * 0.25 + 0.75),
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.offsetWidth || 1200;
      height = container.offsetHeight || 600;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      initParticles();
    }

    // -------------------------------------------------------------
    // SHADER COMPILATION
    // -------------------------------------------------------------
    let pointProgram = null;
    let lineProgram = null;
    let ptPosBuffer = null;
    let ptColBuffer = null;
    let ptSizeBuffer = null;
    let linePosBuffer = null;
    let lineColBuffer = null;

    if (gl) {
      function createShader(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          gl.deleteShader(s);
          return null;
        }
        return s;
      }

      function buildProgram(vsSrc, fsSrc) {
        const vs = createShader(gl.VERTEX_SHADER, vsSrc);
        const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
        if (!vs || !fs) return null;
        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        return prog;
      }

      // Point Shaders (Soft glowing anti-aliased circles)
      const ptVs = `
        attribute vec2 a_pos;
        attribute vec4 a_col;
        attribute float a_size;
        uniform vec2 u_res;
        varying vec4 v_col;
        void main() {
          vec2 zeroToOne = a_pos / u_res;
          vec2 clipSpace = (zeroToOne * 2.0) - 1.0;
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
          gl_PointSize = a_size;
          v_col = a_col;
        }
      `;

      const ptFs = `
        precision mediump float;
        varying vec4 v_col;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, dist) * v_col.a;
          gl_FragColor = vec4(v_col.rgb, alpha);
        }
      `;

      // Line Shaders (Dynamic connection mesh)
      const lineVs = `
        attribute vec2 a_pos;
        attribute vec4 a_col;
        uniform vec2 u_res;
        varying vec4 v_col;
        void main() {
          vec2 zeroToOne = a_pos / u_res;
          vec2 clipSpace = (zeroToOne * 2.0) - 1.0;
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
          v_col = a_col;
        }
      `;

      const lineFs = `
        precision mediump float;
        varying vec4 v_col;
        void main() {
          gl_FragColor = v_col;
        }
      `;

      pointProgram = buildProgram(ptVs, ptFs);
      lineProgram = buildProgram(lineVs, lineFs);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      ptPosBuffer = gl.createBuffer();
      ptColBuffer = gl.createBuffer();
      ptSizeBuffer = gl.createBuffer();

      linePosBuffer = gl.createBuffer();
      lineColBuffer = gl.createBuffer();
    }

    const ctx2d = !gl ? canvas.getContext('2d') : null;

    // -------------------------------------------------------------
    // RENDER LOOP (Capped at 35 FPS for silky-smooth low overhead)
    // -------------------------------------------------------------
    const targetFPS = 35;
    const frameInterval = 1000 / targetFPS;
    let lastTime = performance.now();

    function render(now) {
      if (!isVisible) return;
      animId = requestAnimationFrame(render);
      if (!now) now = performance.now();
      const elapsed = now - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = now - (elapsed % frameInterval);

      // 1. Physics update & mouse repulsion
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interactive mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 4.0 * p.z;
          p.y -= (dy / dist) * force * 4.0 * p.z;
        }

        p.pulsePhase += 0.035;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // 2. Hardware WebGL Render Path
      if (gl && pointProgram && lineProgram) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // A. Compute dynamic constellation line segments
        const lineCoords = [];
        const lineColors = [];
        const rNorm = linkBaseColor.r / 255;
        const gNorm = linkBaseColor.g / 255;
        const bNorm = linkBaseColor.b / 255;

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxLinkDist) {
              const alpha = (1 - dist / maxLinkDist) * maxLinkAlpha * Math.min(p1.z, p2.z);
              lineCoords.push(p1.x, p1.y, p2.x, p2.y);
              lineColors.push(rNorm, gNorm, bNorm, alpha, rNorm, gNorm, bNorm, alpha);
            }
          }
        }

        // Draw WebGL Constellation Lines
        if (lineCoords.length > 0) {
          gl.useProgram(lineProgram);
          gl.uniform2f(gl.getUniformLocation(lineProgram, 'u_res'), width, height);

          gl.bindBuffer(gl.ARRAY_BUFFER, linePosBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineCoords), gl.DYNAMIC_DRAW);
          const lPos = gl.getAttribLocation(lineProgram, 'a_pos');
          gl.enableVertexAttribArray(lPos);
          gl.vertexAttribPointer(lPos, 2, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, lineColBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineColors), gl.DYNAMIC_DRAW);
          const lCol = gl.getAttribLocation(lineProgram, 'a_col');
          gl.enableVertexAttribArray(lCol);
          gl.vertexAttribPointer(lCol, 4, gl.FLOAT, false, 0, 0);

          gl.drawArrays(gl.LINES, 0, lineCoords.length / 2);
        }

        // Draw WebGL Glowing Particle Nodes
        gl.useProgram(pointProgram);
        gl.uniform2f(gl.getUniformLocation(pointProgram, 'u_res'), width, height);

        const positions = new Float32Array(particles.length * 2);
        const colors = new Float32Array(particles.length * 4);
        const sizes = new Float32Array(particles.length);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          positions[i * 2] = p.x;
          positions[i * 2 + 1] = p.y;

          const pulseScale = 1 + Math.sin(p.pulsePhase) * 0.22;
          sizes[i] = p.baseRadius * p.z * pulseScale * dpr * 2.4;

          colors[i * 4] = p.r;
          colors[i * 4 + 1] = p.g;
          colors[i * 4 + 2] = p.b;
          colors[i * 4 + 3] = p.a;
        }

        const aPos = gl.getAttribLocation(pointProgram, 'a_pos');
        gl.bindBuffer(gl.ARRAY_BUFFER, ptPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const aCol = gl.getAttribLocation(pointProgram, 'a_col');
        gl.bindBuffer(gl.ARRAY_BUFFER, ptColBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aCol);
        gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, 0, 0);

        const aSize = gl.getAttribLocation(pointProgram, 'a_size');
        gl.bindBuffer(gl.ARRAY_BUFFER, ptSizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aSize);
        gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, particles.length);
      }
      // 3. Canvas 2D Fallback Path
      else if (ctx2d) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        ctx2d.save();
        ctx2d.scale(dpr, dpr);

        // Lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxLinkDist) {
              const alpha = (1 - dist / maxLinkDist) * maxLinkAlpha;
              ctx2d.strokeStyle = isLight 
                ? `rgba(2, 132, 199, ${alpha})` 
                : `rgba(56, 189, 248, ${alpha})`;
              ctx2d.lineWidth = 1.0;
              ctx2d.beginPath();
              ctx2d.moveTo(p1.x, p1.y);
              ctx2d.lineTo(p2.x, p2.y);
              ctx2d.stroke();
            }
          }
        }

        // Particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const pulse = 1 + Math.sin(p.pulsePhase) * 0.22;
          const r = p.baseRadius * p.z * pulse;
          ctx2d.beginPath();
          ctx2d.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx2d.fillStyle = `rgba(${Math.round(p.r * 255)}, ${Math.round(p.g * 255)}, ${Math.round(p.b * 255)}, ${p.a})`;
          ctx2d.fill();
        }
        ctx2d.restore();
      }
    }

    // Mouse movement interaction tracking
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const sectionEl = container.parentElement;
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', onMouseMove);
      sectionEl.addEventListener('mouseleave', onMouseLeave);
    }

    // Visibility-aware execution (pauses when out of viewport)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          lastTime = performance.now();
          animId = requestAnimationFrame(render);
        } else {
          isVisible = false;
          if (animId) cancelAnimationFrame(animId);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(container);
    window.addEventListener('resize', resize);
    resize();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', onMouseMove);
        sectionEl.removeEventListener('mouseleave', onMouseLeave);
      }
      if (animId) cancelAnimationFrame(animId);
    };
  }, [variant]);

  return (
    <div className={`section-watermark section-particle-bg ${variant}`} ref={containerRef}>
      <canvas ref={canvasRef} className="wm-webgl-canvas" />
    </div>
  );
}
