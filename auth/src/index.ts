import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { AppErrorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (req, res) => {
	throw new NotFoundError();
});

app.use(AppErrorHandler);

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
		console.log('Connected to Mongo');
	} catch (error) {
		console.log('DB connect fail', error);
	}
};

app.listen(3000, () => {
	console.log('Auth listening on port 3000 !!!!!!!!!');
});

connectDB();
