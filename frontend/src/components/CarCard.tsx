import { CarListing } from '../types';

interface CarCardProps {
  car: CarListing;
}

export default function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="car-card">
      <div className="car-image">
        <img
          src={car.image_url || 'https://via.placeholder.com/400x250?text=No+Image'}
          alt={`${car.year} ${car.make} ${car.model}`}
          loading="lazy"
        />
        <div className="score-badge">
          <span className="score-value">{car.score.toFixed(1)}</span>
          <span className="score-label">/10</span>
        </div>
      </div>
      <div className="car-details">
        <h3 className="car-title">
          {car.year} {car.make} {car.model}
        </h3>
        {car.location && (
          <p className="car-location">📍 {car.location}</p>
        )}
        <div className="car-stats">
          <div className="stat">
            <span className="stat-label">Price</span>
            <span className="stat-value price">{formatPrice(car.price)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Mileage</span>
            <span className="stat-value">{formatMileage(car.mileage)} mi</span>
          </div>
        </div>
        {car.description && (
          <p className="car-description">{car.description}</p>
        )}
      </div>
    </div>
  );
}
