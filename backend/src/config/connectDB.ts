import mongoose from "mongoose";
import { dev } from ".";
import chalk from "chalk";

export const connectDB = async () => {
    try {
        await mongoose.connect(dev.app.dburl);
        console.log(chalk.blue("MongoDB connected"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};