import chalk from 'chalk';
import express from 'express';
import cors from 'cors';
import { dev } from './config';
import { connectDB } from './config/connectDB';
import userRouter from './routes/user.route';
import marketSearchRouter from './routes/market-search.route';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use('/api/user', userRouter);
app.use("/api/market", marketSearchRouter);

const PORT = dev.app.port

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server is running on http://localhost:${PORT}`));

    // Connect to MongoDB
     connectDB();
});