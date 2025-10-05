import { useState, useMemo } from 'react';
import { planetsData } from '../data/planetsData';

interface UIProps {
  onPlanetSearch: (name: string | null) => void;
}

export function UI({ onPlanetSearch }: UIProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPlanets = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return planetsData.filter(planet =>
      planet.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);

    if (!value.trim()) {
      onPlanetSearch(null);
    }
  };

  const handleSuggestionClick = (planetName: string) => {
    setSearchQuery(planetName);
    setShowSuggestions(false);
    onPlanetSearch(planetName);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="ui-overlay">
      <h1 className="title">SPACE ENCYCLOPEDIA</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for planets..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
          onBlur={handleSearchBlur}
        />
        {showSuggestions && filteredPlanets.length > 0 && (
          <div className="search-suggestions">
            {filteredPlanets.map((planet) => (
              <div
                key={planet.name}
                className="search-suggestion-item"
                onClick={() => handleSuggestionClick(planet.name)}
              >
                {planet.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="instructions">
        <p>Left Click + Drag: Rotate Camera</p>
        <p>Right Click + Drag: Pan Camera</p>
        <p>Scroll: Zoom In/Out</p>
      </div>
    </div>
  );
}
