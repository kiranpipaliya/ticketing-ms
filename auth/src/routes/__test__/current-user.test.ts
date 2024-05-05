import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../testUtils/signin';

describe('Current U ser Route', () => {
	it('response with details bout current user ', async () => {
		const cookie = await signin();

		const response = await request(app)
			.get('/api/users/currentUser')
			.set('Cookie', cookie)
			.send()
			.expect(200);

		expect(response.body.currentUser.email).toEqual('test@test.com');
	});

	it('response with null if no authenticated', async () => {
		const response = await request(app)
			.get('/api/users/currentUser')
			.send()
			.expect(200);

		expect(response.body.currentUser).toEqual(null);
	});
});
