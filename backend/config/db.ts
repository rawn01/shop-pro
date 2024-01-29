import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected: " + connect.connection.host);
    } catch(ex) {
        console.log("Error: " + ex.message);
        process.exit(1);
    }
}

export default connectDb;