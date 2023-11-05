'use client';

import { Button } from "@/components/origin/shared/Button";
import { LogoutIcon } from "@/components/origin/icons/LogoutIcon";
import { usePathname, useRouter } from "next/navigation";
import { ButtonAside } from "@/components/origin/aside/ButtonAside";

export function Aside() {
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
    <aside className="[grid-area:aside] p-2">
      <div className="border-emerald-600/30 border-2 h-full rounded-lg flex flex-col space-y-6 px-4 py-6 text-emerald-900">
        <h1 className="text-2xl font-bold">Olimpiadas AQP</h1>
        <ul className="flex-1 flex flex-col gap-2">
          <li>
            <ButtonAside
              className="w-full"
              isPathname={pathname === "/dashboard"}
              action={() => router.push("/dashboard")}
            >
              Inicio
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
              isPathname={pathname === "/dashboard/users"}
              action={() => router.push("/dashboard/users")}
            >
              Usuarios
            </ButtonAside>
          </li>
          <li>
            <ButtonAside
              className="w-full"
              isPathname={pathname === "/dashboard/profile"}
              action={() => {}}
            >
              Perfil
            </ButtonAside>
          </li>
        </ul>
        <Button className="w-full" action={() => logout()}>
          <span>Cerrar sesión</span>
          <LogoutIcon />
        </Button>
      </div>
    </aside>
  )
}