import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { AddEventModal } from "@/components/origin/events/AddEventModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { UserPlusIcon } from "@/components/origin/icons/UserPlusIcon";
import { EditEventModal } from "@/components/origin/events/EditEventModal";
import { ChangeEventStatusModal } from "@/components/origin/events/ChangeEventStatusModal";
import { DeleteEventModal } from "@/components/origin/events/DeleteEventModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SportsButton } from "@/components/origin/events/SportsButton";
import { InfoIcon } from "@/components/origin/icons/InfoIcon";
import { SeeMoreInfoModal } from "@/components/origin/events/SeeMoreInfoModal";
import { DelegatesButton } from "@/components/origin/events/DelegatesButton";

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
  const events = await getEvents();
  const clients = await getClients();

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <h2 className="text-2xl text-emerald-900 font-semibold mb-1.5">Eventos</h2>
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        <AddEventModal clients={clients} />
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
                    <ChangeEventStatusModal
                      event_id={event.eventId}
                      status={event.status}
                    />
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <SeeMoreInfoModal
                      event_name={event.name}
                      client_name={event.client}
                      representative={event.representative}
                      phone={event.phone}
                    />
                    <SportsButton event_id={event.eventId} />
                    <DelegatesButton event_id={event.eventId} />
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