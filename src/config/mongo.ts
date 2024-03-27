import mongoose from "mongoose";

import Logger from "../utils/logger.js";
import Environment from "./env.js";

/** This adds a global promise to mongoose */
mongoose.Promise = global.Promise;

/** This is a TS binding that makes mongoose accept empty string "" as a valid string value */
mongoose.Schema.Types.String.checkRequired((v) => v != null);

type Mongoose = typeof mongoose;

interface MongoType {
	client: Mongoose | undefined;
	connect: () => Promise<Mongoose>;
}

const Mongo: MongoType = {
	client: undefined,
	connect: async (): Promise<Mongoose> => {
		if (!Mongo.client || !Mongo.client.connections[0].readyState) {
			Logger.info("Creating new MongoDB connection");

			mongoose.set("strictQuery", false);
			Mongo.client = await mongoose.connect(Environment.MONGO_URL, {
				connectTimeoutMS: Environment.MONGO_TIMEOUT,
				serverSelectionTimeoutMS: Environment.MONGO_TIMEOUT,
				socketTimeoutMS: Environment.MONGO_TIMEOUT,
			});

			Logger.info("Connected to MongoDB successfully");

			return Mongo.client;
		}

		Logger.info("Using existing MongoDB connection");

		return Mongo.client;
	},
};

export default Mongo;
