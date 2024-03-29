import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        _id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        country: { type: String, required: false },
        avatar: { type: String, required: false },
    }
);

const User = mongoose.model('User', userSchema);

export default User;