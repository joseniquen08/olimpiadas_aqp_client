import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/origin/events/sports/Breadcrumb";
import { AssignSportModal } from "@/components/origin/events/sports/AssignSportModal";
import { UnassignSportModal } from "@/components/origin/events/sports/UnassignSportModal";
import { CategoriesButton } from "@/components/origin/events/sports/CategoriesButton";
import { cookies } from "next/headers";

interface Props {
  params: {
    id: number
  }
}

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

async function getSportsByEventId(event_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/sport/all/event/${event_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getSportsByEventIdAndDelegateId(event_id: number, delegate_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/sport/all/event_delegate/${event_id}/${delegate_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getDelegates() {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/user/delegate/all`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Sports({ params }: Props) {
  const user = JSON.parse(cookies().get("user")?.value!);
  const role_name = user.roleName;

  let sportsTotal: any;
  let sports: any;
  let delegatesTotal: any[] = [];

  if (role_name == "ADMIN") {
    sports = await getSportsByEventId(params.id);
  } else if (role_name == "CLIENTE") {
    sportsTotal = await getSports();
    sports = await getSportsByEventId(params.id);
    delegatesTotal = await getDelegates();
  } else if (role_name == "DELEGADO") {
    sports = await getSportsByEventIdAndDelegateId(params.id, user.userRoleId);
  }

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <Breadcrumb event_name={sports?.eventName} role_name={role_name} />
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        {role_name == "CLIENTE" ? (
          <AssignSportModal
            event_id={params.id}
            sports={sports}
            sportsTotal={sportsTotal}
            delegatesTotal={delegatesTotal}
          />
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
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                Delegado
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
            {sports ? (
              sports.sports.length > 0 ? (
                sports.sports.map((sport: any) => (
                  <tr key={sport.sportId} className="bg-white border-b font-medium">
                    <td className="px-6 py-4">{sport.name}</td>
                    <td className="px-6 py-4">{sport.description}</td>
                    <td className="px-6 py-4">{sport.delegate}</td>
                    <td className="px-6 py-4">{sport.totalCategories}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <CategoriesButton
                        sport_event_id={sport.sportEventId}
                        role_name={role_name}
                      />
                      {(role_name == "ADMIN" || role_name == "CLIENTE") && (
                        <UnassignSportModal
                          sport_event_id={sport.sportEventId}
                          name={sport.name}
                        />
                      )}
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
