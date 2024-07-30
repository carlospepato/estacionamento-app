import dotenv from 'dotenv';

dotenv.config();

interface Config{
  port: number;
  dbUrl: string;
}

export const config : Config = {
  port: parseInt(process.env.PORT || '3000'),
  dbUrl: process.env.DB_URL || ''
}