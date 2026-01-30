import { MarketplaceGrid } from "@/src/features/marketplace/components/MarketplaceSelector/MarketplaceGrid";

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Marketplaces
      </h1>

      <MarketplaceGrid />
    </div>
  );
}