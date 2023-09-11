import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getTotalTime, formatTime } from '@/app/lib/getTotalTime';

type StudySession = {
	id: string;
	title: 'string';
	description: 'string';
	study_time: 'number';
	user_email: 'string';
	created_at: 'string';
};

async function getStudySessions() {
	const supabase = createServerComponentClient({ cookies });
	const { data, error } = await supabase.from('Study-sessions').select();

	if (error) {
		console.log(error.message);
	}

	return data;
}

// // show loading spinner and wait 1 second
// await new Promise(resolve => setTimeout(resolve, 200000));

export default async function StudySessionList() {
	const studySessions = await getStudySessions();
	//console.log(studySessions);

	return (
		<div className="StudySessionList">
			<p>Total study time: {studySessions && getTotalTime(studySessions)}</p>

			{studySessions?.map((studySession: StudySession) => {
				return (
					<div key={studySession.id} className="card border-white mb-3">
						<div className="card-body">
							<h5 className="card-title">{studySession.title}</h5>

							<h6 className="card-subtitle mb-2 text-body-secondary">
								{new Date(studySession.created_at).toDateString()}
							</h6>
							<p className="card-text">
								{studySession.description.slice(0, 200)}...
							</p>
							<p className="text-primary">
								{formatTime(Number(studySession.study_time))}
							</p>
						</div>

						<div className="d-flex justify-content-end align-items-end">
							<Link
								className="stretched-link text-decoration-none"
								href={`/study-sessions/${studySession.id}`}
							></Link>
						</div>
					</div>
				);
			})}
			{studySessions?.length === 0 && <p>There are no tickets to show</p>}
		</div>
	);
}
