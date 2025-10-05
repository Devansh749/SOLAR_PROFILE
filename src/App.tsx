import { useState } from 'react';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import './App.css';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [searchHighlightedPlanet, setSearchHighlightedPlanet] = useState<string | null>(null);

  const handlePlanetClick = (name: string) => {
    setSelectedPlanet(name === selectedPlanet ? null : name);
  };

  const handlePlanetSearch = (name: string | null) => {
    setSearchHighlightedPlanet(name);
    if (name) {
      setSelectedPlanet(name);
    }
  };

  return (
    <div className="app">
      <Scene
        selectedPlanet={selectedPlanet}
        onPlanetClick={handlePlanetClick}
        searchHighlightedPlanet={searchHighlightedPlanet}
      />
      <UI onPlanetSearch={handlePlanetSearch} />
    </div>
  );
}

export default App;
