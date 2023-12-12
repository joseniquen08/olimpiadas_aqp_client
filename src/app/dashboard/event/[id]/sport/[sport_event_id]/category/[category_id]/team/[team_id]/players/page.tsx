import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/origin/events/sports/categories/teams/players/Breadcrumb";
import { cookies } from "next/headers";
import { AddPlayerModal } from "@/components/origin/events/sports/categories/teams/players/AddPlayerModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EditPlayerModal } from "@/components/origin/events/sports/categories/teams/players/EditPlayerModal";

interface Props {
  params: {
    team_id: number
  }
}

async function getPlayersByTeamId(team_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/player/all/team/${team_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Players({ params }: Props) {
  const user = JSON.parse(cookies().get("user")?.value!);
  const role_name = user.roleName;

  const players = await getPlayersByTeamId(params.team_id);

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <Breadcrumb
          event_name={players?.eventName}
          sport_name={players?.sportName}
          category_name={players?.categoryName}
          team_name={players?.teamName}
          role_name={role_name}
        />
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        {role_name == "DELEGADO" ? (
          <AddPlayerModal team_id={params.team_id} />
        ) : (<span></span>)}
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
                Fecha de cumpleaños
              </th>
              <th scope="col" className="px-6 py-3">
                Altura
              </th>
              <th scope="col" className="px-6 py-3">
                Peso
              </th>
              <th scope="col" className="px-6 py-3">
                N° de camiseta
              </th>
              <th scope="col" className="px-6 py-3">
                Género
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {players ? (
              players.players.length > 0 ? (
                players.players.map((player: any) => (
                  <tr key={player.playerId} className="bg-white border-b font-medium">
                    <td className="px-6 py-4">{player.name}</td>
                    <td className="px-6 py-4">{format((new Date(player.birthdate)).setDate((new Date(player.birthdate).getDate() + 1)), "PPP", { locale: es })}</td>
                    <td className="px-6 py-4">{player.height} m</td>
                    <td className="px-6 py-4">{player.weight} kg</td>
                    <td className="px-6 py-4">{player.jerseyNumber}</td>
                    <td className="px-6 py-4">{player.gender}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      {role_name == "DELEGADO" && (
                        <>
                          <EditPlayerModal
                            player_id={player.playerId}
                            name={player.name}
                            birthdate={new Date((new Date(player.birthdate)).setDate((new Date(player.birthdate).getDate() + 1)))}
                            height={player.height}
                            weight={player.weight}
                            jersey_number={player.jerseyNumber}
                            gender={player.gender}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-3 text-center">
                    No se econtraron resultados
                  </td>
                </tr>
              )
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
