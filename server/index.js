require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DB_NAME || 'car_tracker_db',
//   password: process.env.DB_PASSWORD || 'password',
//   port: process.env.DB_PORT || 5432,
// });
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Required for Vercel Postgres
});

// If no connection string is found (Local Fallback), use individual params
if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    pool.options = {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'car_tracker_db',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
    };
}
// Test connection
pool.connect()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection error:', err.message));

// --- API ROUTES ---

// 1. Get All Vehicles (Updated to include warnings)
// app.get('/api/vehicles', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         v.id, 
//         v.name, 
//         v.license_plate as "licensePlate", 
//         v.status, 
//         v.current_speed as speed, 
//         v.current_location as location, 
//         to_char(v.last_update, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as "lastUpdate",
//         COALESCE(
//           (SELECT json_agg(message) 
//            FROM alerts a 
//            WHERE a.vehicle_id = v.id AND a.is_resolved = false), 
//           '[]'
//         ) as warnings
//       FROM vehicles v
//       ORDER BY v.id ASC
//     `;
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error in /api/vehicles:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// 2. Add New Vehicle
app.post('/api/vehicles', async (req, res) => {
  try {
    // ADDED: latitude and longitude to destructuring
    const { name, licensePlate, status, speed, location, latitude, longitude, userId } = req.body;
    
    // Default values if not provided
    const user_id = userId || 1; 
    const current_speed = speed || 0;
    const current_status = status || 'OFFLINE';
    // ADDED: Default lat/lon
    const lat = latitude || 0;
    const lon = longitude || 0;

    const query = `
      INSERT INTO vehicles (user_id, name, license_plate, status, current_speed, current_location, latitude, longitude, last_update)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING 
        id, 
        name, 
        license_plate as "licensePlate", 
        status, 
        current_speed as speed, 
        current_location as location,
        latitude,
        longitude, 
        last_update as "lastUpdate"
    `;
    
    // ADDED: lat and lon to values array
    const values = [user_id, name, licensePlate, current_status, current_speed, location, lat, lon];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in POST /api/vehicles:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Single Vehicle Details
app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        id, 
        name, 
        license_plate as "licensePlate", 
        status, 
        current_speed as speed, 
        current_location as location, 
        to_char(last_update, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as "lastUpdate"
      FROM vehicles 
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in GET /api/vehicles/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Dashboard Stats (For StatsBar)
app.get('/api/stats', async (req, res) => {
  try {
    // Run queries in parallel for efficiency
    const totalQuery = pool.query('SELECT COUNT(*) FROM vehicles');
    const activeQuery = pool.query("SELECT COUNT(*) FROM vehicles WHERE status = 'NORMAL'");
    const offlineQuery = pool.query("SELECT COUNT(*) FROM vehicles WHERE status = 'OFFLINE'");
    const alertsQuery = pool.query('SELECT COUNT(*) FROM alerts WHERE is_resolved = false');

    const [total, active, offline, alerts] = await Promise.all([
      totalQuery, 
      activeQuery, 
      offlineQuery, 
      alertsQuery
    ]);

    res.json({
      total: parseInt(total.rows[0].count),
      active: parseInt(active.rows[0].count),
      offline: parseInt(offline.rows[0].count),
      alerts: parseInt(alerts.rows[0].count)
    });
  } catch (err) {
    console.error('Error in /api/stats:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 5. Get Active Alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        message, 
        to_char(created_at, 'YYYY-MM-DD HH12:MI AM') as time,
        is_resolved
      FROM alerts 
      WHERE is_resolved = false
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/alerts:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 6. Resolve an Alert
app.patch('/api/alerts/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE alerts SET is_resolved = true WHERE id = $1', [id]);
    res.json({ message: 'Alert resolved' });
  } catch (err) {
    console.error('Error in PATCH /api/alerts/:id/resolve:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 7. Get Location History
app.get('/api/vehicles/:id/history', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT location, to_char(recorded_at, 'YYYY-MM-DD HH24:MI:SS') as time
      FROM location_history
      WHERE vehicle_id = $1
      ORDER BY recorded_at DESC
      LIMIT 20
    `, [id]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in GET /api/vehicles/:id/history:', err.message);
    res.status(500).json({ error: err.message });
  }
});
// Get All Vehicles (with coordinates)
app.get('/api/vehicles', async (req, res) => {
  try {
    const query = `
      SELECT 
        v.id, 
        v.name, 
        v.license_plate as "licensePlate", 
        v.status, 
        v.current_speed as speed, 
        v.current_location as location, 
        v.latitude,
        v.longitude,
        to_char(v.last_update, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as "lastUpdate",
        COALESCE(
          (SELECT json_agg(message) 
           FROM alerts a 
           WHERE a.vehicle_id = v.id AND a.is_resolved = false), 
          '[]'
        ) as warnings
      FROM vehicles v
      ORDER BY v.id ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/vehicles:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;