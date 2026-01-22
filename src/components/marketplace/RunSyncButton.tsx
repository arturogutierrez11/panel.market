'use client';

import { runProductSync } from '@/src/service/productSync.actions';
import { useState } from 'react';

type Props = {
  marketplaceId: string;
};

export default function RunSyncButton({ marketplaceId }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);

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
        onClick={handleClick}
        disabled={loading}
        className={`
          inline-flex items-center gap-2
          rounded-xl px-5 py-2.5 text-sm font-medium
          transition
          ${
            loading
              ? 'cursor-not-allowed bg-gray-300 text-gray-600'
              : 'bg-black text-white hover:bg-gray-900'
          }
        `}
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