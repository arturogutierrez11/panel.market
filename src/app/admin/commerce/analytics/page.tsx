'use client';

import { useRouter, usePathname } from 'next/navigation';
import ParentCategoriesDashboard from '@/src/features/Analytics/components/CategoriesPerformance/ParentCategoriesDashboard';

export default function AnalyticsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const activeSection = pathname.includes('all-products')
    ? 'products'
    : 'categories';

  return (
    <div className="h-screen w-full bg-zinc-950 text-white flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-4 px-8 py-6 border-b border-zinc-800">
        <button
          onClick={() => router.push('/admin/commerce')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          ← Volver
        </button>

        <div className="text-zinc-600 text-sm">/</div>

        <h1 className="text-lg font-medium">
          Analytics
        </h1>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900/40 flex flex-col">
          <nav className="flex-1 px-4 py-6 space-y-2 text-sm">

            <SidebarItem
              label="Categorías"
              active={activeSection === 'categories'}
              onClick={() => router.push('/admin/commerce/analytics')}
            />

            <SidebarItem
              label="Productos"
              active={activeSection === 'products'}
              onClick={() => router.push('/admin/commerce/analytics/all-products')}
            />

            <SidebarItem label="Marcas" disabled />
            <SidebarItem label="Más vendidos" disabled />

          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-auto p-10">

          {activeSection === 'categories' && (
            <ParentCategoriesDashboard />
          )}

          {activeSection === 'products' && (
            <div>
              {/* Esto se renderiza desde el page.tsx de all-products */}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  active,
  onClick,
  disabled
}: any) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`w-full text-left px-4 py-2 rounded-lg transition ${
        disabled
          ? 'text-zinc-600 cursor-not-allowed'
          : active
          ? 'bg-blue-600 text-white'
          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}