'use client';

export default function AdminOverviewPage() {
  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-white">
      <h1 className="text-3xl font-semibold mb-8">
        Admin Overview
      </h1>

      {/* ================= MARKETPLACES ================= */}

      <section className="mb-12">
        <h2 className="text-xl font-medium mb-6 text-zinc-300">
          Resumen por Marketplace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketplaceCard
            name="Mercado Libre"
            totalOrders="12"
            pendingShipments="3"
            invoicedOrders="8"
            sentToMarketplace="10"
          />

          <MarketplaceCard
            name="Oncity"
            totalOrders="2"
            pendingShipments="1"
            invoicedOrders="1"
            sentToMarketplace="2"
          />

          <MarketplaceCard
            name="Megatone"
            totalOrders="4"
            pendingShipments="2"
            invoicedOrders="3"
            sentToMarketplace="4"
          />
        </div>
      </section>

      {/* ================= SYNC STATUS ================= */}

      <section>
        <h2 className="text-xl font-medium mb-6 text-zinc-300">
          Sincronizaciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SyncCard
            title="Autmeli - Products Sync"
            lastUpdate="Hace 12 minutos"
            status="success"
          />

          <SyncCard
            title="Stock Sync"
            lastUpdate="Hace 1 hora"
            status="warning"
          />
        </div>
      </section>
    </div>
  );
}

/* ================= MARKETPLACE CARD ================= */

function MarketplaceCard({
  name,
  totalOrders,
  pendingShipments,
  invoicedOrders,
  sentToMarketplace,
}: {
  name: string;
  totalOrders: string;
  pendingShipments: string;
  invoicedOrders: string;
  sentToMarketplace: string;
}) {
  return (
    <div
      className="
        bg-zinc-950 
        border border-zinc-800 
        rounded-2xl 
        p-6 
        shadow-lg 
        transition 
        hover:-translate-y-1 
        hover:border-zinc-700
      "
    >
      <h3 className="text-lg text-zinc-400 mb-6">
        {name}
      </h3>

      <div className="space-y-4">
        <MetricRow label="Órdenes Totales" value={totalOrders} />
        <MetricRow label="Envíos Pendientes / En curso" value={pendingShipments} highlight />
        <MetricRow label="Órdenes Facturadas" value={invoicedOrders} />
        <MetricRow label="Enviadas al Marketplace" value={sentToMarketplace} />
      </div>
    </div>
  );
}

/* ================= METRIC ROW ================= */

function MetricRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-400">
        {label}
      </span>

      <span
        className={`font-semibold ${
          highlight ? 'text-yellow-400' : 'text-white'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ================= SYNC CARD ================= */

function SyncCard({
  title,
  lastUpdate,
  status,
}: {
  title: string;
  lastUpdate: string;
  status: 'success' | 'warning' | 'error';
}) {
  const statusColor = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div
      className="
        bg-zinc-950 
        border border-zinc-800 
        rounded-2xl 
        p-6 
        shadow-lg 
        transition 
        hover:border-zinc-700
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-300">
          {title}
        </h3>

        <span
          className={`h-3 w-3 rounded-full ${statusColor[status]}`}
        />
      </div>

      <p className="text-sm text-zinc-400">
        Última actualización:
      </p>

      <p className="text-white font-medium mt-1">
        {lastUpdate}
      </p>
    </div>
  );
}