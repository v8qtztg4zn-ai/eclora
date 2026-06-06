"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Diamond({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#D6B56D"
          transparent
          opacity={0.15}
          distort={0.2}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D6B56D"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#D6B56D" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#E8B7C8" />
      <Diamond position={[-3, 1, -2]} scale={0.8} speed={0.5} />
      <Diamond position={[4, -1, -3]} scale={1.2} speed={0.3} />
      <Diamond position={[0, 2, -4]} scale={0.6} speed={0.7} />
      <Diamond position={[-5, -2, -1]} scale={0.5} speed={0.4} />
      <Particles />
    </>
  );
}

export function DiamondScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
