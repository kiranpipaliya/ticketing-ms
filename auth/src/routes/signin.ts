import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../modles/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/pasword';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Please enter valid email address'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply  password'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new BadRequestError('Invalid credentials');
		}
		const passwordMatch = await Password.compare(
			existingUser.password,
			password,
		);

		if (!passwordMatch) {
			throw new BadRequestError('Invalid credentials');
		}

		const jwtToken = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!,
		);
		req.session = {
			jwt: jwtToken,
		};

		return res.status(200).send(existingUser);
	},
);

export { router as signinRouter };
