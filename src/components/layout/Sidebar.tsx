'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname.startsWith(href);

  return (
    <aside className="flex h-screen w-64 flex-col bg-black text-gray-100">
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

          {/* Sub-label */}
          <span
            className="
              absolute
              bottom-0
              left-1/2
              -translate-x-1/2
              translate-y-[85%]
              text-[9px]
              uppercase
              tracking-widest
              text-gray-400
            "
          >
            market
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6 text-sm">
        <Link
          href="/admin/marketplace"
          className={`
            block rounded-lg px-3 py-2 transition
            ${
              isActive('/admin/marketplace')
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }
          `}
        >
          Marketplace
        </Link>

        <Link
          href="/admin/products"
          className={`
            block rounded-lg px-3 py-2 transition
            ${
              isActive('/admin/products')
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