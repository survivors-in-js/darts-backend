import * as dotenv from 'dotenv';
import { Participant } from '../resources/participants/entities/participant.entity';
dotenv.config();
export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: 'darts',
    password: 'darts',
    databaseName: 'darts',
  },
  emailSuperAdmin: process.env.SUPER_ADMIN_EMAIL || 'superadmin@test.ru',
  jwtSecret: 'jwtSecret',
});
