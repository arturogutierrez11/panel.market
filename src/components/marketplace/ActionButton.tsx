'use client';

import { useState } from 'react';

type Props = {
  label: string;
  action: () => Promise<any>;
  warning?: boolean;
  disabled?: boolean;
};

export default function ActionButton({
  label,
  action,
  warning = false,
  disabled = false,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleClick() {
    if (warning && !confirming) {
      setConfirming(true);
      return;
    }

    try {
      setLoading(true);
      setDone(false);
      setError(null);

      await action();

      setDone(true);
    } catch {
      setError('Error al ejecutar la acción');
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleClick}
        disabled={loading || disabled}
        className={`
          rounded-xl border px-4 py-2 text-sm font-medium transition
          ${
            warning
              ? 'border-yellow-400 bg-yellow-50 text-yellow-800'
              : 'border-gray-300 bg-white text-gray-900'
          }
          ${
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-gray-50 active:translate-y-[1px]'
          }
        `}
      >
        {loading
          ? 'Ejecutando…'
          : confirming
          ? 'Confirmar acción'
          : label}
      </button>

      {confirming && warning && (
        <span className="text-xs text-yellow-700">
          Esta acción puede activar o pausar publicaciones en Megatone.
        </span>
      )}

      {done && (
        <span className="text-xs text-green-600">
          Acción iniciada correctamente
        </span>
      )}

      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}