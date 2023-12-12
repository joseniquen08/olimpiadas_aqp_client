export async function POST(request: Request) {
  const { name, birthdate, gender, height, weight, jerseyNumber, teamId } = await request.json();

  const res = await fetch(`${process.env.SERVER_URI}/api/player/create`, {
    method: 'POST',
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
      teamId,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
