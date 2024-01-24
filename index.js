const express = require('express');
const userRouter = require('./src/routes/user.route');
const connectDatabase = require('./src/database/db')

const app = express();
connectDatabase();
const port = 3000;

app.use(express.json());

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
