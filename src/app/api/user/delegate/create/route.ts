export async function POST(request: Request) {
  const { email, fullName, password, roleId, dni, phone } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/user/create/delegate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fullName,
      password,
      roleId,
      dni,
      phone
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
