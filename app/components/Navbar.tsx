import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Navbar({ user }: any) {
	return (
		<nav className="navbar navbar-expand-md mb-4 border-bottom">
			<div className="container-fluid">
				<Link className="navbar-brand text-primary" href="/">
					Study Tracker
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav me-auto mb-2 mb-md-0">
						<li className="nav-item">
							<Link className="nav-link" href="/">
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" href="/study-sessions">
								Study Sessions
							</Link>
						</li>
					</ul>
					<div className="d-flex align-items-center">
						{user && <p className="me-4 mb-0">Hello, {user.email}</p>}
						<LogoutButton />
					</div>
				</div>
			</div>
		</nav>
	);
}
