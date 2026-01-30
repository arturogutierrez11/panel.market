'use client';

import { MarketplaceProductsStatusSummary } from '@/src/features/marketplace/components/StatusProducts/MarketplaceProductsStatusSummary';

type Props = {
  marketplaceId: 'megatone' | 'oncity';
};

export function MarketplaceProductsHeader({
  marketplaceId,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <MarketplaceProductsStatusSummary
        marketplace={marketplaceId}
      />
    </div>
  );
}