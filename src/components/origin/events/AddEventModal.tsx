'use client';

import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import { Button } from "@/components/origin/shared/Button";
import { PlusIcon } from "@/components/origin/icons/PlusIcon";
import { useRouter } from "next/navigation";

interface Props {
  clients: any;
}

export function AddEventModal({ clients }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch(`/api/event/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get("name"),
        startDate: formData.get("start_date"),
        status: true,
        clientId: formData.get("client_id")
      }),
    });

    const data = await response.json();

    if (data.status == 201) {
      setIsOpen(false);
      router.refresh();
    } else {
      console.log("Error");
    }
  }

  return (
    <>
      <Button action={() => setIsOpen(true)} className="gap-1.5 items-center">
        <PlusIcon />
        <span>Agregar</span>
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Agregar un nuevo evento</Dialog.Title>
                  <Dialog.Description>Completa los datos requeridos</Dialog.Description>
                  <form onSubmit={onSubmit} className="py-4 grid grid-cols-2 gap-2 md:gap-3">
                    <div className="col-span-2">
                      <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-gray-900">Nombre del evento</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                    </div>
                    <div>
                      <label htmlFor="start_date" className="block mb-1.5 text-sm font-medium text-gray-900">Fecha de inicio</label>
                      <input type="date" name="start_date" id="start_date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                    </div>
                    <div>
                      <label htmlFor="client_id" className="block mb-1.5 text-sm font-medium text-gray-900">Cliente</label>
                      <select name="client_id" id="client_id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full py-3 px-2.5">
                        <option value="">Seleccionar</option>
                        {
                          clients?.map((client: any) => (
                            <option key={client.clientId} value={client.clientId}>{client.fullName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="col-span-2 flex space-x-2 justify-end">
                      <button type="button" onClick={() => setIsOpen(false)} className="text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out">Cancel</button>
                      <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100">
                        Guardar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
