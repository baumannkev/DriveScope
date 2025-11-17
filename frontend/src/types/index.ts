export interface CarListing {
  id?: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  score: number;
  image_url?: string;
  location?: string;
  description?: string;
  created_at?: string;
}

export interface SearchFilters {
  make?: string;
  model?: string;
  min_year?: number;
  max_year?: number;
  min_price?: number;
  max_price?: number;
  max_mileage?: number;
  min_score?: number;
  location?: string;
  limit?: number;
  offset?: number;
}
