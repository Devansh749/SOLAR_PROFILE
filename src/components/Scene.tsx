import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './Starfield';
import { SolarSystem } from './SolarSystem';

interface SceneProps {
  selectedPlanet: string | null;
  onPlanetClick: (name: string) => void;
  searchHighlightedPlanet: string | null;
}

export function Scene({ selectedPlanet, onPlanetClick, searchHighlightedPlanet }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 50, 80], fov: 60 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={100} decay={2} />

      <Starfield />
      <SolarSystem
        selectedPlanet={selectedPlanet}
        onPlanetClick={onPlanetClick}
        searchHighlightedPlanet={searchHighlightedPlanet}
      />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={200}
        zoomSpeed={0.8}
      />
    </Canvas>
  );
}
