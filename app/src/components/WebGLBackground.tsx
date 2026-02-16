/**
 * WebGL Background - High-Velocity Data Stream
 * 
 * Three.js Custom Shader implementing:
 * - Stateless Domain Warping with Simplex Noise and FBM
 * - Aerodynamic smoke flowing horizontally (Left to Right)
 * - Vertical Flow Split based on cursor position (uMouse)
 * - Deep Blue base with Coral (#FF6F61) highlights
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// GLSL Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// GLSL Fragment Shader - Aerodynamic Smoke with Domain Warping
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // Simplex Noise Functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  // Fractal Brownian Motion
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  // Domain Warping - creates the flowing smoke effect
  float domainWarp(vec3 p) {
    vec3 q = vec3(
      fbm(p + vec3(0.0, 0.0, 0.0)),
      fbm(p + vec3(5.2, 1.3, 2.8)),
      fbm(p + vec3(1.7, 9.2, 3.1))
    );
    
    return fbm(p + 1.5 * q);
  }
  
  // Aerodynamic Flow Split - cursor acts as obstacle
  float flowSplit(vec2 uv, vec2 mouse) {
    float dist = distance(uv, mouse);
    float radius = 0.15;
    
    if (dist < radius) {
      // Create vertical divergence around cursor
      float normalizedDist = dist / radius;
      float divergence = sin(normalizedDist * 3.14159) * 0.3;
      return divergence * (1.0 - normalizedDist);
    }
    
    return 0.0;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    
    // Normalize mouse position
    vec2 mouse = uMouse * 0.5 + 0.5;
    mouse.y = 1.0 - mouse.y; // Flip Y coordinate
    
    // Apply flow split - cursor as aerodynamic obstacle
    float split = flowSplit(uv, mouse);
    vec2 warpedUv = uv;
    warpedUv.y += split * (uv.x - mouse.x) * 2.0;
    
    // High-speed horizontal flow (Left to Right)
    float speed = 0.15;
    vec3 flowCoord = vec3(
      warpedUv.x * 2.0 * aspect.x - uTime * speed,
      warpedUv.y * 2.0,
      uTime * 0.05
    );
    
    // Domain warping for smoke effect
    float noise = domainWarp(flowCoord);
    
    // Secondary noise layer for detail
    float detailNoise = fbm(flowCoord * 2.0 + vec3(100.0));
    
    // Combine noise layers
    float combinedNoise = noise * 0.7 + detailNoise * 0.3;
    
    // Color palette
    vec3 deepBlue = vec3(0.122, 0.161, 0.216);    // #1F2937
    vec3 midnight = vec3(0.173, 0.243, 0.314);    // #2C3E50
    vec3 coral = vec3(1.0, 0.435, 0.38);          // #FF6F61
    vec3 coralHighlight = vec3(1.0, 0.54, 0.48);  // Lighter coral
    
    // Create gradient background
    vec3 bgGradient = mix(deepBlue, midnight, uv.y * 0.5 + 0.3);
    
    // Noise-based color mixing
    float noiseIntensity = smoothstep(-0.3, 0.8, combinedNoise);
    
    // Add coral highlights on noise crests
    float highlightMask = smoothstep(0.4, 0.8, combinedNoise);
    vec3 smokeColor = mix(bgGradient, coral, highlightMask * 0.4);
    
    // Add brighter highlights
    float brightHighlight = smoothstep(0.6, 1.0, combinedNoise);
    smokeColor = mix(smokeColor, coralHighlight, brightHighlight * 0.3);
    
    // Mouse proximity glow (subtle interaction feedback)
    float mouseDist = distance(uv, mouse);
    float mouseGlow = smoothstep(0.3, 0.0, mouseDist) * 0.15;
    smokeColor += coral * mouseGlow;
    
    // Vignette effect
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5));
    smokeColor *= 0.85 + vignette * 0.15;
    
    gl_FragColor = vec4(smokeColor, 1.0);
  }
`;

interface ShaderPlaneProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

// Shader Plane Component
const ShaderPlane: React.FC<ShaderPlaneProps> = ({ mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }),
    []
  );
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth mouse following with lerp
      const targetX = mousePosition.current.x;
      const targetY = mousePosition.current.y;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.08;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.08;
    }
  });
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

interface WebGLBackgroundProps {
  className?: string;
}

// Main WebGL Background Component
const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ className = '' }) => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-0 ${className}`}
      style={{ background: '#1F2937' }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ShaderPlane mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
