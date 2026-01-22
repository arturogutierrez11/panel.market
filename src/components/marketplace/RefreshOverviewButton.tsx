'use client';

type Props = {
  loading?: boolean;
  onRefresh: () => void;
};

export default function RefreshOverviewButton({


    
  loading = false,
  onRefresh,
}: Props) {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="
        inline-flex items-center gap-2
        rounded-lg
        border border-gray-300
        bg-white
        px-3 py-1.5
        text-xs font-medium text-gray-700
        transition
        hover:bg-gray-50
        hover:shadow-sm
        active:translate-y-[1px]
        active:shadow-inner
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <span
        className={loading ? 'animate-spin' : ''}
      >
        ⟳
      </span>
      {loading ? 'Actualizando…' : 'Refrescar'}
    </button>
  );
}