import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/origin/events/delegates/Breadcrumb";
import { AssignSportModal } from "@/components/origin/events/sports/AssignSportModal";
import { UnassignSportModal } from "@/components/origin/events/sports/UnassignSportModal";
import { AssignDelegateModal } from "@/components/origin/events/delegates/AssignDelegateModal";
import { UnassignDelegateModal } from "@/components/origin/events/delegates/UnassignDelegateModal";

interface Props {
  params: {
    id: number
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

async function getDelegatesByEventId(event_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/user/delegate/all/event/${event_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Sports({ params }: Props) {
  const delegatesTotal = await getDelegates();
  const delegates = await getDelegatesByEventId(params.id);

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <Breadcrumb event_name={delegates.eventName} />
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        <AssignDelegateModal event_id={params.id} delegates={delegates} delegatesTotal={delegatesTotal} />
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
                Teléfono
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {delegates ? (
              delegates.delegates.length > 0 ? (
                delegates.delegates.map((delegate: any) => (
                  <tr key={delegate.delegateId} className="bg-white border-b font-medium">
                    <td className="px-6 py-4">{delegate.fullName}</td>
                    <td className="px-6 py-4">{delegate.phone}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <UnassignDelegateModal
                        delegate_event_id={delegate.delegateEventId}
                        name={delegate.fullName}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-3 text-center">
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
