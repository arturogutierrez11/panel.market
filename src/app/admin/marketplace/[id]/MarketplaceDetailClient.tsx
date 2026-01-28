'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import { Marketplace } from '@/src/features/marketplace/config/marketplaces';
import MarketplaceProductList from '@/src/features/marketplace/components/MarketplaceProductList/MarketplaceProductList';
import { BrandSpinner } from '@/src/components/loader/BrandSpinner';

type Props = {
  marketplace: Marketplace;
};

export default function MarketplaceDetailClient({ marketplace }: Props) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Image
            src={marketplace.logo}
            alt={marketplace.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>

      {/* Productos */}
      <div
        className="
          rounded-2xl
          bg-white
          border border-gray-200
          shadow-[0_8px_30px_rgb(0,0,0,0.06)]
        "
      >
        <Suspense fallback={<BrandSpinner />}>
          <MarketplaceProductList marketplaceId={marketplace.id} />
        </Suspense>
      </div>
    </div>
  );
}