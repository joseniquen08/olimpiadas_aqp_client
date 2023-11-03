import { cookies } from "next/headers";

export default function Dashboard() {
  const user = cookies().get('user');
  const { fullName } = JSON.parse(user?.value!);

  return (
    <div className="py-2 flex flex-col space-y-3">
      <header className="border-b-2 border-emerald-600/50">
        <h2 className="text-2xl text-emerald-900 font-semibold mb-2">¡Bienvenid@ {fullName}!</h2>
      </header>
      <div>
        <p>Resumen general</p>
      </div>
    </div>
  )
}
