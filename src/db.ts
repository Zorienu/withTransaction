import { Pool } from 'pg';

export const pool = new Pool({
  user: 'canals',
  host: 'localhost',
  database: 'localtest',
  password: 'local',
  port: 5432,
});
