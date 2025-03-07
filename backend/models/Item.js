import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
    name:String,
    description: String,
});

export default mongoose.model("Item", itemSchema);