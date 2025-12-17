Markdown

# Vehicle Tracker System

A full-stack web application designed for fleet management and vehicle tracking. This system allows users to monitor vehicle locations on an interactive map, manage vehicle status, view dashboard statistics, and handle system alerts.

## Features

- **Dashboard Overview:** Real-time statistics for total, active, and offline vehicles, plus active alerts.
- **Interactive Map:** Visual tracking of vehicle locations using Leaflet and OpenStreetMap.
- **Vehicle Management:** Add new vehicles with automatic geolocation (latitude/longitude) via address search.
- **Alert System:** Monitor and resolve vehicle-related alerts.
- **Responsive Design:** Built with Material UI for a modern, accessible interface.

## Technologies Used

### Frontend
- React (TypeScript)
- Vite
- Material UI (MUI)
- React Leaflet / Leaflet CSS
- Fetch API

### Backend
- Node.js
- Express.js
- PostgreSQL
- node-pg-migrate (Database Migrations)

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- PostgreSQL

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle_tracker
Install dependencies This project uses a root package.json to manage scripts, but dependencies are split between the root (frontend) and the server folder.

Install root/frontend dependencies:

Bash

npm install
Install server dependencies:

Bash

cd server
npm install
cd ..
Configuration
Database Setup
Create a PostgreSQL database (e.g., car_tracker_db) locally or use a cloud provider like Neon/Vercel Postgres.

Create a .env file in the server directory.

File: server/.env

Code snippet

# Local Development
DB_USER=postgres
DB_HOST=localhost
DB_NAME=car_tracker_db
DB_PASSWORD=your_password
DB_PORT=5432

# Production / Cloud (Alternative)
# DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
Database Migrations
Initialize the database tables (Users, Vehicles, Alerts, Location History) by running the migration script.

From the root directory:

Bash

npm run server -- run migrate:up
Alternatively, navigate to the server folder and run npm run migrate:up directly.

Running the Application
This project is configured to run both the frontend and backend concurrently using a single command.

Start Development Server:

Bash

npm run dev:all
Frontend: Runs on http://localhost:5173

Backend API: Runs on http://localhost:5000

Project Structure
src/: Contains the React frontend code.

components/: UI components (VehicleMap, StatsBar, AddBtn, etc.).

server/: Contains the Node.js/Express backend code.

migrations/: SQL migration files for database schema.

index.js: Main server entry point and API routes.

API Endpoints
The backend provides the following RESTful endpoints:

GET /api/vehicles: Retrieve all vehicles with latest status and location.

GET /api/vehicles/:id: Get details for a specific vehicle.

POST /api/vehicles: Register a new vehicle.

GET /api/stats: Get dashboard counts (Total, Active, Offline, Alerts).

GET /api/alerts: Retrieve active system alerts.

PATCH /api/alerts/:id/resolve: Mark an alert as resolved.

GET /api/vehicles/:id/history: Retrieve location history for a vehicle.

License
This project is open source and available under the MIT License.