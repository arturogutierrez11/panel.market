import { MarketplaceGrid } from "@/src/features/marketplace/components/MarketplaceSelector/MarketplaceGrid";

export default function MarketplacePage() {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-10">

      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Marketplaces
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Select a marketplace to manage products and synchronization.
          </p>
        </div>

        <MarketplaceGrid />

      </div>

    </div>
  );
}