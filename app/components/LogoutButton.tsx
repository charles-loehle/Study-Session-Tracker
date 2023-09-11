'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		const supabase = createClientComponentClient();
		const { error } = await supabase.auth.signOut();

		if (!error) {
			router.push('/login');
		}
	};

	return (
		<button className="btn btn-primary" onClick={handleLogout}>
			Logout
		</button>
	);
}
