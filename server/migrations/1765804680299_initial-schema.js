exports.up = (pgm) => {
  // Users table
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // Vehicles table
  pgm.createTable('vehicles', {
    id: 'id',
    user_id: { type: 'integer', references: 'users', onDelete: 'CASCADE' },
    name: { type: 'varchar(100)', notNull: true },
    license_plate: { type: 'varchar(20)', notNull: true },
    status: { type: 'varchar(20)', notNull: true, default: "'OFFLINE'" },
    current_speed: { type: 'integer', default: 0 },
    current_location: { type: 'varchar(255)' },
    latitude: { type: 'double precision', default: 0 },
    longitude: { type: 'double precision', default: 0 },
    last_update: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // Alerts table
  pgm.createTable('alerts', {
    id: 'id',
    vehicle_id: { type: 'integer', references: 'vehicles', onDelete: 'CASCADE' },
    message: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    is_resolved: { type: 'boolean', default: false },
  });

  // Location history table
  pgm.createTable('location_history', {
    id: 'id',
    vehicle_id: { type: 'integer', references: 'vehicles', onDelete: 'CASCADE' },
    location: { type: 'varchar(255)', notNull: true },
    recorded_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // Insert a default user
  pgm.sql(`
    INSERT INTO users (username, email, password_hash)
    VALUES ('admin', 'admin@example.com', 'dummy_hash')
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('location_history');
  pgm.dropTable('alerts');
  pgm.dropTable('vehicles');
  pgm.dropTable('users');
};