import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/origin/events/sports/categories/Breadcrumb";
import { AddCategoryModal } from "@/components/origin/events/sports/categories/AddCategoryModal";
import { DeleteCategoryModal } from "@/components/origin/events/sports/categories/DeleteCategoryModal";

interface Props {
  params: {
    sport_event_id: number
  }
}

async function getCategoriesBySportEventId(sport_event_id: number) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/category/all/sport_event/${sport_event_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
}

export default async function Categories({ params }: Props) {
  const categories = await getCategoriesBySportEventId(params.sport_event_id);

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <Breadcrumb event_name={categories?.eventName} sport_name={categories?.sportName} />
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        <AddCategoryModal sport_event_id={params.sport_event_id} />
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
            {categories ? (
              categories.categories.length > 0 ? (
                categories.categories.map((category: any) => (
                  <tr key={category.categoryId} className="bg-white border-b font-medium">
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <DeleteCategoryModal category_id={category.categoryId} name={category.name} />
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
