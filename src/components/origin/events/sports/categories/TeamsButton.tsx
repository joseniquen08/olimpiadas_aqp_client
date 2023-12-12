'use client';

import { usePathname, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CategoriesIcon } from "@/components/origin/icons/CategoriesIcon";
import { UsersGroupIcon } from "@/components/origin/icons/UsersGroupIcon";

interface Props {
  category_id: number;
  role_name: string;
}

export function TeamsButton({ category_id, role_name }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={() => router.push(`${pathname.split("/categories")[0]}/category/${category_id}/teams`)} className="h-9 w-9 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
            {role_name == "ADMIN" || role_name == "CLIENTE" ? (
              <UsersGroupIcon />
            ) : (<CategoriesIcon />)}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver equipos</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
