exports.up = (pgm) => {
  // 1. Insert Mock Vehicles (Linked to User ID 1)
  pgm.sql(`
    INSERT INTO vehicles (user_id, name, license_plate, status, current_speed, current_location, latitude, longitude, last_update)
    VALUES 
      (1, 'Toyota Hilux Logistics', 'JHB 123 GP', 'NORMAL', 45, 'Sandton, Johannesburg', -26.1076, 28.0567, NOW()),
      (1, 'Ford Ranger Delivery', 'CPT 999 CA', 'OFFLINE', 0, 'Cape Town Depot', -33.9249, 18.4241, NOW() - INTERVAL '2 hours'),
      (1, 'Isuzu D-Max Cargo', 'DBN 555 KZ', 'ALERT', 120, 'N3 Highway, Durban', -29.8587, 31.0218, NOW())
  `);

  // 2. Insert Mock Alerts
  // We assume the IDs generated above are 1, 2, and 3 respectively.
  // Warning for the Isuzu (Vehicle 3) and Ford (Vehicle 2)
  pgm.sql(`
    INSERT INTO alerts (vehicle_id, message, is_resolved, created_at)
    VALUES 
      (3, 'Over-speeding detected: 120 km/h in 100 zone', false, NOW()),
      (3, 'Geofence violation: Exited Durban Zone', true, NOW() - INTERVAL '1 day'),
      (2, 'Vehicle offline for more than 2 hours', false, NOW() - INTERVAL '1 hour')
  `);

  // 3. Insert Mock Location History (For the moving Toyota)
  pgm.sql(`
    INSERT INTO location_history (vehicle_id, location, recorded_at)
    VALUES 
      (1, 'Midrand, Gauteng', NOW() - INTERVAL '30 minutes'),
      (1, 'Centurion, Gauteng', NOW() - INTERVAL '15 minutes'),
      (1, 'Sandton, Johannesburg', NOW())
  `);
};

exports.down = (pgm) => {
  // Clear data in reverse order to respect foreign keys
  pgm.sql('DELETE FROM location_history WHERE vehicle_id IN (SELECT id FROM vehicles WHERE user_id = 1)');
  pgm.sql('DELETE FROM alerts WHERE vehicle_id IN (SELECT id FROM vehicles WHERE user_id = 1)');
  pgm.sql('DELETE FROM vehicles WHERE user_id = 1');
};