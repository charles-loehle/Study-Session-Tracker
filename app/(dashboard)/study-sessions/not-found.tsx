import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="NotFound text-center">
			<h1 className="text-primary">There was a problem</h1>
			<p>We could not find the page you were looking for</p>
			<Link href="/">Go Home</Link>
		</div>
	);
}
