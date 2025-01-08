import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export const connectToDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL nicht gefunden");
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "threads",
            bufferCommands: false,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            serverSelectionTimeoutMS: 30000,
        });

        cachedConnection = conn;
        console.log("MongoDB verbunden");
        return conn;
    } catch (error) {
        console.error("MongoDB Verbindungsfehler:", error);
        throw error;
    }
}