'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Button as ButtonOrigin } from '@/components/origin/shared/Button';
import { PlusIcon } from '@/components/origin/icons/PlusIcon';
import { Dialog, Transition } from "@headlessui/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';

interface Props {
  sport_event_id: number;
}

const FormSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio"
  }).min(1, { message: "El nombre es obligatorio" }),
  description: z.string({
    required_error: "La descripción es obligatoria"
  }).min(1, { message: "La descripción es obligatoria" }),
});

export function AddCategoryModal({ sport_event_id }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch(`/api/category/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        sportEventId: sport_event_id,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 201) {
      setIsOpen(false);
      router.refresh();
      form.reset();
      setLoading(false);
    } else {
      console.log(dataRes);
      console.log("Error");
      setLoading(false);
    }
  }

  const onClose = () => {
    setIsOpen(false);
    form.reset();
  }

  return (
    <>
      <ButtonOrigin action={() => setIsOpen(true)} className="gap-1.5 items-center">
        <PlusIcon />
        <span>Agregar</span>
      </ButtonOrigin>
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Agregar una nueva categoría</Dialog.Title>
                  <Dialog.Description className="text-sm mt-1">Completa los datos requeridos</Dialog.Description>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-2 flex flex-col space-y-2.5">
                            <FormLabel>Nombre de la categoría <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Categoría" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="col-span-2 flex flex-col space-y-2.5">
                            <FormLabel>Descripción <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ingresar detalles..."
                                className="resize-none"
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-2 flex space-x-2 justify-end">
                        <button type="button" onClick={onClose} className="text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out">Cancelar</button>
                        <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100" disabled={loading}>
                          {
                            loading ? (
                              <>
                                <LoadingIcon color="fill-emerald-500 mr-2" />
                                <span>Cargando...</span>
                              </>
                            ) : <span>Guardar</span>
                          }
                        </button>
                      </div>
                    </form>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}