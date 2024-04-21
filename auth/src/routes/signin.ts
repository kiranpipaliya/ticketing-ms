import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signin', (req: Request, res: Response) => {
	return res.send('hello there');
});

export { router as signinRouter };
