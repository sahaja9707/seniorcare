// Clear cookie
import { NextResponse } from 'next/server';

export async function POST() {
  // Example: clear the session cookie
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
    sameSite: 'lax',
  });
  return response;
}
