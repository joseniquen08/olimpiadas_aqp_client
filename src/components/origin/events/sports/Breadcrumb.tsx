'use client';

import { useRouter } from "next/navigation"

interface Props {
  event_name: string;
}

export function Breadcrumb({ event_name }: Props) {
  const router = useRouter();

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
            <span className="ms-0.5 text-gray-500">{event_name}</span>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="ms-0.5 text-gray-500">Deportes</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}