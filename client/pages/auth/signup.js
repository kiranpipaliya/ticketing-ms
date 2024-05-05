import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';

const signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { doRequest, isLoading, errors } = useRequest({
		method: 'post',
		url: '/api/users/signup',
		body: {
			email,
			password,
		},
	});
	const onSubmit = async (e) => {
		e.preventDefault();
		doRequest();
	};
	return (
		<form onSubmit={onSubmit}>
			<h1>Sign Up</h1>
			<div className="form-group">
				<label>Email Address</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="form-control"
				/>
			</div>

			{errors}

			<button className="btn btn-primary">Sign up</button>
		</form>
	);
};

export default signup;
