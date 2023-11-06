'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { EditIcon } from "@/components/origin/icons/EditIcon";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { LoadingIcon } from "../shared/LoadingIcon";
import { es } from "date-fns/locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  event_id: number;
  name: string;
  status: boolean;
  start_date: Date;
  client_id: number;
  clients: any;
}

const FormSchema = z.object({
  name: z.string({
    required_error: "El nombre del evento es obligatorio"
  }).min(1, { message: "El nombre del evento es obligatorio" }),
  start_date: z.date({
    required_error: "La fecha de inicio es obligatoria",
  }),
  client_id: z.number({
    required_error: "El nombre del cliente es obligatorio"
  }),
});

export function EditEventModal({ event_id, name, status, start_date, client_id, clients }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nameForm, setNameForm] = useState<string>(name);
  const [startDateForm, setStartDateForm] = useState<Date>(start_date);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      start_date,
      client_id,
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch(`/api/event/edit`, {
      method: 'PUT',
      body: JSON.stringify({
        eventId: event_id,
        name: data.name,
        startDate: data.start_date,
        status,
        clientId: data.client_id,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 204) {
      setIsOpen(false);
      setLoading(false);
      setNameForm(data.name);
      setStartDateForm(data.start_date);
      router.refresh();
    } else {
      console.log("Error");
      setLoading(false);
    }
  }

  const onClose = () => {
    setIsOpen(false);
    form.reset({
      name: nameForm,
      start_date: startDateForm,
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
            <p>Editar evento</p>
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Editar evento</Dialog.Title>
                  <Dialog.Description className="text-sm mt-1">Completa los datos requeridos</Dialog.Description>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-2 flex flex-col space-y-2.5">
                            <FormLabel>Nombre del evento <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Evento" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha de inicio <span className="text-red-500">*</span></FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {
                                      field.value ? format(field.value, "PPP", { locale: es }) : (<span>Seleccionar fecha</span>)
                                    }
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="client_id"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>Cliente</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    disabled={true}
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {
                                      field.value ? clients.find((client: any) => client.clientId === field.value)?.fullName : "Seleccionar cliente"
                                    }
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Buscar cliente..." />
                                  <CommandEmpty className="py-2 text-center text-sm">No hay resultados</CommandEmpty>
                                  <CommandGroup>
                                    {clients.map((client: any) => (
                                      <CommandItem
                                        value={client.fullName}
                                        key={client.clientId}
                                        onSelect={() => {
                                          form.setValue("client_id", client.clientId)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            client.clientId === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {client.fullName}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
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
