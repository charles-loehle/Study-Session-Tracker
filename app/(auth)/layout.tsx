import React from 'react';
import Link from 'next/link';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const supabase = createServerComponentClient({ cookies });
	// const { data } = await supabase.auth.getSession();

	// // redirect unauthenticated users to dashboard
	// if (data.session) {
	// 	redirect('/');
	// }

	return (
		<>
			<div className="container">
				<header className="row py-3 mb-4 border-bottom">
					<div className="col-lg-4">
						<Link
							href="/"
							className="fw-bold fs-3 text-primary d-inline-flex link-body-emphasis text-decoration-none align-items-end"
						>
							<h3 className="fw-bold mb-0">Dojo Helpdesk</h3>
						</Link>
					</div>

					<ul className="nav col align-items-center justify-content-start">
						<li>
							<Link href="/signup" className="nav-link px-2 text-body-tertiary">
								Sign up
							</Link>
						</li>
						<li>
							<Link href="/login" className="nav-link px-2 text-body-tertiary">
								Log in
							</Link>
						</li>
					</ul>
				</header>
			</div>
			{children}
		</>
	);
}
