import mongoose, { mongo } from "mongoose";

export const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to database");
    } catch (error) {
        console.log("error base");
    }
}