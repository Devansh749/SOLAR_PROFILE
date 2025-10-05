import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetData } from '../types';

interface PlanetProps {
  data: PlanetData;
  onClick: () => void;
  isSelected: boolean;
}

export function Planet({ data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

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
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.name === 'Sun' ? data.color : '#000000'}
            emissiveIntensity={data.name === 'Sun' ? 1 : 0}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        {isSelected && (
          <mesh>
            <ringGeometry args={[data.radius * 1.5, data.radius * 1.6, 32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        )}
      </group>
      {data.distance > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
