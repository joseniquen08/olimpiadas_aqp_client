export async function PUT(request: Request) {
  const { sportId, name, description } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/sport/edit/${sportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
