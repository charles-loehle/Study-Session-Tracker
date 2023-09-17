import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(_: any, { params }: { params: { id: string } }) {
	const supabase = createRouteHandlerClient({ cookies });
	const { error } = await supabase
		.from('Study-sessions')
		.delete()
		.eq('id', params.id);

	return NextResponse.json({ error });
}

// PUT - update
export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	console.log('PUT function route called!');

	const studySession = await request.json();
	const supabase = createRouteHandlerClient({ cookies });

	// get current user session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// update a study session and return it
	const { data, error } = await supabase
		.from('Study-sessions')
		.update({ ...studySession, user_email: session?.user.email });
	//.eq('user_email', user?.user_email); //comparison function to return only data with the user id matching the current logged in user

	if (error) {
		throw new Error('Could not edit study session');
	} else {
		console.log('Item updated successfully:', data);
	}

	return NextResponse.json({ data, error });
}
