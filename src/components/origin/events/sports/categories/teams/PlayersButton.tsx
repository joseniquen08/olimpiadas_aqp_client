'use client';

import { usePathname, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CategoriesIcon } from "@/components/origin/icons/CategoriesIcon";
import { UsersGroupIcon } from "@/components/origin/icons/UsersGroupIcon";
import { UsersIcon } from "@/components/origin/icons/UsersIcon";

interface Props {
  team_id: number;
  role_name: string;
}

export function PlayersButton({ team_id, role_name }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={() => router.push(`${pathname.split("/teams")[0]}/team/${team_id}/players`)} className="h-9 w-9 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
            {role_name == "ADMIN" || role_name == "CLIENTE" ? (
              <UsersGroupIcon />
            ) : (<UsersIcon />)}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver jugadores</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
