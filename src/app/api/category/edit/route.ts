export async function PUT(request: Request) {
  const { categoryId, name, description } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/category/edit/${categoryId}`, {
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
