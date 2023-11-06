export async function PUT(request: Request) {
  const { clientId, email, fullName, roleId, ruc, representative, phone } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/user/edit/client/${clientId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fullName,
      roleId,
      ruc,
      representative,
      phone,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
