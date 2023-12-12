import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { AddSportModal } from "@/components/origin/sports/AddSportModal";
import { EditSportModal } from "@/components/origin/sports/EditSportModal";
import { DeleteSportModal } from "@/components/origin/sports/DeleteSportModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

async function getSports() {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/sport/all`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Sports() {
  const sports = await getSports();

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <h2 className="text-2xl text-emerald-900 font-semibold mb-1.5">Deportes</h2>
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        <AddSportModal />
        <Button className="gap-1.5 items-center">
          <FilterIcon />
          <span>Filtros</span>
        </Button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-emerald-800 ">
          <thead className="text-xs text-emerald-900 bg-emerald-50">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-xl">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {sports ? (
              sports.map((sport: any) => (
                <tr key={sport.sportId} className="bg-white border-b font-medium">
                  <td className="px-6 py-4">{sport.name}</td>
                  <td className="px-6 py-4">{sport.description}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <EditSportModal
                      sport_id={sport.sportId}
                      name={sport.name}
                      description={sport.description}
                    />
                    <DeleteSportModal
                      sport_id={sport.sportId}
                      name={sport.name}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3">
                  <Alert variant="destructive" className="w-96 mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error con el servidor (500)</AlertTitle>
                    <AlertDescription>
                      Vuelve a intentarlo más tarde
                    </AlertDescription>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
