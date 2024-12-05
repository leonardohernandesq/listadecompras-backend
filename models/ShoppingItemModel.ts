import mongoose, { Document, Schema } from "mongoose";

interface ShoppingItem extends Document {
    name: string;
    user: mongoose.Schema.Types.ObjectId; // Referência ao usuário
    categoryId: mongoose.Schema.Types.ObjectId; // Referência à lista de compras
}

const shoppingItemSchema = new Schema<ShoppingItem>({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Verifique o nome correto aqui
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true }

}, {
    timestamps: true
});

export const ShoppingItemModel = mongoose.model<ShoppingItem>("ShoppingItem", shoppingItemSchema);
