'use client';

import { BrandSpinner } from '@/src/components/loader/BrandSpinner';
import { useRunImportProducts } from './hooks/useRunImportProducts';
import { useProductImportRuns } from './hooks/useProductImportRuns';
import { ImportProductsProgress } from './ImportProductsProgress';

type Props = {
  marketplace: 'megatone' | 'oncity';
};

export function ImportProductsAction({ marketplace }: Props) {
  const {
    runImport,
    loading: runImportLoading,
    error,
  } = useRunImportProducts({ marketplace });

  const {
    runs,
    latestRun,
    loading: pollingLoading,
  } = useProductImportRuns({ marketplace });

  // 🔑 single source of truth
  const isImportRunning =
    runImportLoading || latestRun?.status === 'STARTED';

  return (
    <div className="space-y-4">
      {/* Action box */}
      <div className="rounded-xl border bg-white p-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Importar productos
        </h3>

        <button
          onClick={runImport}
          disabled={isImportRunning}
          className={`
            rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              isImportRunning
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900'
            }
          `}
        >
          {isImportRunning ? 'Importando…' : 'Ejecutar import'}
        </button>
      </div>

      {/* Immediate feedback */}
      {isImportRunning && !latestRun && (
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <BrandSpinner size={18} />
          <span>Inicializando importación…</span>
        </div>
      )}

      {/* Running state */}
      {latestRun?.status === 'STARTED' && (
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <BrandSpinner size={18} />
          <span>Importación en progreso…</span>
        </div>
      )}

      {/* Progress list */}
      {runs.length > 0 && (
        <div className="space-y-3">
          {runs.map(run => (
            <ImportProductsProgress
              key={run.id}
              run={run}
            />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}