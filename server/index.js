import express from "express";
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
const PORT = 5000;
import cors from 'cors'; 
dotenv.config();
const prisma = new PrismaClient()
const app = express();

const allowedOrigins = [
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  // Add your production domain later
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ensure these are correctly imported
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!") 
    console.log("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
