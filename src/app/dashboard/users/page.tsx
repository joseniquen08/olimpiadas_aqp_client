import { Button } from "@/components/origin/shared/Button";
import { FilterIcon } from "@/components/origin/icons/FilterIcon";
import { AddUserModal } from "@/components/origin/users/AddUserModal";
import { EditClientModal } from "@/components/origin/users/EditClientModal";
import { EditDelegateModal } from "@/components/origin/users/EditDelegateModal";
import { DeleteUserModal } from "@/components/origin/users/DeleteUserModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

async function getUsers() {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/user/all`, {
      method: 'GET',
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.log("Error");
  }
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
            {users ? (
              users?.map((user: any) => (
                <tr key={user.userId} className="bg-white border-b font-medium">
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.roleName}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    {
                      user.roleName == "CLIENTE" && (
                        <EditClientModal
                          client_id={user.client.clientId}
                          full_name={user.fullName}
                          email={user.email}
                          phone={user.client.phone}
                          representative={user.client.representative}
                          ruc={user.client.ruc}
                        />
                      )
                    }
                    {
                      user.roleName == "DELEGADO" && (
                        <EditDelegateModal
                          delegate_id={user.delegate.delegateId}
                          full_name={user.fullName}
                          email={user.email}
                          phone={user.delegate.phone}
                          dni={user.delegate.dni}
                        />
                      )
                    }
                    {
                      user.roleName !== "ADMIN" && (
                        <DeleteUserModal
                          user_id={user.userId}
                          name={user.fullName}
                        />
                      )
                    }
                  </td>
                </tr>
              ))
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