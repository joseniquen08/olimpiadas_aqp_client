import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { AddUserModal } from "@/components/origin/users/AddUserModal";
import { EditIcon } from "@/components/origin/icons/EditIcon";
import { DeleteIcon } from "@/components/origin/icons/DeleteIcon";

async function getUsers() {
  const response = await fetch(`${process.env.SERVER_URI}/api/user/all`, {
    method: 'GET',
    cache: 'no-store',
  });

  return response.json();
}

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="py-3 flex flex-col space-y-5">
      <header className="border-b border-emerald-600/50">
        <h2 className="text-2xl text-emerald-900 font-semibold mb-1.5">Usuarios</h2>
      </header>
      <div className="flex justify-between text-emerald-900 text-sm">
        <AddUserModal />
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
                Correo electrónico
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user: any) => (
                <tr key={user.userId} className="bg-white border-b font-medium">
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.roleName}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button type="button" className="h-10 w-10 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
                      <EditIcon />
                    </button>
                    {
                      user.roleName !== "ADMIN" && (
                        <button type="button" className="h-10 w-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                          <DeleteIcon />
                        </button>
                      )
                    }
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