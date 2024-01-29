import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "../data/users";
import User from "../models/userModel"; 
import Product from "../models/productModel";
import Order from "../models/orderModel";
import connectDb from "../config/db";
import products from "./products";

dotenv.config();
connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUserId = createdUsers.find((user) => user.isAdmin)._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUserId
            }
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported! :D");
        process.exit();
    } catch(ex) {
        console.log("Error: ", ex.message, ex);
        process.exit(1);
    }
};

const destroyData = async() => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed!");
        process.exit();
    } catch(ex) {
        console.log("Error: ", ex.message, ex);
        process.exit(1);
    }
};

if(process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}