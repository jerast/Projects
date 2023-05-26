import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.POSTLIST_PORT || 8080;
export const DB_CNN = process.env.POSTLIST_DB_CNN || 'mongodb://localhost/testdb';

export const CLOUDINARY_CLOUD = process.env.POSTLIST_CLOUDINARY_CLOUD || 'abcdefg'
export const CLOUDINARY_KEY = process.env.POSTLIST_CLOUDINARY_KEY || 1234567890
export const CLOUDINARY_SECRET = process.env.POSTLIST_CLOUDINARY_SECRET || 'thisIsaTestingAPISecretKey'
