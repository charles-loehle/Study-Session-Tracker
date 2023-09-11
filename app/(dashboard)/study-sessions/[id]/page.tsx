import generateBadgeClasses from '@/app/lib/generateBadgeClasses';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { formatTime } from '@/app/lib/getTotalTime';
import DeleteButton from './DeleteButton';

type StudySession = {
	id: string;
	title: 'string';
	description: 'string';
	time: 'string';
	user_email: 'string';
	study_time: number;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient({ cookies });
	const { data: studySession } = await supabase
		.from('Study-sessions')
		.select()
		.eq('id', params.id)
		.single();

	return {
		title: `${studySession?.title || 'Not found'}`,
	};
}

async function getStudySession(id: string) {
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase
		.from('Study-sessions')
		.select()
		.eq('id', id)
		.single();

	if (!data) {
		notFound();
	}
	return data;
}

export default async function StudySessionDetails({
	params,
}: {
	params: { id: string };
}) {
	const id = params.id;
	const studySession = await getStudySession(id);
	const supabase = createServerComponentClient({ cookies });
	// get current user
	const { data } = await supabase.auth.getSession();

	return (
		<div className="container pt-4">
			<h1 className="text-primary">Study Session Details</h1>
			<div>
				{data.session?.user.email === studySession.user_email && (
					<DeleteButton id={studySession.id} />
				)}
			</div>
			<div className="card border-white mb-3">
				<div className="card-body">
					<h2 className="card-title">{studySession.title}</h2>
					<h6 className="card-subtitle mb-2 text-body-secondary">
						{new Date(studySession.created_at).toDateString()}
					</h6>
					<p className="card-text">{studySession.description}</p>
					<p className="text-primary">{formatTime(studySession.study_time)}</p>
				</div>
				<div className="d-flex justify-content-end align-items-end">
					<span
						className={`badge text-bg-${generateBadgeClasses(
							studySession.time
						)}`}
					>
						{studySession.time} priority
					</span>
				</div>
			</div>
		</div>
	);
}
