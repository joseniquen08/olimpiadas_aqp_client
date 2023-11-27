export async function DELETE(request: Request) {
  const { categoryId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/category/delete/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
