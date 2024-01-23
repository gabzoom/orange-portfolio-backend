const express = require('express');
const userRoute = require('./src/routes/user.route');

const app = express();
const port = 3000;

app.use('/users', userRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));
