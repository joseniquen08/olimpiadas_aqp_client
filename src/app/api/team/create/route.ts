export async function POST(request: Request) {
  const { name, nickname, imageUrl, categoryId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/team/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      nickname,
      imageUrl,
      categoryId,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
