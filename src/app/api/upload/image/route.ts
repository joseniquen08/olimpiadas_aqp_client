export async function POST(request: Request) {
  const formData = await request.formData();

  const res = await fetch(`${process.env.SERVER_URI}/api/upload/image`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  return Response.json(data);
}
