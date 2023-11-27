'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';

interface Props {
  event_id: number;
  status: boolean;
}

export function ChangeEventStatusModal({ event_id, status }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);

    const response = await fetch(`/api/event/edit/status`, {
      method: 'PUT',
      body: JSON.stringify({
        eventId: event_id,
        status: !status,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 204) {
      setIsOpen(false);
      router.refresh();
      setLoading(false);
    } else {
      console.log("Error");
      setLoading(false);
    }
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={(open) => {setIsOpen(open)}} >
        <PopoverTrigger asChild>
          <Button className={cn(badgeVariants({ variant: status ? "success" : "danger" }), "h-5 cursor-pointer")}>{status ? "Activo" : "Inactivo"}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="space-y-4">
            <h4 className="font-medium text-sm leading-none text-center">Cambiar estado</h4>
            <Button onClick={onSubmit} variant="outline" size="sm" className="w-full disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100" disabled={loading}>
              {
                loading ? (
                  <>
                    <LoadingIcon color="fill-emerald-500 mr-2" />
                    <span>Cargando...</span>
                  </>
                ) : <span>Confirmar</span>
              }
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
