'use client';

import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "@/components/origin/shared/Button";
import { PlusIcon } from "@/components/origin/icons/PlusIcon";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';

const phoneRegex = new RegExp(
  /^([9])+(\d{8})$/g
);

const dniRegex = new RegExp(
  /^(\d{8})$/g
);

const rucRegex = new RegExp(
  /^(\d{11})$/g
);

const FormSchema = z.object({
  full_name: z.string({
    required_error: "El nombre es obligatorio"
  }).min(1, { message: "El nombre es obligatorio" }),
  email: z.string({
    required_error: "El correo es obligatorio"
  }).email().min(1, { message: "El correo es obligatorio" }),
  password: z.string({
    required_error: "La contraseña es obligatoria"
  }).min(1, { message: "La contraseña es obligatoria" }),
  ruc: z.string({
    required_error: "El ruc es obligatorio"
  }).regex(rucRegex, "RUC inválido").min(1, { message: "El ruc es obligatorio" }).optional(),
  representative: z.string({
    required_error: "El representante es obligatorio"
  }).min(1, { message: "El representante es obligatorio" }).optional(),
  phone: z.string({
    required_error: "El teléfono es obligatorio"
  }).regex(phoneRegex, "Número inválido").min(1, { message: "El teléfono es obligatorio" }),
  dni: z.string({
    required_error: "El dni es obligatorio"
  }).regex(dniRegex, "DNI inválido").min(1, { message: "El dni es obligatorio" }).optional(),
});

export function AddUserModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
      dni: "",
      email: "",
      password: "",
      phone: "",
      representative: "",
      ruc: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    let body = {};
    let sendReady = false;

    if (isClient) {
      if (data.ruc == undefined) {
        form.setError("ruc", {
          type: "required",
          message: "El ruc es obligatorio",
        });
        setLoading(false);
      }  else if (data.representative == undefined) {
        form.setError("representative", {
          type: "required",
          message: "El representante es obligatorio",
        });
        setLoading(false);
      } else {
        sendReady = true;
        body = {
          email: data.email,
          fullName: data.full_name,
          password: data.password,
          roleId: 2,
          ruc: data.ruc,
          representative: data.representative,
          phone: data.phone,
        };
      }
    } else {
      if (data.dni == undefined) {
        form.setError("dni", {
          type: "required",
          message: "El dni es obligatorio",
        });
        setLoading(false);
      } else {
        sendReady = true;
        body = {
          email: data.email,
          fullName: data.full_name,
          password: data.password,
          roleId: 3,
          dni: data.dni,
          phone: data.phone,
        };
      }
    }

    if (sendReady) {
      const response = await fetch(`/api/user/${isClient ? 'client' : 'delegate'}/create`, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const dataRes = await response.json();

      if (dataRes.status == 201) {
        setIsOpen(false);
        router.refresh();
      } else {
        setLoading(false);
        console.log(dataRes);
        console.log("Error");
      }
    }
  }

  const onChangeRole = (checked: boolean) => {
    setIsClient(checked);
    form.clearErrors();
  }

  const onClose = () => {
    setIsOpen(false);
    form.reset();
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem className="col-span-2 flex flex-col space-y-2.5">
                            <FormLabel>{isClient ? "Nombre de la empresa" : "Nombre completo"} <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder={isClient ? "Cliente" : "Delegado"} {...field} autoComplete="off" />
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
                              <Input placeholder="example@domain.com" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ruc"
                        render={({ field }) => (
                          <FormItem className={isClient ? "flex flex-col space-y-2.5" : "hidden"}>
                            <FormLabel>RUC <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Digite 11 números" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="representative"
                        render={({ field }) => (
                          <FormItem className={isClient ? "flex flex-col space-y-2.5" : "hidden"}>
                            <FormLabel>Representante <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Nombre completo" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dni"
                        render={({ field }) => (
                          <FormItem className={isClient ? "hidden" : "flex flex-col space-y-2.5"}>
                            <FormLabel>DNI <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Digite 8 números" {...field} autoComplete="off" />
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
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>Contraseña <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="*******" {...field} autoComplete="off" />
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
