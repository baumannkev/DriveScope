from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from models import CarListing, SearchFilters, IngestRequest, AlertConfig, AlertResponse
from database import search_cars, ingest_listings, create_alert, get_alerts, delete_alert

app = FastAPI(
    title="DriveScope API",
    description="Used car listing search and alert API",
    version="1.0.0"
)

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to DriveScope API",
        "endpoints": {
            "/search": "Search car listings with filters",
            "/ingest": "Ingest new car listings",
            "/alerts": "Manage price alerts"
        }
    }


@app.post("/search", response_model=List[CarListing])
async def search(filters: SearchFilters):
    """Search car listings with optional filters"""
    try:
        results = await search_cars(filters)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/ingest")
async def ingest(request: IngestRequest):
    """Ingest new car listings into the database"""
    try:
        result = await ingest_listings(request.listings)
        return {
            "status": "success",
            "message": f"Successfully ingested {result['inserted']} listings",
            "data": result["listings"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/alerts", response_model=List[AlertResponse])
async def list_alerts(email: Optional[str] = None):
    """Get all alerts or alerts for a specific email"""
    try:
        alerts = await get_alerts(email)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/alerts", response_model=AlertResponse)
async def create_new_alert(alert: AlertConfig):
    """Create a new price alert"""
    try:
        result = await create_alert(alert)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/alerts/{alert_id}")
async def remove_alert(alert_id: int):
    """Delete an alert"""
    try:
        success = await delete_alert(alert_id)
        if not success:
            raise HTTPException(status_code=404, detail="Alert not found")
        return {"status": "success", "message": f"Alert {alert_id} deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
