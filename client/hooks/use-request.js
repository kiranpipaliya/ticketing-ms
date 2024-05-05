import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body }) => {
	const [errors, setErrors] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const doRequest = async () => {
		try {
			setErrors(null);
			const response = await axios[method](url, body);
			setIsLoading(false);
		} catch (errors) {
			setErrors(
				<div className="alert alert-danger my-3">
					<h4>Ooops.....</h4>
					<ul className="my-0">
						{errors.response.data.errors.map((err) => (
							<li key={err.message}>{err.message}</li>
						))}
					</ul>
				</div>,
			);
			setIsLoading(false);
		}
	};
	return { isLoading, doRequest, errors };
};
