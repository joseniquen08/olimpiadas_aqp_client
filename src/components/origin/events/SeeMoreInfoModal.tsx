'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from '@/components/origin/icons/InfoIcon';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  event_name: string;
  client_name: string;
  representative: string;
  phone: string;
}

export function SeeMoreInfoModal({ event_name, client_name, representative, phone }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" onClick={() => setIsOpen(true)} className="h-9 w-9 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <InfoIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver más información</p>
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Más información</Dialog.Title>
                  <Dialog.Description className="text-lg font-medium mt-1">{event_name}</Dialog.Description>
                  <div className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                    <div className="col-span-2 flex flex-col space-y-2.5">
                      <Label>Cliente</Label>
                      <Input value={client_name} readOnly />
                    </div>
                    <div className="flex flex-col space-y-2.5">
                      <Label>Representante</Label>
                      <Input value={representative} readOnly />
                    </div>
                    <div className="flex flex-col space-y-2.5">
                      <Label>Teléfono</Label>
                      <Input value={phone} readOnly />
                    </div>
                    <div className="col-span-2 flex space-x-2 justify-end">
                        <button type="button" onClick={onClose} className="text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out">Cerrar</button>
                      </div>
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