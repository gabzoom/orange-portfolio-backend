import express from 'express';
import connectDatabase from './src/database/db.js';
import userRouter from './src/routes/user.route.js';
import projectRouter from './src/routes/project.route.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const app = express();
connectDatabase();

const port = 3000;

app.use(cors())
app.use(express.json());

app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/files', express.static("src/uploads"))

app.listen(port, () => console.log(`Server started on port ${port}`));