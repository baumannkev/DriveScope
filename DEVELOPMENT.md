# DriveScope Development Guide

## Quick Start

### 1. Setup Supabase Database

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the schema:
   ```sql
   -- Copy and paste contents from backend/schema.sql
   ```
4. (Optional) Load sample data:
   ```sql
   -- Copy and paste contents from backend/seed.sql
   ```
5. Get your credentials:
   - Go to Settings > API
   - Copy the `Project URL` (SUPABASE_URL)
   - Copy the `anon/public` key (SUPABASE_KEY)

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
EOF

# Start the server
python main.py
```

The API will be available at http://localhost:8000

API Documentation: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:8000
EOF

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

## API Endpoints

### GET /
Health check and API information

### POST /search
Search car listings with filters

**Request Body:**
```json
{
  "make": "Toyota",
  "min_price": 15000,
  "max_price": 30000,
  "max_mileage": 50000,
  "min_score": 8.0
}
```

**Response:**
```json
[
  {
    "id": 1,
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "price": 22500,
    "mileage": 35000,
    "score": 8.5,
    "image_url": "https://...",
    "location": "Los Angeles, CA",
    "description": "Well-maintained..."
  }
]
```

### POST /ingest
Add new car listings

**Request Body:**
```json
{
  "listings": [
    {
      "make": "Honda",
      "model": "Accord",
      "year": 2021,
      "price": 25000,
      "mileage": 20000,
      "score": 9.0,
      "location": "San Diego, CA",
      "description": "Like new condition"
    }
  ]
}
```

### GET /alerts?email=user@example.com
Get price alerts for a user

### POST /alerts
Create a new price alert

**Request Body:**
```json
{
  "email": "user@example.com",
  "filters": {
    "make": "Tesla",
    "max_price": 50000
  },
  "active": true
}
```

### DELETE /alerts/{alert_id}
Delete a price alert

## Testing with Sample Data

You can test the API using curl or the interactive docs at http://localhost:8000/docs

Example search:
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Toyota",
    "max_price": 25000
  }'
```

## Docker Deployment

### Using Docker Compose

1. Create `.env` file in the root:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

2. Start services:
```bash
docker-compose up -d
```

3. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Individual Containers

**Backend:**
```bash
cd backend
docker build -t drivescope-backend .
docker run -p 8000:8000 \
  -e SUPABASE_URL=your_url \
  -e SUPABASE_KEY=your_key \
  drivescope-backend
```

**Frontend:**
```bash
cd frontend
docker build -t drivescope-frontend .
docker run -p 3000:80 drivescope-frontend
```

## Cloud Deployment

### Backend on Render

1. Push code to GitHub
2. Create Web Service on [Render](https://render.com)
3. Connect your repository
4. Render auto-detects `render.yaml`
5. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
6. Deploy!

### Frontend on Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set root directory: `frontend`
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL
5. Update `vercel.json` with actual backend URL
6. Deploy!

## Development Tips

### Frontend Hot Reload
The Vite dev server supports hot module replacement. Changes to React components will update instantly.

### Backend Auto Reload
Use `uvicorn main:app --reload` for automatic reloading on code changes.

### Database Changes
After modifying the schema:
1. Update `schema.sql`
2. Run the new schema in Supabase SQL Editor
3. Update Pydantic models in `models.py` if needed

### Adding New Endpoints
1. Add route in `main.py`
2. Add database function in `database.py`
3. Add/update models in `models.py` if needed
4. Test at http://localhost:8000/docs

## Troubleshooting

### Backend won't start
- Check that Supabase credentials are correct in `.env`
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check that port 8000 is not already in use

### Frontend shows "Failed to fetch"
- Ensure backend is running on port 8000
- Check CORS settings in `main.py`
- Verify `VITE_API_URL` in frontend `.env`

### Database connection errors
- Verify Supabase URL and key are correct
- Check that tables exist (run `schema.sql`)
- Ensure your IP is not blocked by Supabase

### Docker build fails
- Check Docker daemon is running
- Verify Dockerfiles have correct syntax
- Ensure `.dockerignore` excludes unnecessary files

## Project Structure

```
DriveScope/
├── backend/
│   ├── main.py              # FastAPI app and routes
│   ├── models.py            # Pydantic models
│   ├── database.py          # Supabase operations
│   ├── schema.sql           # Database schema
│   ├── seed.sql             # Sample data
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Backend container
│   └── .env.example         # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── CarCard.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── Dockerfile           # Frontend container
│   ├── vite.config.ts       # Vite configuration
│   └── .env.example         # Environment template
├── docker-compose.yml       # Docker orchestration
└── README.md                # Main documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
