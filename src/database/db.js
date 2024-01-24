const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("Connecting to the database...")

    mongoose.connect("mongodb+srv://root:root@cluster0.un3tryp.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("Connected to MongoDB Atlas database"))
        .catch((error) => console.log(error));
}

module.exports = connectDatabase;