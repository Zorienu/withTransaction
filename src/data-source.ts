import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'canals',
  password: 'local',
  database: 'localtest',
  synchronize: true, // solo en desarrollo
  logging: false,
  entities: [User],
});
