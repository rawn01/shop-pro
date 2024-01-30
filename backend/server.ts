import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();
connectDb();
const PORT = process.env.port || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/status", (req, res) => {
    res.send("API is running")
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
});