'use client';

import { runProductSync } from '@/src/service/productSync.actions';
import { useState } from 'react';

type Props = {
  marketplaceId: string;
  disabled?: boolean;
};

export default function RunSyncButton({
  marketplaceId,
  disabled = false,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    if (loading || disabled) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await runProductSync(marketplaceId);

      setSuccess(true);
    } catch {
      setError('No se pudo iniciar la sincronización');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleRun}
        disabled={loading || disabled}
        className="
          inline-flex items-center gap-2
          rounded-xl
          border border-gray-200
          bg-white
          px-4 py-2
          text-sm font-medium text-gray-800
          transition
          hover:bg-gray-50
          hover:shadow-sm
          active:translate-y-[1px]
          active:shadow-inner
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? 'Ejecutando…' : '▶ Iniciar sincronización'}
      </button>

      {success && (
        <span className="text-sm text-green-600">
          Iniciada
        </span>
      )}

      {error && (
        <span className="text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}