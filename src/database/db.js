const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("Connecting to the database...")

    mongoose.connect(process.env.DB_URI_KEY)
        .then(() => console.log("Connected to MongoDB Atlas database"))
        .catch((error) => console.log(error));
}

module.exports = connectDatabase;