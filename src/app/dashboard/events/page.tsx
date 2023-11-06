import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { DeleteIcon } from "@/components/origin/icons/DeleteIcon";
import { AddEventModal } from "@/components/origin/events/AddEventModal";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { OlympicsIcon } from "@/components/origin/icons/OlympicsIcon";
import { UserPlusIcon } from "@/components/origin/icons/UserPlusIcon";
import { EditEventModal } from "@/components/origin/events/EditEventModal";
import { ChangeEventStatusModal } from "@/components/origin/events/ChangeEventStatusModal";
import { DeleteEventModal } from "@/components/origin/events/DeleteEventModal";

async function getEvents() {
  const response = await fetch(`${process.env.SERVER_URI}/api/event/all`, {
    method: 'GET',
    cache: 'no-store',
  });

  return response.json();
}

async function getClients() {
  const response = await fetch(`${process.env.SERVER_URI}/api/user/client/all`, {
    method: 'GET',
    cache: 'no-store',
  });

  return response.json();
}

export default async function Events() {
  const events = await getEvents();
  const clients = await getClients();

  const dtf = new Intl.DateTimeFormat('es', {
    timeZone: 'America/Lima'
  });

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
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              events?.map((event: any) => (
                <tr key={event.eventId} className="bg-white border-b font-medium">
                  <td className="px-6 py-4">{event.name}</td>
                  <td className="px-6 py-4">{format((new Date(event.startDate)).setDate((new Date(event.startDate).getDate() + 1)), "PPP", { locale: es })}</td>
                  <td className="px-6 py-4">
                    <ChangeEventStatusModal
                      event_id={event.eventId}
                      status={event.status}
                    />
                  </td>
                  <td className="px-6 py-4">{event.client}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button type="button" className="h-9 w-9 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <OlympicsIcon />
                    </button>
                    <button type="button" className="h-9 w-9 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                      <UserPlusIcon />
                    </button>
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
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}