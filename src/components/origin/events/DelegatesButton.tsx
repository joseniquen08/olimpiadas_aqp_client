'use client';

import { OlympicsIcon } from "@/components/origin/icons/OlympicsIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { UserPlusIcon } from '@/components/origin/icons/UserPlusIcon';

interface Props {
  event_id: number;
}

export function DelegatesButton({ event_id }: Props) {
  const router = useRouter();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={() => router.push(`/dashboard/event/${event_id}/delegates`)} className="h-9 w-9 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
            <UserPlusIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver delegados</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
