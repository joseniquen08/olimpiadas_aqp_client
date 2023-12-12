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
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EditIcon } from "@/components/origin/icons/EditIcon";

interface Props {
  player_id: number;
  name: string;
  birthdate: Date;
  height: number;
  weight: number;
  jersey_number: number;
  gender: string;
}

const FormSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio"
  }).min(1, { message: "El nombre es obligatorio" }),
  birthdate: z.date({
    required_error: "La fecha de cumpleaños es obligatoria",
  }),
  gender: z.string({
    required_error: "El género es obligatorio"
  }).min(1, { message: "El nombre es obligatorio" }),
  height: z.string({
    required_error: "La altura es obligatoria"
  }).min(1, { message: "El nombre es obligatorio" }),
  weight: z.string({
    required_error: "La altura es obligatoria"
  }).min(1, { message: "El nombre es obligatorio" }),
  jersey_number: z.number({
    required_error: "El número de camiseta es obligatorio"
  }),
});

export function EditPlayerModal({ player_id, name, birthdate, height, weight, jersey_number, gender }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nameForm, setNameForm] = useState<string>(name);
  const [birthdateForm, setBirthdateForm] = useState<Date>(birthdate);
  const [heightForm, setHeightForm] = useState<number>(height);
  const [weightForm, setWeightForm] = useState<number>(weight);
  const [jerseyNumberForm, setJerseyNumberForm] = useState<number>(jersey_number);
  const [genderForm, setGenderForm] = useState<string>(gender);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      birthdate,
      height: height.toString(),
      weight: weight.toString(),
      jersey_number,
      gender,
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch(`/api/player/edit`, {
      method: 'PUT',
      body: JSON.stringify({
        name: data.name,
        birthdate: data.birthdate,
        gender: data.gender,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        jerseyNumber: data.jersey_number,
        playerId: player_id,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 204) {
      setIsOpen(false);
      setLoading(false);
      setNameForm(data.name);
      setBirthdateForm(data.birthdate);
      setHeightForm(parseFloat(data.height));
      setWeightForm(parseFloat(data.weight));
      setJerseyNumberForm(data.jersey_number);
      setGenderForm(data.gender);
      router.refresh();
    } else {
      console.log(dataRes);
      console.log("Error");
      setLoading(false);
    }
  }

  const onClose = () => {
    setIsOpen(false);
    form.reset({
      name: nameForm,
      birthdate: birthdateForm,
      height: heightForm.toString(),
      weight: weightForm.toString(),
      jersey_number: jerseyNumberForm,
      gender: genderForm,
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
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-emerald-900">Editar jugador</Dialog.Title>
                  <Dialog.Description className="text-sm mt-1">Completa los datos requeridos</Dialog.Description>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 grid grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-1 flex flex-col space-y-2.5">
                            <FormLabel>Nombre del jugador <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Jugador" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="birthdate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha de cumpleaños <span className="text-red-500">*</span></FormLabel>
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
                                  disabled={(date) => date >= new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem className="col-span-1 flex flex-col space-y-2.5">
                            <FormLabel>Altura(m) <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Altura" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem className="col-span-1 flex flex-col space-y-2.5">
                            <FormLabel>Peso(kg) <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Peso" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jersey_number"
                        render={({ field }) => (
                          <FormItem className="col-span-1 flex flex-col space-y-2.5">
                            <FormLabel>N° de camiseta <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Camiseta"
                                type="number"
                                min={0}
                                {...field}
                                autoComplete="off"
                                onChange={event => field.onChange(+event.target.value)}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="col-span-1 flex flex-col space-y-2.5">
                            <FormLabel>Género <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Género" {...field} autoComplete="off" />
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