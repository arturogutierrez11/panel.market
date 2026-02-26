'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MARKETPLACES } from '@/src/features/marketplace/config/marketplaces';

export default function Sidebar() {
  const pathname = usePathname();

  const isMarketplaceRoute = pathname.startsWith('/admin/marketplace');
  const isAnalyticsRoot = pathname === '/admin/commerce/analytics' || '/admin/commerce/favorites';

  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(isMarketplaceRoute);

  /* 🔥 Colapsar automáticamente en analytics root */
  useEffect(() => {
    if (isAnalyticsRoot) {
      setCollapsed(true);
    }
  }, [isAnalyticsRoot]);

  /* Mantener dropdown marketplace abierto */
  useEffect(() => {
    if (isMarketplaceRoute) {
      setOpenDropdown(true);
    }
  }, [isMarketplaceRoute]);

  return (
    <aside
      className={`
        relative flex h-full flex-col bg-zinc-950 text-gray-200
        border-r border-zinc-800
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-14' : 'w-64'}
      `}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(v => !v)}
        className="absolute right-[-12px] top-1/2 -translate-y-1/2
                   h-8 w-8 rounded-full bg-zinc-900
                   border border-zinc-700
                   flex items-center justify-center
                   hover:bg-zinc-800 transition shadow-md"
      >
        <ChevronIcon collapsed={collapsed} />
      </button>

      {/* Logo */}
      {!collapsed && (
        <div className="flex justify-center border-b border-zinc-800 py-6">
          <div className="relative h-10 w-10">
            <Image
              src="/LQA-logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4 text-sm">

        {/* Marketplace */}
        <SidebarItem
          label="Marketplace"
          active={isMarketplaceRoute}
          collapsed={collapsed}
          onClick={() => setOpenDropdown(v => !v)}
        />

        {!collapsed && openDropdown && (
          <div className="pl-4 space-y-1">
            {MARKETPLACES.map(market => {
              const active =
                pathname === `/admin/marketplace/${market.id}`;

              return (
                <Link
                  key={market.id}
                  href={`/admin/marketplace/${market.id}`}
                  className={`
                    block rounded-md px-3 py-2 text-xs transition
                    ${
                      active
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }
                  `}
                >
                  {market.name}
                </Link>
              );
            })}
          </div>
        )}

        <SidebarLink
          href="/admin/products"
          label="Productos"
          active={pathname.startsWith('/admin/products')}
          collapsed={collapsed}
        />

        <SidebarLink
          href="/admin/commerce"
          label="Commerce"
          active={pathname.startsWith('/admin/commerce')}
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
}

/* ================= LINK ================= */

function SidebarLink({
  href,
  label,
  active,
  collapsed
}: {
  href: string;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center justify-center rounded-lg py-3 transition
        ${
          active
            ? 'bg-zinc-800 text-white'
            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
        }
      `}
    >
      {collapsed ? <DotIcon /> : label}
    </Link>
  );
}

/* ================= ITEM ================= */

function SidebarItem({
  label,
  active,
  collapsed,
  onClick
}: {
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-lg py-3 transition flex items-center justify-center
        ${
          active
            ? 'bg-zinc-800 text-white'
            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
        }
      `}
    >
      {collapsed ? <DotIcon /> : label}
    </button>
  );
}

function DotIcon() {
  return (
    <div className="h-2 w-2 rounded-full bg-current opacity-70" />
  );
}

/* ================= CHEVRON ================= */

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-300 ${
        collapsed ? 'rotate-180' : ''
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}