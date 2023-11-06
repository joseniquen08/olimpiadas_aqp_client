import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightFromCircle } from "lucide-react";
import { cookies } from "next/headers";

export default function Dashboard() {
  const user = cookies().get('user');
  const { fullName } = JSON.parse(user?.value!);

  return (
    <div className="py-3 flex flex-col space-y-3">
      <header className="border-b border-emerald-600/50">
        <h2 className="text-2xl text-emerald-900 font-semibold mb-2">¡Bienvenid@ {fullName}!</h2>
      </header>
      <div className="flex flex-col space-y-3">
        <p className="font-semibold">Resumen general</p>
        <div className="grid grid-cols-5 gap-3">
          <Card>
            <CardHeader className="px-4 py-2.5">
              <CardTitle className="text-stone-700 text-xl">Eventos</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="font-semibold text-stone-800 text-4xl">20</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-4 py-2.5">
              <CardTitle className="text-stone-700 text-xl">Deportes</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="font-semibold text-stone-800 text-4xl">20</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-4 py-2.5">
              <CardTitle className="text-stone-700 text-xl">Categorías</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="font-semibold text-stone-800 text-4xl">20</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-4 py-2.5">
              <CardTitle className="text-stone-700 text-xl">Equipos</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="font-semibold text-stone-800 text-4xl">20</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-4 py-2.5">
              <CardTitle className="text-stone-700 text-xl">Jugadores</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="font-semibold text-stone-800 text-4xl">20</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col space-y-3 pt-2">
        <p className="font-semibold">Anexos</p>
        <div className="flex flex-col space-y-2">
          <Button variant="link" className="border px-4 py-2 w-96 flex items-center justify-between">
            <span>Bases generales</span>
            <ArrowUpRightFromCircle className="h-4 w-4" />
          </Button>
          <Button variant="link" className="border px-4 py-2 w-96 flex items-center justify-between">
            <span>Resultados de evento anterior</span>
            <ArrowUpRightFromCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
