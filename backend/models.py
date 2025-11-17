from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class CarListing(BaseModel):
    id: Optional[int] = None
    make: str
    model: str
    year: int
    price: float
    mileage: int
    score: float = Field(ge=0, le=10, description="Quality score from 0-10")
    image_url: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    created_at: Optional[datetime] = None


class SearchFilters(BaseModel):
    make: Optional[str] = None
    model: Optional[str] = None
    min_year: Optional[int] = None
    max_year: Optional[int] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    max_mileage: Optional[int] = None
    min_score: Optional[float] = None
    location: Optional[str] = None
    limit: int = Field(default=50, le=100)
    offset: int = Field(default=0, ge=0)


class IngestRequest(BaseModel):
    listings: List[CarListing]


class AlertConfig(BaseModel):
    id: Optional[int] = None
    email: str
    filters: SearchFilters
    active: bool = True
    created_at: Optional[datetime] = None


class AlertResponse(BaseModel):
    id: int
    email: str
    active: bool
    created_at: datetime
