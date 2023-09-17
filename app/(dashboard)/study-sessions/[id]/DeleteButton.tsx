'use client';

import { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
import { corsHeaders } from '@/supabase-functions/_shared/cors';

export default function DeleteButton({ id }: { id: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		setIsLoading(true);
		const res = await fetch(`http://localhost:3000/api/study-sessions/${id}`, {
			method: 'DELETE',
			headers: corsHeaders,
		});
		const json = await res.json();

		if (json.error) {
			console.log(json.error);
			setIsLoading(false);
		}
		if (!json.error) {
			router.refresh();
			router.push('/study-sessions');
		}
	};

	return (
		<button
			className="btn btn-primary"
			onClick={handleClick}
			disabled={isLoading}
		>
			{isLoading && (
				<>
					<TiDelete />
					Deleting...
				</>
			)}
			{!isLoading && (
				<>
					<TiDelete />
					Delete Study Session
				</>
			)}
		</button>
	);
}
