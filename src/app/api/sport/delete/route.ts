export async function DELETE(request: Request) {
  const { sportId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/sport/delete/${sportId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
