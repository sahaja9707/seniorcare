// Example secure server endpoint (POST)
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Example: handle secure todo creation
  const body = await request.json();
  // TODO: Add authentication and validation
  return NextResponse.json({ message: 'Todo created', todo: body });
}
