export async function PUT(request: Request) {
  const { delegateId, email, fullName, roleId, dni, phone } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/user/edit/delegate/${delegateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fullName,
      roleId,
      dni,
      phone,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
