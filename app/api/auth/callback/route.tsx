import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// login
export async function GET(request: Request) {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');

	if (code) {
		const supabase = createRouteHandlerClient({ cookies });
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(url.origin);
}
