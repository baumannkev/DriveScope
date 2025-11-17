-- Create car_listings table
CREATE TABLE IF NOT EXISTS car_listings (
    id BIGSERIAL PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mileage INTEGER NOT NULL,
    score DECIMAL(3, 1) CHECK (score >= 0 AND score <= 10),
    image_url TEXT,
    location VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    filters JSONB NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_car_listings_make ON car_listings(make);
CREATE INDEX IF NOT EXISTS idx_car_listings_model ON car_listings(model);
CREATE INDEX IF NOT EXISTS idx_car_listings_year ON car_listings(year);
CREATE INDEX IF NOT EXISTS idx_car_listings_price ON car_listings(price);
CREATE INDEX IF NOT EXISTS idx_car_listings_mileage ON car_listings(mileage);
CREATE INDEX IF NOT EXISTS idx_car_listings_score ON car_listings(score);
CREATE INDEX IF NOT EXISTS idx_car_listings_created_at ON car_listings(created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_email ON alerts(email);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON alerts(active);
