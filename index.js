import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser'
import cors from "cors";

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

dotenv.config();
connectDB();

const app = express();
// const app = express() yazdigim icin app.use yaziyorum

const port = process.env.PORT

// app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes) // authRoutes icindeki her route'a burdan gidiyor
app.use('/api/users', userRoutes) // userRoutes icindeki her route'a burdan gidiyor
app.use('/api/todos', todoRoutes) // todoRoutes icindeki her route'a burdan gidiyor


app.use(errorHandler) // bunu burda yaziyorum. cunku en sonda olmasi lazim

app.listen(port, () => console.log(`Server started on port ${port}`))