import { planetsData } from '../data/planetsData';
import { PlanetData } from '../types';

interface UIProps {
  selectedPlanet: string | null;
  onPlanetSelect: (name: string) => void;
  viewMode: 'free' | 'follow';
  onViewModeChange: (mode: 'free' | 'follow') => void;
}

export function UI({ selectedPlanet, onPlanetSelect, viewMode, onViewModeChange }: UIProps) {
  const selectedPlanetData = planetsData.find(p => p.name === selectedPlanet);

  return (
    <div className="ui-overlay">
      <h1 className="title">EYES ON SPACE</h1>

      <div className="planet-list">
        <h3>Celestial Bodies</h3>
        {planetsData.map((planet: PlanetData) => (
          <div
            key={planet.name}
            className={`planet-item ${selectedPlanet === planet.name ? 'selected' : ''}`}
            onClick={() => onPlanetSelect(planet.name)}
          >
            <strong>{planet.name}</strong>
          </div>
        ))}
      </div>

      {selectedPlanetData && (
        <div className="planet-info">
          <h2>{selectedPlanetData.name}</h2>
          <p className="label">Description</p>
          <p>{selectedPlanetData.description}</p>
          <p className="label">Mass</p>
          <p>{selectedPlanetData.mass}</p>
          <p className="label">Diameter</p>
          <p>{selectedPlanetData.diameter}</p>
          {selectedPlanetData.moons !== undefined && (
            <>
              <p className="label">Moons</p>
              <p>{selectedPlanetData.moons}</p>
            </>
          )}
        </div>
      )}

      <div className="controls">
        <button
          className={`control-btn ${viewMode === 'free' ? 'active' : ''}`}
          onClick={() => onViewModeChange('free')}
        >
          Free Camera
        </button>
        <button
          className={`control-btn ${viewMode === 'follow' ? 'active' : ''}`}
          onClick={() => onViewModeChange('follow')}
        >
          Follow View
        </button>
      </div>

      <div className="instructions">
        <p>Left Click + Drag: Rotate Camera</p>
        <p>Right Click + Drag: Pan Camera</p>
        <p>Scroll: Zoom In/Out</p>
      </div>
    </div>
  );
}
