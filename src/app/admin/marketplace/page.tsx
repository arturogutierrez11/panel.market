import MarketplaceCard from "@/src/components/marketplace/MarketplaceCard";
import { MARKETPLACES } from "@/src/config/marketplace/marketplaces";

export default function MarketplacePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Marketplaces
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {MARKETPLACES.map((marketplace) => (
          <MarketplaceCard
            key={marketplace.id}
            marketplace={marketplace}
          />
        ))}
      </div>
    </div>
  );
}