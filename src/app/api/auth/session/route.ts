// Create session cookie
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Example: set a session cookie
  const response = NextResponse.json({ message: 'Session created' });
  response.cookies.set('session', 'example-session-token', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}
