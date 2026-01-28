export function MarketplaceProductSkeleton() {
  return (
    <div
      className="
        rounded-xl border bg-white p-3 space-y-2
        animate-pulse
      "
    >
      {/* Imagen fake */}
      <div className="h-24 w-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

      {/* SKU */}
      <div className="h-2 w-2/3 rounded bg-gray-200" />

      {/* Título */}
      <div className="h-3 w-full rounded bg-gray-200" />
      <div className="h-3 w-5/6 rounded bg-gray-200" />

      {/* Precio / Stock */}
      <div className="flex justify-between gap-2">
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
      </div>

      {/* Status */}
      <div className="h-4 w-16 rounded-full bg-gray-200" />
    </div>
  );
}