'use client';

import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import CategoryDrilldown from '../../CategoryDrilldown';
import { useParentCategoriesPerformance } from '../hooks/useParentCategoriesPerformance';


export default function ParentCategoriesDashboard() {
  const { data, loading } = useParentCategoriesPerformance();

  const [metric, setMetric] = useState<'visits' | 'orders'>('visits');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      index: index + 1,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      totalProducts: item.totalProducts,
      visits: item.visits,
      orders: item.orders,
      revenue: item.revenue,
    }));
  }, [data]);

  return (
    <div className="space-y-10">

      {/* ===================== BLOQUE EJECUTIVO ===================== */}
      <div className="rounded-2xl p-8 bg-zinc-950 border border-zinc-800 text-white shadow-xl space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Categorías Padre
          </h2>

          <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <ToggleButton
              active={metric === 'visits'}
              onClick={() => setMetric('visits')}
            >
              Visitas
            </ToggleButton>

            <ToggleButton
              active={metric === 'orders'}
              onClick={() => setMetric('orders')}
            >
              Órdenes
            </ToggleButton>
          </div>
        </div>

        <div className="h-[260px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-zinc-500">
              Cargando métricas...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="#18181b" vertical={false} />

                <XAxis
                  dataKey="index"
                  stroke="#71717a"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  stroke="#71717a"
                  tickFormatter={(v) => v.toLocaleString()}
                />

                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const d = payload[0].payload;

                    return (
                      <div className="bg-zinc-900 p-4 rounded-xl text-xs border border-zinc-800 shadow-xl">
                        <div className="font-semibold text-white mb-2">
                          {d.categoryName}
                        </div>
                        <div className="space-y-1 text-zinc-300">
                          <div>Productos: {d.totalProducts.toLocaleString()}</div>
                          <div>Visitas: {d.visits.toLocaleString()}</div>
                          <div>Órdenes: {d.orders.toLocaleString()}</div>
                          <div>Revenue: ${d.revenue.toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  }}
                />

                <Bar
                  dataKey={metric}
                  barSize={20}
                  radius={[6, 6, 0, 0]}
                  onClick={(data: any) =>
                    setSelectedCategory(data.categoryId)
                  }
                >
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        metric === 'visits'
                          ? '#3b82f6'
                          : '#10b981'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ===================== DRILLDOWN ===================== */}
      {selectedCategory && (
        <CategoryDrilldown rootCategoryId={selectedCategory} />
      )}
    </div>
  );
}

function ToggleButton({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-xs rounded-md transition ${
        active
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-zinc-500 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}