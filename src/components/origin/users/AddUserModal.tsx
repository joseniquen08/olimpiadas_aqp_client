'use client';

import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "@/components/origin/shared/Button";
import { PlusIcon } from "@/components/origin/icons/PlusIcon";
import { AddClientForm } from "./AddClientForm";
import { AddDelegateForm } from './AddDelegateForm';

export function AddUserModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const onChangeRole = (checked: boolean) => {
    setIsClient(checked);
  }

  const onClose = () => {
    setIsOpen(false);
    setIsClient(false);
  }

  return (
    <>
      <Button action={() => setIsOpen(true)} className="gap-1.5 items-center">
        <PlusIcon />
        <span>Agregar</span>
      </Button>
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Agregar un nuevo usuario</Dialog.Title>
                  <Dialog.Description>Completa los datos requeridos</Dialog.Description>
                  <div className="flex space-x-2 justify-end text-sm">
                    <span>Delegado</span>
                    <Switch
                      checked={isClient}
                      onChange={onChangeRole}
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
                  {
                    isClient ? (
                      <AddClientForm
                        setIsOpen={setIsOpen}
                      />
                    ) : (
                      <AddDelegateForm
                        setIsOpen={setIsOpen}
                      />
                    )
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
