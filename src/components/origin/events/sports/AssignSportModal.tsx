'use client';

import { Button as ButtonOrigin } from '@/components/origin/shared/Button';
import { AssignIcon } from '@/components/origin/icons/AssignIcon';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';

interface Props {
  event_id: number;
  sports: any;
  sportsTotal: any;
  delegatesTotal: any;
}

const FormSchema = z.object({
  sport_id: z.number({
    required_error: "El nombre del deporte es obligatorio",
  }),
  delegate_id: z.number({
    required_error: "El nombre del delegado es obligatorio",
  }),
});

export function AssignSportModal({ event_id, sports, sportsTotal, delegatesTotal }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch(`/api/event/assign/sport`, {
      method: 'POST',
      body: JSON.stringify({
        eventId: event_id,
        sportId: data.sport_id,
        delegateId: data.delegate_id,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 201) {
      setIsOpen(false);
      router.refresh();
      setLoading(false);
      form.reset();
    } else {
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
        <AssignIcon />
        <span>Asignar</span>
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Asignar deporte al evento</Dialog.Title>
                  <Dialog.Description className="text-sm mt-1">Completa los datos requeridos</Dialog.Description>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="sport_id"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>Deporte <span className="text-red-500">*</span></FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {
                                      field.value ? sportsTotal.find((sport: any) => sport.sportId === field.value)?.name : "Seleccionar deporte"
                                    }
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Buscar deporte..." />
                                  <CommandEmpty className="py-2 text-center text-sm">No hay resultados</CommandEmpty>
                                  <CommandGroup>
                                    {sportsTotal.map((sport: any) => {
                                      return sports.sports.find((sp: any) => sp.sportId == sport.sportId) != undefined ? (
                                        <CommandItem
                                          value={sport.name}
                                          key={sport.sportId}
                                          data-disabled={true}
                                          onSelect={() => {
                                            form.setValue("sport_id", sport.sportId)
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              sport.sportId === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {sport.name}
                                        </CommandItem>
                                      ) : (
                                        <CommandItem
                                          value={sport.name}
                                          key={sport.sportId}
                                          onSelect={() => {
                                            form.setValue("sport_id", sport.sportId)
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              sport.sportId === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {sport.name}
                                        </CommandItem>
                                      )
                                    })}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="delegate_id"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2.5">
                            <FormLabel>Delegado <span className="text-red-500">*</span></FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {
                                      field.value ? delegatesTotal.find((delegate: any) => delegate.delegateId === field.value)?.fullName : "Seleccionar delegado"
                                    }
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Buscar delegado..." />
                                  <CommandEmpty className="py-2 text-center text-sm">No hay resultados</CommandEmpty>
                                  <CommandGroup>
                                    {delegatesTotal.map((delegate: any) => (
                                      <CommandItem
                                        value={delegate.fullName}
                                        key={delegate.delegateId}
                                        onSelect={() => {
                                          form.setValue("delegate_id", delegate.delegateId)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            delegate.delegateId === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {delegate.fullName}
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