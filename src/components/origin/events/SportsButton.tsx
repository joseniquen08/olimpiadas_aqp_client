'use client';

import { OlympicsIcon } from "@/components/origin/icons/OlympicsIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

interface Props {
  event_id: number;
}

export function SportsButton({ event_id }: Props) {
  const router = useRouter();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={() => router.push(`/dashboard/event/${event_id}/sports`)} className="h-9 w-9 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <OlympicsIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver deportes</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
