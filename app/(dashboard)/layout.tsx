import React from 'react';
import Navbar from '../components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getSession();
	//console.log(data.session?.user.email);

	//protect dashboard page from unauthenticated users
	if (!data.session) {
		redirect('/login');
	}

	return (
		<>
			<Navbar user={data.session.user} />

			{children}
		</>
	);
}
