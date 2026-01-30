'use client';

import { ProductImportRun } from '@/src/core/entitis/marketplace/shared/import/get/ProductImportRun';

type Props = {
  run: ProductImportRun;
};

export function ImportProductsProgress({ run }: Props) {
  const isRunning = run.status === 'STARTED';

  const progress =
    run.status === 'SUCCESS'
      ? 100
      : run.status === 'FAILED'
      ? 100
      : Math.min(run.batches_processed * 5, 95);

  const statusColor =
    run.status === 'SUCCESS'
      ? 'bg-green-500'
      : run.status === 'FAILED'
      ? 'bg-red-500'
      : 'bg-blue-500';

  return (
    <div className="rounded-xl border bg-white p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">
            {run.status}
          </span>

          {isRunning && (
            <span className="text-xs text-blue-600">
              (en progreso)
            </span>
          )}
        </div>

        <span className="text-xs text-gray-500">
          {new Date(run.started_at).toLocaleString()}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${statusColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Numbers */}
      <div className="text-sm text-gray-700">
        Procesados: <b>{run.items_processed}</b> ·{' '}
        Fallidos: <b>{run.items_failed}</b> ·{' '}
        Lotes: <b>{run.batches_processed}</b>
      </div>

      {/* Error */}
      {run.error_message && (
        <div className="rounded bg-red-50 p-2 text-xs text-red-700">
          {run.error_message}
        </div>
      )}
    </div>
  );
}