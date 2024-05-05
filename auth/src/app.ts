import express from 'express';
import 'express-async-errors';

import cookieSessions from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { AppErrorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
	cookieSessions({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	}),
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (req, res) => {
	throw new NotFoundError();
});

app.use(AppErrorHandler);

export { app };