import { Aside } from '@/components/origin/aside/Aside';
import { cookies } from 'next/headers';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = cookies().get("user");

  return (
    <main id="main" className="grid min-h-screen">
      <Aside role={JSON.parse(user?.value!).roleName} />
      <section className="[grid-area:content] px-4 py-2">
        {children}
      </section>
    </main>
  )
}
