import Link from 'next/link';
import Image from 'next/image';
import { Marketplace } from '@/src/config/marketplace/marketplaces';

type Props = {
  marketplace: Marketplace;
};

export default function MarketplaceCard({ marketplace }: Props) {
  return (
    <Link
      href={`/admin/marketplace/${marketplace.id}`}
      className="
  group
  relative
  flex
  items-center
  justify-center
  rounded-2xl
  bg-white
  p-8
  transition-all
  duration-300
  ease-out
  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
  hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
  hover:scale-[1.04]
"
    >
      <Image
        src={marketplace.logo}
        alt={marketplace.name}
        width={100}
        height={100}
className="object-contain transition-transform duration-300 group-hover:scale-105"    />
    </Link>
  );
}