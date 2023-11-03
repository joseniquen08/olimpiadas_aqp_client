'use client';

import { Dialog, Switch, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import { Button } from "@/components/origin/shared/Button";
import { PlusIcon } from "@/components/origin/icons/PlusIcon";
import { useRouter } from "next/navigation";

export function AddUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let body = {}

    if (isClient) {
      body = {
        email: formData.get("email"),
        fullName: formData.get("full_name"),
        password: formData.get("password"),
        roleId: 2,
        ruc: formData.get("ruc"),
        representative: formData.get("representative"),
        phone: formData.get("phone"),
      };
    } else {
      body = {
        email: formData.get("email"),
        fullName: formData.get("full_name"),
        password: formData.get("password"),
        roleId: 3,
        dni: formData.get("dni"),
        phone: formData.get("phone"),
      };
    }

    const response = await fetch(`/api/user/${isClient ? 'client' : 'delegate'}/create`, {
      method: 'POST',
      body: JSON.stringify(body),
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Agregar un nuevo usuario</Dialog.Title>
                  <Dialog.Description>Completa los datos requeridos</Dialog.Description>
                  <div className="flex space-x-2 justify-end text-sm">
                    <span>Delegado</span>
                    <Switch
                      checked={isClient}
                      onChange={setIsClient}
                      className="bg-emerald-700
                        relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <span
                        aria-hidden="true"
                        className={`${isClient ? 'translate-x-5' : 'translate-x-0'}
                          pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <span>Cliente</span>
                  </div>
                  <form onSubmit={onSubmit} className="py-3 grid grid-cols-2 gap-2 md:gap-3">
                    <div className="col-span-2">
                      <label htmlFor="full_name" className="block mb-1.5 text-sm font-medium text-gray-900">{isClient ? "Nombre de la empresa" : "Nombre completo"}</label>
                      <input type="text" name="full_name" id="full_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-900">Correo electrónico</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                    </div>
                    {
                      isClient ? (
                        <>
                          <div>
                            <label htmlFor="ruc" className="block mb-1.5 text-sm font-medium text-gray-900">RUC</label>
                            <input type="text" name="ruc" id="ruc" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                          </div>
                          <div>
                            <label htmlFor="representative" className="block mb-1.5 text-sm font-medium text-gray-900">Representante</label>
                            <input type="text" name="representative" id="representative" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                          </div>
                        </>
                      ) : (
                        <div>
                          <label htmlFor="dni" className="block mb-1.5 text-sm font-medium text-gray-900">DNI</label>
                          <input type="text" name="dni" id="dni" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                        </div>
                      )
                    }
                    <div>
                      <label htmlFor="phone" className="block mb-1.5 text-sm font-medium text-gray-900">Teléfono</label>
                      <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-900">Contraseña</label>
                      <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
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
