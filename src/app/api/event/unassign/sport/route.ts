export async function DELETE(request: Request) {
  const { sportEventId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/event/unassign/sport/${sportEventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
