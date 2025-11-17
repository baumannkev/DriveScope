import { useState, useEffect } from 'react';
import CarCard from './components/CarCard';
import SearchBar from './components/SearchBar';
import { CarListing, SearchFilters } from './types';
import './App.css';

function App() {
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const searchCars = async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error searching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initial data on mount
    searchCars({});
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">🚗 DriveScope</h1>
          <p className="tagline">Find your perfect used car</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <SearchBar onSearch={searchCars} />

          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
            </div>
          )}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading cars...</p>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h2>Available Cars ({cars.length})</h2>
              </div>
              <div className="car-grid">
                {cars.length === 0 ? (
                  <div className="no-results">
                    <p>No cars found. Try adjusting your filters.</p>
                  </div>
                ) : (
                  cars.map((car) => <CarCard key={car.id} car={car} />)
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 DriveScope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
