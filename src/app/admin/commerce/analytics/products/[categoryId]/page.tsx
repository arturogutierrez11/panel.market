'use client';

import { useParams, useRouter } from 'next/navigation';
import CategoryProductsList from '@/src/features/Analytics/components/CategoriesPerformance/CategoryProductsList';

export default function AnalyticsProductsPage() {
  const params = useParams();
  const router = useRouter();

  const categoryId = params.categoryId as string;

  return (
    <div className="space-y-10">

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
          Productos de la Rama de la Categoría
        </h1>
      </div>

      <CategoryProductsList categoryId={categoryId} />

    </div>
  );
}