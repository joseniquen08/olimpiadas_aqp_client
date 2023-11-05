'use client';

import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  email: z.string({
    required_error: "El correo electrónico es obligatorio"
  }),
  password: z.string({
    required_error: "La contraseña es obligatoria",
  }),
});

export default function Login() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const dataRes = await response.json();

    if (dataRes.status == 200) {
      router.replace('/');
    } else {
      setError(true);
      setErrorMessage(dataRes.message);
      setLoading(false);
    }
  }

  return (
    <main className="bg-login bg-center">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-black/70">
        <p className="mb-6 text-3xl font-bold text-white">Olimpiadas AQP</p>
        <div className="w-full bg-white rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Iniciar sesión
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex flex-col space-y-2.5">
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="example@domain.com" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex flex-col space-y-2.5">
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-red-600">{errorMessage}</p>}
                <div className="flex items-center justify-end">
                  <a href="#" className="text-xs font-medium text-emerald-600 hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <button type="submit" className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium rounded-lg text-base px-5 py-2.5 text-center flex justify-center active:scale-95 transition-all duration-75 ease-out disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100" disabled={loading}>
                  {
                    loading ? (
                      <>
                        <LoadingIcon color="fill-emerald-500 mr-2" />
                        <span>Cargando...</span>
                      </>
                    ) : <span>Ingresar</span>
                  }
                </button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  )
}