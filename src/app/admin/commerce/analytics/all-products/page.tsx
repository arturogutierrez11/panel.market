'use client';

import { useRouter } from 'next/navigation';
import ProductsDashboard from '@/src/features/Analytics/components/CategoriesPerformance/products/ProductsDashboard';

export default function AllProductsPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-zinc-950 text-white flex flex-col">

      {/* ===== TOP HEADER ===== */}
      <div className="flex items-center gap-4 px-8 py-6 border-b border-zinc-800">

        <button
          onClick={() => router.push('/admin/commerce/analytics')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <span className="text-lg">←</span>
          <span className="text-sm">Volver</span>
        </button>

        <div className="text-zinc-600 text-sm">/</div>

        <h1 className="text-lg font-medium">
          Analytics / Productos
        </h1>
      </div>

      {/* ===== BODY ===== */}
      <div className="flex flex-1 overflow-hidden">

        {/* ===== SIDEBAR ===== */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900/40 flex flex-col">
          <nav className="flex-1 px-4 py-6 space-y-2 text-sm">

            <SidebarItem
              label="Categorías"
              onClick={() => router.push('/admin/commerce/analytics')}
            />

            <SidebarItem
              label="Productos"
              active
            />

            <SidebarItem
              label="Marcas"
              disabled
            />

            <SidebarItem
              label="Más vendidos"
              disabled
            />

          </nav>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 overflow-auto p-10">
          <ProductsDashboard />
        </main>

      </div>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  label,
  onClick,
  active,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
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