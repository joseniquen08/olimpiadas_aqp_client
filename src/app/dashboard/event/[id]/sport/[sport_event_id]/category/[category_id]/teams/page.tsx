import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/origin/events/sports/categories/teams/Breadcrumb";
import { cookies } from "next/headers";
import { AddTeamModal } from "@/components/origin/events/sports/categories/teams/AddTeamModal";
import Image from "next/image";
import { PlayersButton } from "@/components/origin/events/sports/categories/teams/PlayersButton";

interface Props {
  params: {
    category_id: number
  }
}

async function getTeamsByCategoryId(category_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/team/all/category/${category_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Teams({ params }: Props) {
  const user = JSON.parse(cookies().get("user")?.value!);
  const role_name = user.roleName;

  const teams = await getTeamsByCategoryId(params.category_id);

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <Breadcrumb
          event_name={teams?.eventName}
          sport_name={teams?.sportName}
          category_name={teams?.categoryName}
          role_name={role_name}
        />
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        {role_name == "DELEGADO" ? (
          <AddTeamModal category_id={params.category_id} />
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
                Apodo
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {teams ? (
              teams.teams.length > 0 ? (
                teams.teams.map((team: any) => (
                  <tr key={team.teamId} className="bg-white border-b font-medium">
                    <td className="px-6 py-4 flex space-x-3 items-center">
                      <div className="h-9 w-9 overflow-hidden relative border rounded-lg object-cover">
                        <Image
                          src={team.imageUrl}
                          alt={team.name}
                          fill={true}
                        />
                      </div>
                      <p>{team.nickname}</p>
                    </td>
                    <td className="px-6 py-4">{team.name}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <PlayersButton
                        team_id={team.teamId}
                        role_name={role_name}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 text-center">
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
