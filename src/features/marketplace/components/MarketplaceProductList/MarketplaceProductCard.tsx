import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import Image from 'next/image';

type Props = {
  product: MarketplaceProduct;
};

export function MarketplaceProductCard({ product }: Props) {
  const image = product.images?.[0];

  let statusStyle = 'bg-gray-100 text-gray-800';

  switch (product.status) {
    case 'ACTIVE':
      statusStyle = 'bg-green-100 text-green-800';
      break;
    case 'PAUSED':
      statusStyle = 'bg-yellow-100 text-yellow-800';
      break;
    case 'DELETED':
      statusStyle = 'bg-red-100 text-red-800';
      break;
  }

  return (
    <div
      className="
        rounded-lg border border-gray-200 bg-white p-2 space-y-1
        transition-all duration-200 ease-out
        hover:scale-[1.03] hover:shadow-lg
      "
    >
      {/* Imagen / Placeholder */}
      <div className="relative h-20 w-full rounded-md bg-gray-50 overflow-hidden flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="(max-width: 1280px) 14vw"
            className="object-contain p-1"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-2">
            <span className="text-[10px] font-semibold text-gray-700">
              Producto incompleto
            </span>
            <span className="text-[9px] text-gray-400">
              Sin imagen
            </span>
          </div>
        )}
      </div>

      {/* SKU */}
      <div className="text-[9px] text-gray-500 truncate">
        {product.sellerSku} · {product.publicationId}
      </div>

      {/* Título */}
      <div className="text-[11px] font-semibold text-gray-900 line-clamp-2 leading-tight">
        {product.title}
      </div>

      {/* Precio / Stock */}
      <div className="flex justify-between items-center text-[11px]">
        <span className="font-semibold text-gray-900">
          ${product.price.toLocaleString()}
        </span>
        <span className="text-gray-700">
          Stock: {product.stock}
        </span>
      </div>

      {/* Status */}
      <span
        className={`inline-flex items-center justify-center rounded-full px-3 py-[1px] text-[9px] font-medium ${statusStyle}`}
      >
        {product.status}
      </span>

      {/* Link */}
      {product.publicationUrl && (
        <a
          href={product.publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-1
            inline-flex
            w-full
            justify-center
            rounded-md
            border border-gray-300
            px-3 py-0.5
            text-[9px]
            font-medium
            text-gray-900
            hover:bg-gray-100
            transition
          "
        >
          Ver producto
        </a>
      )}
    </div>
  );
}