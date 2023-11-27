export async function POST(request: Request) {
  const { name, description, sportEventId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/category/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      sportEventId,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
