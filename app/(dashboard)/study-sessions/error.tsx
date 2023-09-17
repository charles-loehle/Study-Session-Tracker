// 'use client';

// export default function error({ error, reset }) {
// 	return (
// 		<div>
// 			<h2>Oh Noes!...</h2>
// 			<p>{error.message}</p>
// 			<button onClick={reset} className="btn btn-primary">
// 				Try again?
// 			</button>
// 		</div>
// 	);
// }

'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
}
