export async function PUT(request: Request) {
  const { playerId, name, birthdate, gender, height, weight, jerseyNumber } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/player/edit/${playerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      birthdate,
      gender,
      height,
      weight,
      jerseyNumber,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
