'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChildrenPerformance } from './hook/useChildrenPerformance';

type Props = {
  rootCategoryId: string;
};

export default function CategoryDrilldown({
  rootCategoryId,
}: Props) {
  const router = useRouter();

  const [parentId, setParentId] = useState<string | null>(rootCategoryId);
  const [breadcrumb, setBreadcrumb] = useState<
    { id: string; name: string }[]
  >([]);

  const { items, summary, loading } =
    useChildrenPerformance(parentId);

  /* 🔄 Reset when root changes */
  useEffect(() => {
    setParentId(rootCategoryId);
    setBreadcrumb([]);
  }, [rootCategoryId]);

  function enter(item: any) {
    setBreadcrumb((prev) => [
      ...prev,
      { id: item.categoryId, name: item.categoryName },
    ]);
    setParentId(item.categoryId);
  }

  function goBack(index: number) {
    const newTrail = breadcrumb.slice(0, index + 1);
    setBreadcrumb(newTrail);
    setParentId(newTrail[index].id);
  }

  return (
    <div className="rounded-2xl p-8 bg-zinc-950 border border-zinc-800 text-white shadow-xl space-y-6">

      {/* ===================== HEADER ===================== */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold tracking-tight">
          Análisis Jerárquico
        </h3>

        {breadcrumb.length > 0 && (
          <button
            onClick={() => {
              setBreadcrumb([]);
              setParentId(rootCategoryId);
            }}
            className="text-xs text-blue-400 hover:text-blue-300 transition"
          >
            Volver al inicio
          </button>
        )}
      </div>

      {/* ===================== BREADCRUMB ===================== */}
      {breadcrumb.length > 0 && (
        <div className="text-sm text-zinc-400 flex gap-2 flex-wrap">
          {breadcrumb.map((b, i) => (
            <span
              key={b.id}
              onClick={() => goBack(i)}
              className="cursor-pointer hover:text-white transition"
            >
              {b.name}
              {i < breadcrumb.length - 1 && ' / '}
            </span>
          ))}
        </div>
      )}

      {/* ===================== SUMMARY ===================== */}
      {summary && (
        <div className="grid grid-cols-4 gap-4">
          <Summary label="Productos" value={summary.totalProducts} />
          <Summary label="Visitas" value={summary.totalVisits} />
          <Summary label="Órdenes" value={summary.totalOrders} />
          <Summary label="Revenue" value={summary.totalRevenue} currency />
        </div>
      )}

      {/* ===================== TABLE ===================== */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="p-6 text-zinc-500">Cargando...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-zinc-500">
            No hay subcategorías.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="text-left py-3 px-4">Categoría</th>
                <th className="text-right px-4">Productos</th>
                <th className="text-right px-4">Visitas</th>
                <th className="text-right px-4">Órdenes</th>
                <th className="text-right px-4">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item.categoryId}
                  onClick={() => enter(item)}
                  className="hover:bg-zinc-800/40 cursor-pointer transition border-b border-zinc-800"
                >
                  {/* CATEGORÍA → Drilldown */}
                  <td className="py-3 px-4 font-medium text-white">
                    {item.categoryName}
                  </td>

                  {/* PRODUCTOS → Navegar a página productos */}
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                    window.open(
                      `/admin/commerce/analytics/products/${item.categoryId}`,
                      '_blank'
                    );
                    }}
                    className="text-right px-4 text-blue-400 hover:underline cursor-pointer"
                  >
                    {item.totalProducts.toLocaleString()}
                  </td>

                  <td className="text-right px-4">
                    {item.visits.toLocaleString()}
                  </td>

                  <td className="text-right px-4">
                    {item.orders.toLocaleString()}
                  </td>

                  <td className="text-right px-4">
                    ${item.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ===================== SUMMARY CARD ===================== */
function Summary({
  label,
  value,
  currency = false,
}: any) {
  return (
    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 text-center">
      <div className="text-zinc-400 text-xs">{label}</div>
      <div className="text-lg font-semibold mt-1">
        {currency
          ? `$${value?.toLocaleString()}`
          : value?.toLocaleString()}
      </div>
    </div>
  );
}