import * as dotenv from 'dotenv';

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
  nodemailer: {
    user: 'darts.club2022',
    pass: 'ofagsyuqlazgllzf',
    fromEmail: 'darts.club2022@gmail.com',
  },
});
