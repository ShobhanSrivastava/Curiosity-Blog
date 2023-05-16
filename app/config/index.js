// dotenv is used to get the env variables
import dotenv from 'dotenv';
dotenv.config();

// Fetch all environment variables from .env and make it available to all other modules of the application
export const { PORT, DB_CONN, COOKIE_SECRET } = process.env;