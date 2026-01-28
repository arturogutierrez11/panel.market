import { MARKETPLACES } from
  '@/src/features/marketplace/config/marketplaces';
import MarketplaceDetailClient from './MarketplaceDetailClient';

type Props = {
  params: {
    id: string;
  };
};

export default async function MarketplaceDetailPage({ params }: Props) {
  const { id } = await params;


  const marketplace = MARKETPLACES.find(m => m.id === id);

  if (!marketplace) {
    return <div className="text-gray-500">Marketplace no encontrado</div>;
  }

  return (
    <MarketplaceDetailClient marketplace={marketplace} />
  );
}