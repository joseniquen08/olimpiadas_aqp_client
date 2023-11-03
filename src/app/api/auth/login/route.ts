import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (data.status == 200) {
    cookies().set('token', data.token.split(' ')[1]);
    cookies().set('user', JSON.stringify(data.user));
  }

  return Response.json(data);
}
