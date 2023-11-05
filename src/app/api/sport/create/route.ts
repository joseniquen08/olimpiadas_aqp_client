export async function POST(request: Request) {
  const { name, description } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/sport/create`, {
    method: 'POST',
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
