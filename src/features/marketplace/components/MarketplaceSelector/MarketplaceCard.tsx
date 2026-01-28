import Image from 'next/image';
import Link from 'next/link';
import { Marketplace } from '../../config/marketplaces';

type Props = {
  marketplace: Marketplace;
};

export function MarketplaceCard({ marketplace }: Props) {
  return (
    <Link
      href={`/admin/marketplace/${marketplace.id}`}
      className="
        rounded-2xl bg-white p-6 shadow
        hover:shadow-lg transition
        flex items-center justify-center
      "
    >
      <div className="relative h-20 w-40">
        <Image
          src={marketplace.logo}
          alt={marketplace.name}
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}