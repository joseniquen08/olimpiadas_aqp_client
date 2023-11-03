'use client';

import { Button } from "@/components/origin/shared/Button";
import { LogoutIcon } from "@/components/origin/icons/LogoutIcon";
import { useRouter } from "next/navigation";

export function Aside() {
  const router = useRouter();

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
            <Button className="w-full" action={() => router.push('/dashboard')}>Inicio</Button>
          </li>
          <li>
            <Button className="w-full" action={() => {}}>Deportes</Button>
          </li>
          <li>
            <Button className="w-full" action={() => router.push('/dashboard/events')}>Eventos</Button>
          </li>
          <li>
            <Button className="w-full" action={() => router.push('/dashboard/users')}>Usuarios</Button>
          </li>
          <li>
            <Button className="w-full" action={() => {}}>Perfil</Button>
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