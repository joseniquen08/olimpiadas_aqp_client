import { Aside } from '@/components/origin/aside/Aside';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main id="main" className="grid min-h-screen">
      <Aside />
      <section className="[grid-area:content] px-4 py-2">
        {children}
      </section>
    </main>
  )
}
