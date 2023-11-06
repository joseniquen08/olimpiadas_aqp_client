import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';
import { useState } from 'react';

interface Props {
  setIsOpen: any;
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
  password: z.string({
    required_error: "La contraseña es obligatoria"
  }).min(1, { message: "La contraseña es obligatoria" }),
  dni: z.string({
    required_error: "El dni es obligatorio"
  }).regex(dniRegex, "DNI inválido").min(1, { message: "El dni es obligatorio" }),
  phone: z.string({
    required_error: "El teléfono es obligatorio"
  }).regex(phoneRegex, "Número inválido").min(1, { message: "El teléfono es obligatorio" }),
});

export function AddDelegateForm({ setIsOpen }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      phone: "",
      dni: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch("/api/user/delegate/create", {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        fullName: data.full_name,
        password: data.password,
        roleId: 3,
        dni: data.dni,
        phone: data.phone,
      }),
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

  const onClose = () => {
    setIsOpen(false);
    form.reset();
  }

  return (
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
                <Input placeholder="example@domain.com" {...field} autoComplete="off" />
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
  )
}
