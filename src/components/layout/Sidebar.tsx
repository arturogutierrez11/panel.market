'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { MARKETPLACES } from '@/src/features/marketplace/config/marketplaces';

export default function Sidebar() {
  const pathname = usePathname();

  const isMarketplaceRoute = pathname.startsWith('/admin/marketplace');
  const [open, setOpen] = useState(isMarketplaceRoute);

  useEffect(() => {
    if (isMarketplaceRoute) {
      setOpen(true);
    }
  }, [isMarketplaceRoute]);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-black text-gray-100">
      {/* Logo */}
      <div className="flex justify-center border-b border-gray-800 py-8">
        <div className="relative h-20 w-20">
          <Image
            src="/LQA-logo.png"
            alt="Tienda Lo Quiero Acá"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6 text-sm">
        {/* ================= MARKETPLACE DROPDOWN ================= */}
        <button
          onClick={() => setOpen(v => !v)}
          className={`
            flex w-full items-center justify-between rounded-lg px-3 py-2 transition
            ${
              isMarketplaceRoute
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }
          `}
        >
          <span>Marketplace</span>
          <span
            className={`transition-transform ${
              open ? 'rotate-90' : ''
            }`}
          >
            →
          </span>
        </button>

        {/* Dropdown */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="mt-1 space-y-1 pl-2">
            {MARKETPLACES.map(market => {
              const active =
                pathname === `/admin/marketplace/${market.id}`;

              return (
                <Link
                  key={market.id}
                  href={`/admin/marketplace/${market.id}`}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 transition
                    ${
                      active
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <div
  className="
    flex
    h-8
    w-10
    shrink-0
    items-center
    justify-center
    rounded-md
    bg-white/90
    p-1
    shadow-sm
  "
>
  <Image
    src={market.logo}
    alt={market.name}
    width={28}
    height={28}
    className="object-contain"
  />
</div>

                  <div className="flex flex-col">
                    <span className="leading-tight">
                      {market.name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {market.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Other items */}
        <Link
          href="/admin/products"
          className={`
            block rounded-lg px-3 py-2 transition
            ${
              pathname.startsWith('/admin/products')
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }
          `}
        >
          Productos
        </Link>

        <div className="rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed">
          Configuración
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-4 text-xs text-gray-500">
        Admin Panel
      </div>
    </aside>
  );
}