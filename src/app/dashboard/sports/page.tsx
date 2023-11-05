import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { EditIcon } from "@/components/origin/icons/EditIcon";
import { DeleteIcon } from "@/components/origin/icons/DeleteIcon";
import { Badge } from "@/components/ui/badge";
import { AddSportModal } from "@/components/origin/sports/AddSportModal";
import { PlusIcon } from "@/components/origin/icons/PlusIcon";
import { EditSportModal } from "@/components/origin/sports/EditSportModal";

async function getSports() {
  const response = await fetch(`${process.env.SERVER_URI}/api/sport/all`, {
    method: 'GET',
    cache: 'no-store',
  });

  return response.json();
}

export default async function Sports() {
  const sports = await getSports();

  const dtf = new Intl.DateTimeFormat('es', {
    timeZone: 'America/Lima'
  });

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
              <th scope="col" className="px-6 py-3">
                Total de categorías
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              sports?.map((sport: any) => (
                <tr key={sport.sportId} className="bg-white border-b font-medium">
                  <td className="px-6 py-4">{sport.name}</td>
                  <td className="px-6 py-4">{sport.description}</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 flex space-x-4">
                    <EditSportModal sport_id={sport.sportId} name={sport.name} description={sport.description} />
                    <button type="button" className="h-9 w-9 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}