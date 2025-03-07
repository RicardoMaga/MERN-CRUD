import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());


app.use ("/items", itemRoutes);

mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas Conectado!"))
.catch((err) => console.log("❌ Erro ao conectar ao MongoDB:", err));

app.listen(5000, () => console.log("Server running on port 5000"))

