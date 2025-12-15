require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'car_tracker_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// --- API ROUTES ---

// 1. Get All Vehicles (Mapped to match React Interface)
app.get('/api/vehicles', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        license_plate as "licensePlate", 
        status, 
        current_speed as speed, 
        current_location as location, 
        to_char(last_update, 'YP-MM-DD"T"HH24:MI:SS"Z"') as "lastUpdate"
      FROM vehicles
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 2. Get Active Alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        message, 
        to_char(created_at, 'HH12:MI AM') as time,
        is_resolved
      FROM alerts 
      WHERE is_resolved = false
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 3. Resolve an Alert
app.patch('/api/alerts/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE alerts SET is_resolved = true WHERE id = $1', [id]);
    res.json({ message: 'Alert resolved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});