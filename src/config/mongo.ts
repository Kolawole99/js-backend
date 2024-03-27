import mongoose from "mongoose";

import Environment from "./env.js";

import Logger from "../utils/logger.js";

/** This adds a global promise to mongoose */
mongoose.Promise = global.Promise;

/** This is a TS binding that makes mongoose accept empty string "" as a valid string value */
mongoose.Schema.Types.String.checkRequired(v => v != null);

type Mongoose = typeof mongoose;

class Mongo {
    private static client: Mongoose | undefined;

    public static async connect(): Promise<Mongoose> {
        if (!this.client || !this.client.connections[0].readyState) {
            Logger.info("Creating new MongoDB connection");

            mongoose.set("strictQuery", false);
            this.client = await mongoose.connect(Environment.MONGO_URL, {
                connectTimeoutMS: Environment.MONGO_TIMEOUT,
                serverSelectionTimeoutMS: Environment.MONGO_TIMEOUT,
                socketTimeoutMS: Environment.MONGO_TIMEOUT
            });

            Logger.info("Connected to MongoDB successfully");

            return this.client;
        }

        Logger.info("Using existing MongoDB connection");

        return this.client;
    }
}

export default Mongo;
