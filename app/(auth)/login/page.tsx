'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthForm from '../AuthForm';
import { FormEvent } from 'react';

export default function Login() {
	const router = useRouter();
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => {
		e.preventDefault();
		console.log(email, password);
		setError('');
		const supabase = createClientComponentClient();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		}
		if (!error) {
			router.push('/');
		}

		router.refresh();
	};

	return (
		<main>
			<h2>Log in</h2>
			<AuthForm handleSubmit={handleSubmit} />
			{error && <p className="text-danger">{error}</p>}
		</main>
	);
}
