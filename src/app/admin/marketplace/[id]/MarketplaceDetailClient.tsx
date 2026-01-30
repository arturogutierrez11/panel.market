'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Marketplace } from '@/src/features/marketplace/config/marketplaces';
import MarketplaceProductList from '@/src/features/marketplace/components/MarketplaceProductList/MarketplaceProductList';
import { ImportProductsAction } from '@/src/features/marketplace/components/importsProducts/ImportProductsAction';
import { MarketplaceProductsHeader } from '@/src/features/marketplace/components/StatusProducts/MarketplaceProductsHeader';

type Props = {
  marketplace: Marketplace;
};

type Tab = 'products' | 'import' | 'actions';

const TABS: { id: Tab; label: string }[] = [
  { id: 'products', label: 'Productos' },
  { id: 'import', label: 'Importación' },
  { id: 'actions', label: 'Acciones' },
];

export default function MarketplaceDetailClient({ marketplace }: Props) {
  const [tab, setTab] = useState<Tab>('products');
  const router = useRouter();

  const activeIndex = TABS.findIndex(t => t.id === tab);

  return (
    <div className="flex h-full flex-col gap-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push('/admin/marketplace')}
          className="group inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            ←
          </span>
          Volver a marketplaces
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="relative">
        <div className="relative flex rounded-xl bg-gray-100 p-1">
          <span
            className="absolute top-1 bottom-1 rounded-lg bg-white transition-all duration-300"
            style={{
              width: `${100 / TABS.length}%`,
              left: `${(100 / TABS.length) * activeIndex}%`,
            }}
          />

          {TABS.map(t => (
            <TabButton
              key={t.id}
              active={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </TabButton>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'products' && (
          <div className="flex flex-col gap-4">
           

            {/* ===== LIST (CON OVERLAY LOADER) ===== */}
            <MarketplaceProductList
              marketplaceId={marketplace.id}
            />
          </div>
        )}

        {tab === 'import' && (
          <ImportProductsAction
            marketplace={marketplace.id as 'megatone' | 'oncity'}
          />
        )}

        {tab === 'actions' && (
          <div className="text-sm text-gray-400">
           
            <MarketplaceProductsHeader
              marketplaceId={marketplace.id as 'megatone' | 'oncity'}
            /> 
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
 * Tab Button
 * ========================= */
function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative z-10 flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
        active
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );
}