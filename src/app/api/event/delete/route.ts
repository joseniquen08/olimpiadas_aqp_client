export async function DELETE(request: Request) {
  const { eventId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/delete/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
