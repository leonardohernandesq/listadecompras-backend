import mongoose from "mongoose";
const { Schema } = mongoose;

const shoppingListSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ShoppingItem',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            bought: {
                type: Boolean,
                default: false,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relaciona a lista ao usuário
        required: true,
    },
    }, {
    timestamps: true,
});

export const ShoppingListModel = mongoose.model("ShoppingList", shoppingListSchema);
