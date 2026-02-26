'use client';

import FavoritesDashboard from '@/src/features/Analytics/components/favorites/dashboard/FavoritesDashboard';
import { useRouter } from 'next/navigation';

export default function StrategiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-6 border-b border-zinc-800">

        <button
          onClick={() => router.push('/admin/commerce')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <span className="text-lg">←</span>
          <span className="text-sm">Volver</span>
        </button>

        <span className="text-zinc-700">/</span>

        <h1 className="text-lg font-medium tracking-wide">
          Strategic Products
        </h1>

      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 overflow-y-auto p-8">
        <FavoritesDashboard />
      </div>

    </div>
  );
}