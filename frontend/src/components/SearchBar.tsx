import { useState, ChangeEvent } from 'react';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : name.includes('price') || name.includes('mileage') || name.includes('year') || name.includes('score') ? Number(value) : value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({});
    onSearch({});
  };

  return (
    <div className="search-bar">
      <h2>Search Filters</h2>
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="make">Make</label>
          <input
            type="text"
            id="make"
            name="make"
            value={filters.make || ''}
            onChange={handleInputChange}
            placeholder="e.g., Toyota"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={filters.model || ''}
            onChange={handleInputChange}
            placeholder="e.g., Camry"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="min_year">Min Year</label>
          <input
            type="number"
            id="min_year"
            name="min_year"
            value={filters.min_year || ''}
            onChange={handleInputChange}
            placeholder="2015"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="max_year">Max Year</label>
          <input
            type="number"
            id="max_year"
            name="max_year"
            value={filters.max_year || ''}
            onChange={handleInputChange}
            placeholder="2024"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="min_price">Min Price ($)</label>
          <input
            type="number"
            id="min_price"
            name="min_price"
            value={filters.min_price || ''}
            onChange={handleInputChange}
            placeholder="10000"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="max_price">Max Price ($)</label>
          <input
            type="number"
            id="max_price"
            name="max_price"
            value={filters.max_price || ''}
            onChange={handleInputChange}
            placeholder="50000"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="max_mileage">Max Mileage</label>
          <input
            type="number"
            id="max_mileage"
            name="max_mileage"
            value={filters.max_mileage || ''}
            onChange={handleInputChange}
            placeholder="100000"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="min_score">Min Score</label>
          <input
            type="number"
            id="min_score"
            name="min_score"
            step="0.1"
            min="0"
            max="10"
            value={filters.min_score || ''}
            onChange={handleInputChange}
            placeholder="7.0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location || ''}
            onChange={handleInputChange}
            placeholder="e.g., Los Angeles"
          />
        </div>
      </div>

      <div className="search-actions">
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
