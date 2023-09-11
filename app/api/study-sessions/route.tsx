import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const studySession = await request.json();
	// get supabase instance
	const supabase = createRouteHandlerClient({ cookies });

	// get current user session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// create a study session and return it
	const { data, error } = await supabase
		.from('Study-sessions')
		.insert({ ...studySession, user_email: session?.user.email })
		.select()
		.single();

	return NextResponse.json({ data, error });
}
