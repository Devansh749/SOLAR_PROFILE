export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: string;
  texture?: string;
  description: string;
  mass: string;
  diameter: string;
  moons?: number;
}

export interface CelestialBody {
  position: [number, number, number];
  velocity: [number, number, number];
  mass: number;
  radius: number;
}
