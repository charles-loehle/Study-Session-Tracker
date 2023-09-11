'use client';

import { FormEvent, useState } from 'react';

type AuthFormProps = {
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => Promise<void>;
};

export default function AuthForm({ handleSubmit }: AuthFormProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="row justify-content-center">
			<form
				onSubmit={e => handleSubmit(e, email, password)}
				className="col-lg-6"
			>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						id="email"
						required
						type="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						id="password"
						type="password"
						required
						onChange={e => setPassword(e.target.value)}
						value={password}
						className="form-control"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}
