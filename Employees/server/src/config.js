import { config } from 'dotenv';

config();

export const PORT = process.env.EMPLOYEES_PORT || 4000;

export const DB_HOST = process.env.EMPLOYEES_DB_HOST || 'localhost';
export const DB_PORT = process.env.EMPLOYEES_DB_PORT || 8080;
export const DB_USER = process.env.EMPLOYEES_DB_USER || 'root';
export const DB_PASSWORD = process.env.EMPLOYEES_DB_PASSWORD || 'isATestingPassword';
export const DB_DATABASE = process.env.EMPLOYEES_DB_DATABASE || 'TestingDB';