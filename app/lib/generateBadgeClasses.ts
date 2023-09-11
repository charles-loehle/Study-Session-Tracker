export default function generateBadgeClasses(priority: string) {
	if (priority === 'low') {
		return 'info';
	}

	if (priority === 'medium') {
		return 'warning';
	}

	if (priority === 'high') {
		return 'danger';
	}
}
