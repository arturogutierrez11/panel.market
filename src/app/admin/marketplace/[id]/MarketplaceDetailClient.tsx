'use client';

import Image from 'next/image';

import { Marketplace } from
  '@/src/features/marketplace/config/marketplaces';
import MarketplaceProductList from '@/src/features/marketplace/components/MarketplaceProductList/MarketplaceProductList';

type Props = {
  marketplace: Marketplace;
};

export default function MarketplaceDetailClient({
  marketplace,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <Image
            src={marketplace.logo}
            alt={marketplace.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          {marketplace.name}
        </h1>
      </div>

      {/* Productos */}
      <MarketplaceProductList marketplaceId={marketplace.id} />
    </div>
  );
}