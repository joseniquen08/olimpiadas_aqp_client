'use client';

import { Button } from "@/components/origin/shared/Button";
import { LogoutIcon } from "@/components/origin/icons/LogoutIcon";
import { usePathname, useRouter } from "next/navigation";
import { ButtonAside } from "@/components/origin/aside/ButtonAside";
import { Badge } from '@/components/ui/badge';

interface Props {
  role: string;
}

export function Aside({ role }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'GET',
    });

    const data = await response.json();

    if (data.success) {
      router.replace("/login");
    }
  }

  return (
    <aside className="[grid-area:aside]">
      <div className="border-emerald-600/50 border-r h-full flex flex-col space-y-6 py-6 text-emerald-900">
        <div className="px-4">
          <Badge variant="outline-success">
            {role == "ADMIN" ? "admin" : (role == "CLIENTE" ? "cliente" : "delegado")}
          </Badge>
          <h1 className="text-2xl font-bold">Olimpiadas AQP</h1>
        </div>
        <ul className="flex-1 flex flex-col border-t border-emerald-600/50">
          <li>
            <ButtonAside
              className="w-full"
              isPathname={pathname === "/dashboard"}
              action={() => router.push("/dashboard")}
            >
              Inicio
            </ButtonAside>
          </li>
          {role == "ADMIN" && (
            <>
              <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/events"}
                  action={() => router.push("/dashboard/events")}
                >
                  Eventos
                </ButtonAside>
              </li>
              <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/sports"}
                  action={() => router.push("/dashboard/sports")}
                >
                  Deportes
                </ButtonAside>
              </li>
              {/* <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/categories"}
                  action={() => router.push("/dashboard/categories")}
                >
                  Categorías
                </ButtonAside>
              </li> */}
              <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/users"}
                  action={() => router.push("/dashboard/users")}
                >
                  Usuarios
                </ButtonAside>
              </li>
            </>
          )}
          {(role == "CLIENTE" || role == "DELEGADO") && (
            <>
              <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/events"}
                  action={() => router.push("/dashboard/events")}
                >
                  Eventos
                </ButtonAside>
              </li>
              <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/teams"}
                  action={() => router.push("/dashboard/teams")}
                >
                  Equipos
                </ButtonAside>
              </li>
            </>
          )}
          {role == "DELEGADO" && (
            <>
              <li>
                <ButtonAside
                  className="w-full"
                  isPathname={pathname === "/dashboard/players"}
                  action={() => router.push("/dashboard/players")}
                >
                  Jugadores
                </ButtonAside>
              </li>
            </>
          )}
          <li>
            <ButtonAside
              className="w-full"
              isPathname={pathname === "/dashboard/profile"}
              action={() => router.push("/dashboard/profile")}
            >
              Perfil
            </ButtonAside>
          </li>
        </ul>
        <Button className="mx-4" action={() => logout()}>
          <span>Cerrar sesión</span>
          <LogoutIcon />
        </Button>
      </div>
    </aside>
  )
}