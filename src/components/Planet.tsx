import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetData } from '../types';

interface PlanetProps {
  data: PlanetData;
  onClick: () => void;
  isSelected: boolean;
  isSearchHighlighted: boolean;
}

export function Planet({ data, onClick, isSelected, isSearchHighlighted }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (data.name === 'Sun') {
      const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 256);
      gradient.addColorStop(0, '#FFF4A3');
      gradient.addColorStop(0.5, '#FDB813');
      gradient.addColorStop(1, '#FF6B35');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    } else {
      ctx.fillStyle = data.color;
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 20 + 5;
        const alpha = Math.random() * 0.3 + 0.1;

        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < 50; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 15 + 3;
        const alpha = Math.random() * 0.2 + 0.05;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, [data.name, data.color]);

  useFrame(({ clock }) => {
    if (groupRef.current && data.distance > 0) {
      groupRef.current.rotation.y = clock.getElapsedTime() * data.orbitSpeed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[data.distance, 0, 0]}>
        <mesh ref={meshRef} onClick={onClick}>
          <sphereGeometry args={[data.radius, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            emissive={data.name === 'Sun' ? data.color : isSearchHighlighted ? '#8b2be2' : '#000000'}
            emissiveIntensity={data.name === 'Sun' ? 1 : isSearchHighlighted ? 0.8 : 0}
            roughness={data.name === 'Sun' ? 0.1 : 0.7}
            metalness={data.name === 'Sun' ? 0 : 0.3}
          />
        </mesh>
        {isSearchHighlighted && (
          <>
            <mesh>
              <sphereGeometry args={[data.radius * 1.3, 32, 32]} />
              <meshBasicMaterial color="#8b2be2" transparent opacity={0.2} side={THREE.BackSide} />
            </mesh>
            <pointLight position={[0, 0, 0]} color="#8b2be2" intensity={3} distance={data.radius * 5} />
          </>
        )}
        {isSelected && !isSearchHighlighted && (
          <mesh>
            <ringGeometry args={[data.radius * 1.5, data.radius * 1.6, 32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        )}
      </group>
      {data.distance > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 128]} />
          <meshBasicMaterial color={data.orbitColor} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
