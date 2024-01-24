const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        country: { type: String, required: false },
        avatar: { type: String, required: false },
        password: { type: String, required: true },
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;