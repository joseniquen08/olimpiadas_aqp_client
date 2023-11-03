export async function POST(request: Request) {
  const { email, fullName, password, roleId, ruc, representative, phone } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/user/create/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fullName,
      password,
      roleId,
      ruc,
      representative,
      phone
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
