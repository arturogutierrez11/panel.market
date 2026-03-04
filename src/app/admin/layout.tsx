'use client';

import Sidebar from '@/src/components/layout/Sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const hideSidebar = pathname.startsWith('/admin/commerce');

  return (
    <div className="flex h-screen">

      {!hideSidebar && <Sidebar />}

      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}