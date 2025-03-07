import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

app.use ("/items", itemRoutes);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"))
