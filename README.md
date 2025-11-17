# DriveScope 🚗

A modern fullstack web application for browsing used car listings with advanced search filters.

## Features

- **React Frontend**: Built with Vite and TypeScript for fast development and type safety
- **FastAPI Backend**: High-performance Python API with automatic documentation
- **Supabase Database**: PostgreSQL database for reliable data storage
- **Search Filters**: Filter by make, model, year, price, mileage, score, and location
- **Clean UI**: Simple card-based interface displaying price, mileage, score, and images
- **Docker Support**: Containerized deployment for easy setup
- **Cloud Ready**: Configurations for Render (backend) and Vercel (frontend)

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- CSS3

### Backend
- FastAPI
- Python 3.11
- Pydantic (type validation)
- Supabase Python Client

### Database
- PostgreSQL (via Supabase)

## Project Structure

```
DriveScope/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   ├── database.py          # Database operations
│   ├── schema.sql           # Database schema
│   ├── seed.sql             # Sample data
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Backend container
│   ├── render.yaml          # Render deployment config
│   └── .env.example         # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main application
│   │   ├── App.css          # Styles
│   │   └── main.tsx         # Entry point
│   ├── Dockerfile           # Frontend container
│   ├── nginx.conf           # Nginx configuration
│   ├── vercel.json          # Vercel deployment config
│   └── .env.example         # Environment variables template
├── docker-compose.yml       # Docker orchestration
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker (optional)
- Supabase account

### Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the schema in your Supabase SQL editor:
   ```bash
   # Copy contents of backend/schema.sql and run in Supabase SQL editor
   ```
3. (Optional) Load sample data:
   ```bash
   # Copy contents of backend/seed.sql and run in Supabase SQL editor
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

5. Update `.env` with your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   ```

6. Run the server:
   ```bash
   python main.py
   # or
   uvicorn main:app --reload
   ```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your backend URL:
   ```
   VITE_API_URL=http://localhost:8000
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000

## API Endpoints

### GET /
- Health check and API information

### POST /search
- Search car listings with filters
- Request body: SearchFilters object
- Returns: Array of CarListing objects

### POST /ingest
- Add new car listings to the database
- Request body: { listings: CarListing[] }
- Returns: Success status and inserted listings

### GET /alerts
- Get all price alerts or filter by email
- Query param: email (optional)
- Returns: Array of alerts

### POST /alerts
- Create a new price alert
- Request body: AlertConfig object
- Returns: Created alert

### DELETE /alerts/{alert_id}
- Delete a price alert
- Path param: alert_id
- Returns: Success status

## Docker Deployment

### Using Docker Compose

1. Create `.env` file in the root directory with Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   ```

2. Build and run:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Individual Containers

Backend:
```bash
cd backend
docker build -t drivescope-backend .
docker run -p 8000:8000 --env-file .env drivescope-backend
```

Frontend:
```bash
cd frontend
docker build -t drivescope-frontend .
docker run -p 3000:80 drivescope-frontend
```

## Cloud Deployment

### Backend (Render)

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Render will auto-detect the `render.yaml` configuration
5. Add environment variables in Render dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
6. Deploy!

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL
5. Update `vercel.json` with your actual backend URL
6. Deploy!

## Development

### Build Frontend
```bash
cd frontend
npm run build
```

### Type Checking
```bash
cd frontend
npm run build  # TypeScript compilation is part of build
```

### API Documentation
Visit http://localhost:8000/docs when the backend is running to see interactive API documentation.

## Environment Variables

### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
DATABASE_URL=postgresql://user:password@host:port/database
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Data Models

### CarListing
- `id`: Auto-generated ID
- `make`: Vehicle manufacturer
- `model`: Vehicle model
- `year`: Manufacturing year
- `price`: Listing price (USD)
- `mileage`: Odometer reading
- `score`: Quality score (0-10)
- `image_url`: Car image URL
- `location`: Geographic location
- `description`: Additional details
- `created_at`: Timestamp

### SearchFilters
- `make`: Filter by manufacturer
- `model`: Filter by model
- `min_year` / `max_year`: Year range
- `min_price` / `max_price`: Price range
- `max_mileage`: Maximum mileage
- `min_score`: Minimum quality score
- `location`: Filter by location
- `limit`: Results per page (max 100)
- `offset`: Pagination offset

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.