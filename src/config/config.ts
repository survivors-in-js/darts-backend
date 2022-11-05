import * as dotenv from 'dotenv';
dotenv.config();
export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: 'admin',
    password: 'admin',
    databaseName: 'darts',
  },
});
