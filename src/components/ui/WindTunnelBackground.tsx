'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Vertex shader (pass-through for both shaders)
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// SIMULATION SHADER - Pure horizontal flow (NO MOUSE INTERACTION)
const simulationFragmentShader = `
  uniform sampler2D uVelocityTexture;
  uniform float uDeltaTime;
  
  varying vec2 vUv;
  
  void main() {
    // Simple horizontal flow - no mouse physics here
    vec4 velocity = texture2D(uVelocityTexture, vUv);
    
    // Gentle dissipation
    velocity.rgb *= 0.98;
    
    // Constant horizontal wind (very subtle)
    velocity.x = 0.1;
    
    gl_FragColor = velocity;
  }
`;

// VISUAL SHADER - Renders smoke using velocity field
const visualFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse; // Added for no-slip condition
  uniform sampler2D uVelocityTexture; // Velocity field from simulation
  
  varying vec2 vUv;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // FBM (Fractal Brownian Motion)
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // ========================================
    // AERODYNAMIC FLOW DIVERGENCE (STATELESS)
    // ========================================
    vec2 mousePosNorm = uMouse / uResolution;
    vec2 toPixel = uv - mousePosNorm;
    float distToMouse = length(toPixel);
    float obstacleRadius = 0.04;  // Reduced by 50% (was 0.08)
    float coreRadius = 0.02;      // Solid core
    
    // Hard mask - solid obstacle core (black hole)
    if (distToMouse < coreRadius) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }
    
    // VERTICAL FLOW SEPARATION (Anti-Vortex)
    // Calculate vertical distance from obstacle centerline
    float dy = uv.y - mousePosNorm.y;
    float dx = uv.x - mousePosNorm.x;
    
    // Sharp falloff - flow stays straight until close, then curves sharply
    float influence = smoothstep(obstacleRadius * 2.0, obstacleRadius * 0.5, distToMouse);
    influence = pow(influence, 2.5); // Sharper transition
    
    // VERTICAL DIVERGENCE - Push streamlines away from obstacle Y-plane
    // sign(dy) ensures upper flow goes up, lower flow goes down
    float verticalPush = sign(dy) * influence * 0.12;
    
    // PRESSURE ZONE - Slight compression in front of obstacle (high pressure)
    // Only affects pixels upstream (left side, dx < 0)
    float pressureZone = 0.0;
    if (dx < 0.0 && abs(dy) < obstacleRadius * 1.5) {
      float frontProximity = smoothstep(obstacleRadius * 2.0, obstacleRadius, abs(dx));
      pressureZone = -frontProximity * 0.03; // Slight X compression
    }
    
    // Apply aerodynamic warping
    vec2 warpedUV = uv;
    warpedUV.y += verticalPush;     // Vertical separation
    warpedUV.x += pressureZone;     // Pressure zone squash
    
    // ========================================
    // SMOKE GENERATION (using warped UVs)
    // ========================================
    float speed = 0.5625;
    vec2 flowUV = warpedUV;
    flowUV.x -= uTime * speed;
    
    // EXTREME ANISOTROPIC SCALING
    vec2 aeroUV = vec2(flowUV.x * 0.3, flowUV.y * 6.0);
    
    // Generate volumetric smoke with FBM
    float noise1 = fbm(aeroUV * 3.0);
    float noise2 = fbm(aeroUV * 5.0 + vec2(100.0, 50.0));
    float noise3 = fbm(aeroUV * 8.0 - vec2(50.0, 100.0));
    
    float smoke = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    smoke = pow(smoothstep(-0.3, 0.9, smoke), 1.8);
    
    // Vignette mask
    vec2 vignetteUV = uv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3;
    vignette = smoothstep(0.0, 1.0, vignette);
    smoke *= vignette;
    
    // BRAND COLOR INJECTION
    vec3 darkBlue = vec3(0.12, 0.16, 0.22);
    vec3 greyMid = vec3(0.6, 0.6, 0.65);
    vec3 neonCoral = vec3(1.0, 0.435, 0.380);
    
    vec3 color;
    if (smoke < 0.3) {
      color = mix(darkBlue, greyMid, smoke / 0.3);
    } else {
      float coralFactor = (smoke - 0.3) / 0.7;
      coralFactor = pow(coralFactor, 1.5);
      color = mix(greyMid, neonCoral, coralFactor);
    }
    
    // VELOCITY-FREE BRIGHTNESS - Based on distance to obstacle
    float proximityBrightness = smoothstep(obstacleRadius * 2.0, obstacleRadius, distToMouse);
    color = mix(color, neonCoral, proximityBrightness * 0.4);
    
    // SMOOTH FADE around obstacle boundary (prevents hard edges)
    float edgeFade = smoothstep(coreRadius, coreRadius + 0.04, distToMouse);
    
    float alpha = smoke * 0.4 * edgeFade;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function WindTunnelBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Main renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // FBO SETUP - Ping-pong buffers for velocity field
    const fboResolution = 512; // Balance quality vs performance
    const fboOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType, // Precise velocity values
      stencilBuffer: false,
      depthBuffer: false,
    };

    let velocityFBO_Read = new THREE.WebGLRenderTarget(fboResolution, fboResolution, fboOptions);
    let velocityFBO_Write = new THREE.WebGLRenderTarget(fboResolution, fboResolution, fboOptions);

    // SIMULATION SCENE (for velocity calculation)
    const simulationScene = new THREE.Scene();
    const simulationCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const simulationUniforms = {
      uVelocityTexture: { value: null as THREE.Texture | null },
      uDeltaTime: { value: 0 },
    };

    const simulationMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: simulationFragmentShader,
      uniforms: simulationUniforms,
    });

    const simulationQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simulationMaterial);
    simulationScene.add(simulationQuad);

    // VISUAL SCENE (final render)
    const visualScene = new THREE.Scene();
    const visualCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const visualUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0, 0) }, // Added for no-slip condition
      uVelocityTexture: { value: null as THREE.Texture | null },
    };

    const visualMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: visualFragmentShader,
      uniforms: visualUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const visualQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), visualMaterial);
    visualScene.add(visualQuad);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = window.innerHeight - e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      renderer.setSize(newWidth, newHeight);
      visualUniforms.uResolution.value.set(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop with ping-pong
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const deltaTime = clock.getDelta();

      // Update uniforms
      simulationUniforms.uDeltaTime.value = deltaTime;
      visualUniforms.uTime.value = clock.getElapsedTime();
      visualUniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // SIMULATION PASS - Render velocity field to write buffer
      simulationUniforms.uVelocityTexture.value = velocityFBO_Read.texture;
      renderer.setRenderTarget(velocityFBO_Write);
      renderer.render(simulationScene, simulationCamera);

      // VISUAL PASS - Render final image using velocity field
      visualUniforms.uVelocityTexture.value = velocityFBO_Read.texture;
      renderer.setRenderTarget(null);
      renderer.render(visualScene, visualCamera);

      // PING-PONG SWAP
      [velocityFBO_Read, velocityFBO_Write] = [velocityFBO_Write, velocityFBO_Read];

      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose FBOs
      velocityFBO_Read.dispose();
      velocityFBO_Write.dispose();

      // Dispose Scenes
      simulationScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      visualScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      // Critical: Force context loss to prevent "Too many active WebGL contexts" error
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
