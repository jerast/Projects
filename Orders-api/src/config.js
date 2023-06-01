import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.AURAB_PORT || 8000;
export const DB_CNN = process.env.AURAB_DB_CNN || 'mongodb+srv://user:password@cluster.cluster_id.mongodb.net/db';
export const DB_OFF = process.env.AURAB_DB_OFF || 'mongodb://localhost:27017/db';
export const SECRET_JWT_SEED = process.env.AURAB_SECRET_JWT_SEED || 'thisisaseed';
