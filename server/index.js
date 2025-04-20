import express from "express";
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import locationRoutes from './routes/locationRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
const PORT = 5000;
import cors from 'cors'; 
dotenv.config();
const prisma = new PrismaClient()
const app = express();

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/comments', commentRoutes);

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

app.use('/api/locations', locationRoutes);