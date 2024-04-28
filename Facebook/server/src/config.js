import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.FACEBOOK_PORT || 8080;
export const DB_CNN = process.env.FACEBOOK_DB_CNN || 'mongodb://localhost/testdb';

export const CLOUDINARY_CLOUD = process.env.FACEBOOK_CLOUDINARY_CLOUD || 'abcdefg'
export const CLOUDINARY_KEY = process.env.FACEBOOK_CLOUDINARY_KEY || 1234567890
export const CLOUDINARY_SECRET = process.env.FACEBOOK_CLOUDINARY_SECRET || 'thisIsaTestingAPISecretKey'
