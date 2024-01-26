import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const projectSchema = new Schema(
    {
        title: { type: String, required: true },
        tags: { type: Array },
        urlGithub: { type: String, required: true },
        description: { type: String, required: true },
        projectImage: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
);

const Project = mongoose.model('Project', projectSchema);

export default Project;