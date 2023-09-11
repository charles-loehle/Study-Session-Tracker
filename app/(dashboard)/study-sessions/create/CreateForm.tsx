'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import DateRangePicker from './DateRangePicker';

export default function CreateForm() {
	const router = useRouter();
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	//const [priority, setPriority] = useState<string>('low');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [elapsedTime, setElapsedTime] = useState<string>('');
	const [elapsedTimeInMilliseconds, setElapsedTimeInMilliseconds] =
		useState<number>(0);

	// const calculateTimeElapsed = () => {
	// 	if (startDate && endDate) {
	// 		const elapsedTimeInMilliseconds = endDate.getTime() - startDate.getTime();
	// 		//console.log(elapsedTimeInMilliseconds);
	// 		setElapsedTimeInMilliseconds(elapsedTimeInMilliseconds);
	// 		const hours = Math.floor(elapsedTimeInMilliseconds / 3600000);
	// 		const minutes = Math.ceil((elapsedTimeInMilliseconds % 3600000) / 60000);
	// 		setElapsedTime(
	// 			`${hours} ${hours > 1 ? 'hours' : 'hour'} and ${minutes} minutes`
	// 		);
	// 	} else {
	// 		setElapsedTime('');
	// 	}
	// };

	useEffect(() => {
		// Calculate elapsed time whenever startDate or endDate changes
		const calculateTimeElapsed = () => {
			if (startDate && endDate) {
				const elapsedTimeInMilliseconds =
					endDate.getTime() - startDate.getTime();
				//console.log(elapsedTimeInMilliseconds);
				setElapsedTimeInMilliseconds(elapsedTimeInMilliseconds);
				const hours = Math.floor(elapsedTimeInMilliseconds / 3600000);
				const minutes = Math.ceil(
					(elapsedTimeInMilliseconds % 3600000) / 60000
				);
				setElapsedTime(
					`${hours} ${hours > 1 ? 'hours' : 'hour'} and ${minutes} minutes`
				);
			} else {
				setElapsedTime('');
			}
		};
		calculateTimeElapsed();
	}, [startDate, endDate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const newStudySession = {
			title,
			description,
			// priority,
			study_time: elapsedTimeInMilliseconds,
		};

		const res = await fetch('http://localhost:3000/api/study-sessions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newStudySession),
		});

		// the data we get back from api route POST request
		const json = await res.json();

		if (json.error) {
			console.log(json.error.message);
		}
		// if successful
		if (json.data) {
			router.refresh();
			router.push('/study-sessions');
		}
	};

	return (
		<div className="row justify-content-center">
			<form onSubmit={handleSubmit} className="col-lg-6">
				<div className="mb-3">
					<label className="form-label">Title</label>
					<input
						required
						type="text"
						onChange={e => setTitle(e.target.value)}
						value={title}
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Description</label>
					<textarea
						required
						onChange={e => setDescription(e.target.value)}
						value={description}
						className="form-control"
					></textarea>
				</div>
				<div className="mb-3">
					<div className="mb-3">
						<p className="mb-0">Select a start date and time:</p>
						<DateRangePicker
							selectedDate={startDate}
							onDateChange={date => setStartDate(date)}
						/>
					</div>
					<div className="mb-3">
						<p className="mb-0">Select an end date and time:</p>
						<DateRangePicker
							selectedDate={endDate}
							onDateChange={date => setEndDate(date)}
						/>
					</div>

					{elapsedTime && (
						<div>
							<p>Time Elapsed: {elapsedTime}</p>
						</div>
					)}
				</div>
				{/* <div className="mb-3">
					<label className="form-label">Priority</label>
					<select
						onChange={e => setPriority(e.target.value)}
						value={priority}
						className="form-select"
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div> */}
				<button disabled={isLoading} type="submit" className="btn btn-primary">
					{isLoading && <span>Adding...</span>}
					{!isLoading && <span>Add Study Session</span>}
				</button>
			</form>
		</div>
	);
}
