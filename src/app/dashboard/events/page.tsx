import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { AddEventModal } from "@/components/origin/events/AddEventModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EditEventModal } from "@/components/origin/events/EditEventModal";
import { ChangeEventStatusModal } from "@/components/origin/events/ChangeEventStatusModal";
import { DeleteEventModal } from "@/components/origin/events/DeleteEventModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SportsButton } from "@/components/origin/events/SportsButton";
import { SeeMoreInfoModal } from "@/components/origin/events/SeeMoreInfoModal";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";

async function getEvents() {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/event/all`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getEventsByClientId(client_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/event/all/client/${client_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getEventsByDelegateId(delegate_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/event/all/delegate/${delegate_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getClients() {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/user/client/all`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Events() {
  const user = JSON.parse(cookies().get("user")?.value!);
  const role_name = user.roleName;

  let events: any[] = [];
  let clients: any[] = [];

  if (role_name == "ADMIN") {
    events = await getEvents();
    clients = await getClients();
  } else if (role_name == "CLIENTE") {
    events = await getEventsByClientId(user.userRoleId);
  } else {
    events = await getEventsByDelegateId(user.userRoleId);
  }

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <h2 className="text-2xl text-emerald-900 font-semibold mb-1.5">
          {role_name == "ADMIN" ? "Eventos" : "Mis eventos"}
        </h2>
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        {role_name == "ADMIN" ? (
          <AddEventModal clients={clients} />
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
                Fecha de inicio
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {events ? (
              events.map((event: any) => (
                <tr key={event.eventId} className="bg-white border-b font-medium">
                  <td className="px-6 py-4">{event.name}</td>
                  <td className="px-6 py-4">{format((new Date(event.startDate)).setDate((new Date(event.startDate).getDate() + 1)), "PPP", { locale: es })}</td>
                  <td className="px-6 py-4">
                    {role_name == "ADMIN" ? (
                      <ChangeEventStatusModal
                        event_id={event.eventId}
                        status={event.status}
                      />
                    ) : (<Badge variant={event.status ? "success" : "danger"}>{event.status ? "Activo" : "Inactivo"}</Badge>)}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <SeeMoreInfoModal
                      event_name={event.name}
                      client_name={event.client}
                      representative={event.representative}
                      phone={event.phone}
                    />
                    <SportsButton event_id={event.eventId} />
                    {role_name == "ADMIN" && (
                      <>
                        <EditEventModal
                          event_id={event.eventId}
                          name={event.name}
                          status={event.status}
                          start_date={new Date((new Date(event.startDate)).setDate((new Date(event.startDate).getDate() + 1)))}
                          client_id={event.clientId}
                          clients={clients}
                        />
                        <DeleteEventModal
                          event_id={event.eventId}
                          name={event.name}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-3">
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