import express, { Router } from "express";
import item from "../models/Item.js";

const router = express.Router();


//Criar Item

router.post("/", async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

//Ler Item

router.get("/", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});


