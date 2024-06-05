import { config } from 'dotenv';

config();

export const dev = {
    app: {
        port: process.env.PORT,
        dburl:String(process.env.DB_URL)
    }
}