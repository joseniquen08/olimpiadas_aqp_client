import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  if (request.cookies.has('token') && request.cookies.has('user')) {
    cookies().delete('token');
    cookies().delete('user');
    return Response.json({ success: true });
  }

  return Response.json({ success: false });
}