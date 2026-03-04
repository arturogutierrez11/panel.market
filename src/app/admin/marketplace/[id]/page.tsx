import { MARKETPLACES } from '@/src/features/marketplace/config/marketplaces';
import MarketplaceDetailClient from './MarketplaceDetailClient';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MarketplaceDetailPage({ params }: Props) {
  const { id } = await params;

  const marketplace = MARKETPLACES.find(m => m.id === id);

  if (!marketplace) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Marketplace no encontrado
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            El marketplace solicitado no existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8">
      <MarketplaceDetailClient marketplace={marketplace} />
    </div>
  );
}