import os
from typing import List, Optional
from supabase import create_client, Client
from dotenv import load_dotenv
from models import CarListing, SearchFilters, AlertConfig

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


async def search_cars(filters: SearchFilters) -> List[dict]:
    """Search car listings with filters"""
    query = supabase.table("car_listings").select("*")
    
    if filters.make:
        query = query.ilike("make", f"%{filters.make}%")
    if filters.model:
        query = query.ilike("model", f"%{filters.model}%")
    if filters.min_year:
        query = query.gte("year", filters.min_year)
    if filters.max_year:
        query = query.lte("year", filters.max_year)
    if filters.min_price:
        query = query.gte("price", filters.min_price)
    if filters.max_price:
        query = query.lte("price", filters.max_price)
    if filters.max_mileage:
        query = query.lte("mileage", filters.max_mileage)
    if filters.min_score:
        query = query.gte("score", filters.min_score)
    if filters.location:
        query = query.ilike("location", f"%{filters.location}%")
    
    query = query.order("created_at", desc=True)
    query = query.range(filters.offset, filters.offset + filters.limit - 1)
    
    response = query.execute()
    return response.data


async def ingest_listings(listings: List[CarListing]) -> dict:
    """Ingest car listings into the database"""
    data = [listing.model_dump(exclude={"id", "created_at"}) for listing in listings]
    response = supabase.table("car_listings").insert(data).execute()
    return {"inserted": len(response.data), "listings": response.data}


async def create_alert(alert: AlertConfig) -> dict:
    """Create a price alert"""
    data = alert.model_dump(exclude={"id", "created_at"})
    # Store filters as JSON
    data["filters"] = alert.filters.model_dump()
    response = supabase.table("alerts").insert(data).execute()
    return response.data[0] if response.data else {}


async def get_alerts(email: Optional[str] = None) -> List[dict]:
    """Get all alerts or alerts for a specific email"""
    query = supabase.table("alerts").select("*")
    if email:
        query = query.eq("email", email)
    response = query.execute()
    return response.data


async def delete_alert(alert_id: int) -> bool:
    """Delete an alert"""
    response = supabase.table("alerts").delete().eq("id", alert_id).execute()
    return len(response.data) > 0
