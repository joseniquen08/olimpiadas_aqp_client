export async function POST(request: Request) {
  const { eventId, delegateId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/assign/delegate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventId,
      delegateId,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
