import request from 'supertest';
import { app } from '../../app';

describe('Signup Route', () => {
	it('returns a 201 on successful signup', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: ' password',
			})
			.expect(201);
	});

	it('returns a 400 with invalid email', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({
				email: 'tes.com',
				password: 'password',
			})
			.expect(400);
	});

	it('returns a 400 with invalid password', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: 'p',
			})
			.expect(400);
	});

	it('returns a 400 with missing email & password', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({
				email: '',
				password: 'password',
			})
			.expect(400);

		await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: '',
			})
			.expect(400);
	});

	it('disallow duplicate email', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: 'password',
			})
			.expect(201);

		await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: 'password',
			})
			.expect(400);
	});

	it('set cookies after successful signup', async () => {
		const response = await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: 'password',
			})
			.expect(201);

		expect(response.get('Set-Cookie')).toBeDefined();
	});
});
