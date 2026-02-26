type Props = {
  status: 'active' | 'closed';
};

export function MarketplaceStatusBadge({ status }: Props) {
  const isActive = status === 'active';

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition
        ${
          isActive
            ? 'bg-emerald-600/20 text-emerald-400'
            : 'bg-zinc-700/40 text-zinc-300'
        }
      `}
    >
      {isActive ? (
        <>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Activa
        </>
      ) : (
        <>
          {/* Lock Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 10-8 0v4M5 11h14v9H5z"
            />
          </svg>
          Cerrada
        </>
      )}
    </span>
  );
}