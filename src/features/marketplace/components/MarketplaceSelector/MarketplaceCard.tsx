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
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-200/60
        bg-white/70
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:border-gray-300
      "
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gray-200/40 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center justify-center">
        <div className="relative h-20 w-40 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={marketplace.logo}
            alt={marketplace.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Subtle label */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          text-[10px]
          uppercase
          tracking-widest
          text-gray-400
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        Abrir marketplace
      </div>
    </Link>
  );
}