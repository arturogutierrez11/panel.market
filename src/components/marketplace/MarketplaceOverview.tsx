'use client';

type SyncOverview = {
  status: 'SUCCESS' | 'ERROR' | 'RUNNING';
  processed: number;
  failed: number;
  startedAt: string;
  finishedAt?: string | null;
};

type Props = {
  overview: SyncOverview;
  actions?: React.ReactNode;
};

export default function MarketplaceOverview({
  overview,
  actions,
}: Props) {
  const isRunning = overview.status === 'RUNNING';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Última sincronización
          </h2>
          <p className="text-sm text-gray-500">
            Estado del último proceso de carga de productos desde Megatone hacia Panel
          </p>
        </div>

        <StatusPill status={overview.status} />
      </div>

      {/* Acciones (slot) */}
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}

      {/* RUNNING INFO */}
      {isRunning && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Proceso en ejecución desde{' '}
          {formatDateAR(overview.startedAt)}.
          La información se actualizará automáticamente.
        </div>
      )}

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Metric label="Procesados" value={overview.processed} />
        <Metric
          label="Fallidos"
          value={overview.failed}
          danger={overview.failed > 0}
        />
        <Metric
          label="Inicio"
          value={formatDateAR(overview.startedAt)}
        />
        <Metric
          label="Fin"
          value={
            overview.finishedAt
              ? formatDateAR(overview.finishedAt)
              : '—'
          }
        />
      </div>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function StatusPill({
  status,
}: {
  status: 'SUCCESS' | 'ERROR' | 'RUNNING';
}) {
  const styles =
    status === 'SUCCESS'
      ? 'bg-green-100 text-green-700'
      : status === 'ERROR'
      ? 'bg-red-100 text-red-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}

function Metric({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string | number;
  danger?: boolean;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="text-xs text-gray-500">
        {label}
      </div>
      <div
        className={`mt-1 text-sm font-semibold ${
          danger ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------- Utils ---------- */

function formatDateAR(date: string) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
}