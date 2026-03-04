'use client';

import {
  ProductImportRun,
  ProductImportRunStatus,
} from '@/src/core/entitis/marketplace/shared/import/get/ProductImportRun';

type Props = {
  run: ProductImportRun;
};

export function ImportProductsProgress({ run }: Props) {
  const isRunning =
    run.status === 'STARTED' || run.status === 'RUNNING';

  const progress =
    run.status === 'SUCCESS'
      ? 100
      : run.status === 'FAILED'
      ? 100
      : Math.min(run.batches_processed * 5, 95);

  const statusStyles: Record<ProductImportRunStatus, string> = {
    STARTED: 'bg-blue-100 text-blue-700',
    RUNNING: 'bg-blue-100 text-blue-700',
    SUCCESS: 'bg-green-100 text-green-700',
    FAILED: 'bg-red-100 text-red-700',
  };

  const progressBarColors: Record<ProductImportRunStatus, string> = {
    STARTED: 'bg-blue-500',
    RUNNING: 'bg-blue-500',
    SUCCESS: 'bg-green-500',
    FAILED: 'bg-red-500',
  };

  const statusClass = statusStyles[run.status];
  const barColor = progressBarColors[run.status];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusClass}`}
          >
            {run.status}
          </span>

          {isRunning && (
            <span className="text-xs text-blue-600 animate-pulse">
              importing...
            </span>
          )}

        </div>

        <span className="text-xs text-gray-400">
          {new Date(run.started_at).toLocaleString()}
        </span>

      </div>

      {/* PROGRESS */}
      <div className="space-y-2">

        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs text-gray-500">
          Progress: {progress}%
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 text-center">

        <Stat
          label="Procesados"
          value={run.items_processed}
        />

        <Stat
          label="Fallidos"
          value={run.items_failed}
        />

        <Stat
          label="Lotes"
          value={run.batches_processed}
        />

      </div>

      {/* ERROR */}
      {run.error_message && (
        <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-xs text-red-700">
          {run.error_message}
        </div>
      )}

    </div>
  );
}

/* =========================
   STAT COMPONENT
========================= */

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="text-lg font-semibold text-gray-900">
        {value}
      </div>
      <div className="text-xs text-gray-500">
        {label}
      </div>
    </div>
  );
}