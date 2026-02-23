'use client';

import FavoritesDashboard from '@/src/features/Analytics/components/favorites/components/FavoritesDashboard';
import { useRouter } from 'next/navigation';

export default function StrategiesPage() {
  const router = useRouter();

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col">

      {/* ===== HEADER CON BACK ===== */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-4 border-b border-zinc-800">

        <button
          onClick={() => router.push('/admin/commerce')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <span className="text-lg">←</span>
          <span className="text-sm">Volver</span>
        </button>

        <div className="text-sm text-zinc-600">/</div>

        <h1 className="text-lg font-medium">
          Strategic Products
        </h1>

      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 overflow-auto p-8">
        <FavoritesDashboard />
      </div>

    </div>
  );
}