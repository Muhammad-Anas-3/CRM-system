import express from 'express';
import connectDb from './db/connectDb.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import customerRoutes from './routes/customers.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Connect to MongoDB 
connectDb();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
// Use customer routes on the root path
app.use('/', customerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
