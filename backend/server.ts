import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import productRoutes from "./routes/productRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();
connectDb();
const PORT = process.env.port || 8000;

const app = express();

app.get("/status", (req, res) => {
    res.send("API is running")
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
});