import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Generated by create next app',
};

export default function Home() {
	return (
		<main className="Dashboard container">
			<h1>Dashboard</h1>
		</main>
	);
}

