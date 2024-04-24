import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.AURAB_PORT;
export const DB_CNN = process.env.AURAB_DB_CNN;
export const DB_OFF = process.env.AURAB_DB_OFF;
export const SECRET_JWT_SEED = process.env.AURAB_SECRET_JWT_SEED;
