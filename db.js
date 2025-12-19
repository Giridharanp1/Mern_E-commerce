import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection has been established")
    }catch(error){
        console.error(`Connection to MongoDB failed . Reason: ${error}.`);
    }

}

export default connectDB;