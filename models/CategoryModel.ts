import mongoose from "mongoose";
const { Schema } = mongoose;


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export const CategoryModel = mongoose.model("Category", categorySchema);
