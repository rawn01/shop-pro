import express from "express";
import products from "./data/products";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.port || 8000;

app.get("/status", (req, res) => {
    res.send("API is running")
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p._id === id);
    res.json(product);
});

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
});