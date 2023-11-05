export async function PUT(request: Request) {
  const { eventId, name, startDate, status, clientId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/edit/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      startDate,
      status,
      clientId
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
