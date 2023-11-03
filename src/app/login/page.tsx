'use client';

import { LoadingIcon } from '@/components/origin/shared/LoadingIcon';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Login() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    const data = await response.json();

    if (data.status == 200) {
      router.replace('/');
    } else {
      setError(true);
      setErrorMessage(data.message);
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
            <form onSubmit={onSubmit} className="space-y-3 md:space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 block w-full p-2.5" autoComplete="off" required />
              </div>
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
          </div>
        </div>
      </section>
    </main>
  )
}