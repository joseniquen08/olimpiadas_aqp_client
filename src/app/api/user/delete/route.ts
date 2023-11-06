export async function DELETE(request: Request) {
  const { userId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/user/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
