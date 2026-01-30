import { MARKETPLACES } from '../../config/marketplaces';
import { MarketplaceCard } from './MarketplaceCard';

export function MarketplaceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {MARKETPLACES.map(marketplace => (
        <MarketplaceCard
          key={marketplace.id}
          marketplace={marketplace}
        />
      ))}
    </div>
  );
}