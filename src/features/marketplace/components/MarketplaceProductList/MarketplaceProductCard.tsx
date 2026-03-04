import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import Image from 'next/image';

type Props = {
  product: MarketplaceProduct;
};

const PLACEHOLDER_IMAGE =
  'https://tiendaloquieroaca924.vtexassets.com/assets/vtex.catalog-images/products/examplePhoneImageBlue.png';

export function MarketplaceProductCard({ product }: Props) {
  const image =
    product.images?.[0] &&
    product.images[0] !== PLACEHOLDER_IMAGE
      ? product.images[0]
      : null;

  const normalizedStatus = product.status
    ?.toString()
    .toUpperCase()
    .trim();

  let statusBadge =
    'bg-gray-100 text-gray-600';

  let statusLabel = normalizedStatus ?? 'Desconocido';

  switch (normalizedStatus) {
    case 'ACTIVE':
    case 'ACTIVO':
      statusBadge = 'bg-green-100 text-green-700';
      statusLabel = 'Activo';
      break;

    case 'PAUSED':
    case 'PAUSADO':
    case 'INACTIVE':
      statusBadge = 'bg-yellow-100 text-yellow-700';
      statusLabel = 'Pausado';
      break;

    case 'DELETED':
    case 'ELIMINADO':
      statusBadge = 'bg-red-100 text-red-700';
      statusLabel = 'Eliminado';
      break;
  }

  return (
    <div
      className="
      group
      rounded-xl
      border border-gray-200
      bg-white
      p-3
      transition-all
      hover:shadow-md
      "
    >
      {/* IMAGE */}
      <div className="relative h-24 w-full rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">

        {image ? (
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="(max-width: 1280px) 14vw"
            className="object-contain p-2 transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="text-center px-2">
            <div className="text-xs font-semibold text-gray-700">
              Sin imagen
            </div>
            <div className="text-[10px] text-gray-400">
              Producto incompleto
            </div>
          </div>
        )}

      </div>

      {/* META */}
      <div className="mt-2 space-y-1">

        <div className="text-[10px] text-gray-400 truncate">
          {product.sellerSku} · {product.publicationId}
        </div>

        {/* TITLE */}
        <div className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">
          {product.title}
        </div>

      </div>

      {/* PRICE / STOCK */}
      <div className="mt-2 flex items-center justify-between">

        <span className="text-sm font-semibold text-gray-900">
          ${product.price.toLocaleString()}
        </span>

        <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
          Stock {product.stock}
        </span>

      </div>

      {/* STATUS */}
      <div className="mt-2 flex items-center justify-between">

        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${statusBadge}`}
        >
          {statusLabel}
        </span>

      </div>

      {/* ACTION */}
      {product.publicationUrl && (
        <a
          href={product.publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
          mt-3
          flex
          w-full
          items-center
          justify-center
          rounded-md
          border
          border-gray-200
          bg-white
          py-1
          text-[11px]
          font-medium
          text-gray-800
          transition
          hover:bg-gray-50
          "
        >
          Ver producto
        </a>
      )}

    </div>
  );
}