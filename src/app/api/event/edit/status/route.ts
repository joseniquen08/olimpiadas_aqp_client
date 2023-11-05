export async function PUT(request: Request) {
  const { eventId, status } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/edit/status/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
