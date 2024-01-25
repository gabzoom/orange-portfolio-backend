const express = require('express');
const connectDatabase = require('./src/database/db')
const userRouter = require('./src/routes/user.route');
require('dotenv').config();
const app = express();
connectDatabase();

const port = 3000;

app.use(express.json());

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
