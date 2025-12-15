exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.createTable('vehicles', {
    id: 'id',
    user_id: { type: 'integer', references: 'users', onDelete: 'CASCADE' },
    name: { type: 'varchar(100)', notNull: true },
    // ... (add other columns similarly)
  });
  // ... (Add alerts and location_history tables)
    pgm.createTable('alerts', {
    id: 'id',
    vehicle_id: { type: 'integer', references: 'vehicles', onDelete: 'CASCADE' },
    message: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    is_resolved: { type: 'boolean', default: false },
  });

  pgm.createTable('location_history', {
    id: 'id',
    vehicle_id: { type: 'integer', references: 'vehicles', onDelete: 'CASCADE' },
    location: { type: 'varchar(255)', notNull: true },
    recorded_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};