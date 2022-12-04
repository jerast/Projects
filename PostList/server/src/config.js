import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const DB_URI = process.env.DB_URI || 'mongodb://localhost/testdb';

export const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD || 'abcdefg'
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY || 1234567890
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || 'thisIsaTestingAPISecretKey'
