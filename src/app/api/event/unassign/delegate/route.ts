export async function DELETE(request: Request) {
  const { delegateEventId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/unassign/delegate/${delegateEventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
