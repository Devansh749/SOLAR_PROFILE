import { Planet } from './Planet';
import { planetsData } from '../data/planetsData';

interface SolarSystemProps {
  selectedPlanet: string | null;
  onPlanetClick: (name: string) => void;
}

export function SolarSystem({ selectedPlanet, onPlanetClick }: SolarSystemProps) {
  return (
    <group>
      {planetsData.map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          onClick={() => onPlanetClick(planet.name)}
          isSelected={selectedPlanet === planet.name}
        />
      ))}
    </group>
  );
}
