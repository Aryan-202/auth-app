import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// declarations
const app = express();
const port = process.env.PORT || 3000;
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: allowedOrigins}));

//api endpoints
app.get('/', (req, res)=>{
    res.send('api is running');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})