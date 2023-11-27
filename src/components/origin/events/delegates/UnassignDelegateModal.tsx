'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingIcon } from "@/components/origin/shared/LoadingIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DeleteIcon } from '@/components/origin/icons/DeleteIcon';

interface Props {
  delegate_event_id: number;
  name: string;
}

export function UnassignDelegateModal({ delegate_event_id, name }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);

    const response = await fetch(`/api/event/unassign/delegate`, {
      method: 'DELETE',
      body: JSON.stringify({
        delegateEventId: delegate_event_id,
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

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" onClick={() => setIsOpen(true)} className="h-9 w-9 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
              <DeleteIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Desasignar delegado</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-emerald-900">Desasignar delegado del evento</Dialog.Title>
                  <Dialog.Description className="mt-1 font-medium">{name}</Dialog.Description>
                  <div className="flex space-x-2 justify-end pt-4">
                    <button type="button" onClick={onClose} className="text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out">Cancelar</button>
                    <button type="button" onClick={onSubmit} className="text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100" disabled={loading}>
                      {
                        loading ? (
                          <>
                            <LoadingIcon color="fill-emerald-500 mr-2" />
                            <span>Cargando...</span>
                          </>
                        ) : <span>Confirmar</span>
                      }
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
