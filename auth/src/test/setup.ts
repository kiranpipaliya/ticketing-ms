import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

beforeAll(async () => {
	process.env.JWT_KEY = 'jwt-key';
	mongo = new MongoMemoryServer();
	await mongo.ensureInstance();
	const monogoUri = await mongo.getUri();
	await mongoose.connect(monogoUri);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});
