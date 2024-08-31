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
    origin: 'https://crm-system-five.vercel.app', // Frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Connect to MongoDB 
connectDb();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
