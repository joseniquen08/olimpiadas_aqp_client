'use client';

import { usePathname, useRouter } from "next/navigation";
import { CategoryPlusIcon } from '@/components/origin/icons/CategoryPlusIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CategoriesIcon } from "@/components/origin/icons/CategoriesIcon";

interface Props {
  sport_event_id: number;
  role_name: string;
}

export function CategoriesButton({ sport_event_id, role_name }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={() => router.push(`${pathname.split("/sports")[0]}/sport/${sport_event_id}/categories`)} className="h-9 w-9 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
            {role_name == "ADMIN" || role_name == "CLIENTE" ? (
              <CategoryPlusIcon />
            ) : (<CategoriesIcon />)}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver categorías</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
