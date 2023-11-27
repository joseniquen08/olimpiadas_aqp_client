'use client';

import { usePathname, useRouter } from "next/navigation"

interface Props {
  event_name: string;
  sport_name: string;
}

export function Breadcrumb({ event_name, sport_name }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex mb-1.5 text-lg font-semibold" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-0.5 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <button type="button" onClick={() => router.push("/dashboard/events")} className="inline-flex items-center text-gray-700 hover:text-emerald-900">
            Eventos
          </button>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <button type="button" onClick={() => router.push(`${pathname.split("/sport")[0]}/sports`)} className="inline-flex items-center text-gray-700 hover:text-emerald-900 ms-0.5">
              {event_name}
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="ms-0.5 text-gray-500">{sport_name}</span>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="ms-0.5 text-gray-500">Categorías</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}