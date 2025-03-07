import express from "express";
import Item from "../models/Item.js";

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

//Atualizar Item

router.put("/:id", async (req, res) => {
    const updateItem = await Item.findByIdAndUpdate
    (req.params.id, req.body,{ new:true});
    res.json(updateItem);
})

//Apagar item

router.delete("/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted"});
});

export default router;

