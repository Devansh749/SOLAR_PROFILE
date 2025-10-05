import { useState } from 'react';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import './App.css';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('Earth');
  const [viewMode, setViewMode] = useState<'free' | 'follow'>('free');

  const handlePlanetClick = (name: string) => {
    setSelectedPlanet(name === selectedPlanet ? null : name);
  };

  const handlePlanetSelect = (name: string) => {
    setSelectedPlanet(name);
  };

  const handleViewModeChange = (mode: 'free' | 'follow') => {
    setViewMode(mode);
  };

  return (
    <div className="app">
      <Scene selectedPlanet={selectedPlanet} onPlanetClick={handlePlanetClick} />
      <UI
        selectedPlanet={selectedPlanet}
        onPlanetSelect={handlePlanetSelect}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
    </div>
  );
}

export default App;
