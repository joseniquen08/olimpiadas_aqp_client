export async function POST(request: Request) {
  const { eventId, sportId, delegateId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/assign/sport`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventId,
      sportId,
      delegateId,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
