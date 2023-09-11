'use client';

import { FormEvent, useState } from 'react';
import AuthForm from '../AuthForm';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Signup() {
	const router = useRouter();
	const [error, setError] = useState('');

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => {
		e.preventDefault();
		console.log(email, password);

		const supabase = createClientComponentClient();
		const { error } = await supabase.auth.signUp({
			email,
			password,
			// an api route we create for when user clicks the verification link in their email
			options: { emailRedirectTo: `${location.origin}/api/auth/callback` },
		});
		if (error) {
			setError(error.message);
		}
		if (!error) {
			router.push('/verify');
		}
	};

	return (
		<main>
			<h2>Sign Up</h2>

			<AuthForm handleSubmit={handleSubmit} />
			{error && <div className="text-danger">{error}</div>}
		</main>
	);
}
