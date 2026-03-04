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
  } = useProductImportRuns({ marketplace });

  const isImportRunning =
    runImportLoading ||
    latestRun?.status === 'STARTED' ||
    latestRun?.status === 'RUNNING';

  return (
    <div className="space-y-6">

      {/* ================= ACTION CARD ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          {/* Title + help */}
          <div className="flex items-center gap-2">

            <h3 className="text-sm font-semibold text-gray-900">
              Importar productos
            </h3>

            {/* HELP TOOLTIP */}
            <div className="relative group">

              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 cursor-default">
                ?
              </div>

              <div className="pointer-events-none absolute left-1/2 top-7 w-72 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-lg opacity-0 transition group-hover:opacity-100">

                Este proceso sincroniza los productos directamente
                desde el marketplace hacia nuestra plataforma.

                <div className="mt-2 text-gray-500">
                  Se descargan publicaciones, stock, precios y
                  demás información disponible para mantener el
                  catálogo actualizado.
                </div>

              </div>

            </div>

          </div>

          {/* BUTTON */}
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

      </div>

      {/* ================= LOADING ================= */}

      {isImportRunning && !latestRun && (
        <div className="flex items-center gap-3 text-sm text-gray-700">

          <BrandSpinner size={18} />

          <span>Inicializando importación…</span>

        </div>
      )}

      {/* ================= RUNNING ================= */}

      {(latestRun?.status === 'STARTED' ||
        latestRun?.status === 'RUNNING') && (
        <div className="flex items-center gap-3 text-sm text-gray-700">

          <BrandSpinner size={18} />

          <span>Importación en progreso…</span>

        </div>
      )}

      {/* ================= RUN LIST ================= */}

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

      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

    </div>
  );
}