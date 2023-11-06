'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';
import { EditIcon } from '@/components/origin/icons/EditIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  delegate_id: number;
  full_name: string;
  email: string;
  phone: string;
  dni: string;
}

const phoneRegex = new RegExp(
  /^([9])+(\d{8})$/g
);

const dniRegex = new RegExp(
  /^(\d{8})$/g
);

const FormSchema = z.object({
  full_name: z.string({
    required_error: "El nombre es obligatorio"
  }).min(1, { message: "El nombre es obligatorio" }),
  email: z.string({
    required_error: "El correo es obligatorio"
  }).email().min(1, { message: "El correo es obligatorio" }),
  dni: z.string({
    required_error: "El dni es obligatorio"
  }).regex(dniRegex, "DNI inválido").min(1, { message: "El dni es obligatorio" }),
  phone: z.string({
    required_error: "El teléfono es obligatorio"
  }).regex(phoneRegex, "Número inválido").min(1, { message: "El teléfono es obligatorio" }),
});

export function EditDelegateModal({ delegate_id, full_name, email, phone, dni }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullNameForm, setFullNameForm] = useState<string>(full_name);
  const [phoneForm, setPhoneForm] = useState<string>(phone);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name,
      email,
      phone: phone.toString(),
      dni: dni.toString(),
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch(`/api/user/delegate/edit`, {
      method: 'PUT',
      body: JSON.stringify({
        delegateId: delegate_id,
        email: data.email,
        fullName: data.full_name,
        roleId: 3,
        dni: data.dni,
        phone: data.phone,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 204) {
      setIsOpen(false);
      setLoading(false);
      setFullNameForm(data.full_name);
      setPhoneForm(data.phone);
      router.refresh();
    } else {
      setLoading(false);
      console.log("Error");
    }
  }

  const onClose = () => {
    setIsOpen(false);
    form.reset({
      full_name: fullNameForm,
      phone: phoneForm,
    });
  }

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" onClick={() => setIsOpen(true)} className="h-9 w-9 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
              <EditIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar delegado</p>
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Editar delegado</Dialog.Title>
                  <Dialog.Description>Completa los datos requeridos</Dialog.Description>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem className="col-span-2 flex flex-col space-y-2.5">
                            <FormLabel>Nombre completo <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Cliente" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>Correo electrónico <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input readOnly={true} className="bg-stone-200/50 text-stone-500" placeholder="example@domain.com" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dni"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>DNI <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input readOnly={true} className="bg-stone-200/50 text-stone-500" placeholder="Digite 8 números" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>Teléfono <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Digite 9 números" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-2 flex space-x-2 justify-end">
                        <button type="button" onClick={onClose} className="text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold rounded-lg text-base px-5 py-2 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out">Cancel</button>
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
