'use client';

import { useRouter } from 'next/navigation';

export default function CommerceHub() {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-zinc-950 text-white flex flex-col overflow-hidden">

      {/* HEADER (altura fija controlada) */}
      <div className="flex-shrink-0 px-12 py-8 border-b border-zinc-800">
        <h1 className="text-3xl font-semibold tracking-tight">
          Commerce
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          Centro de análisis y estrategia comercial.
        </p>
      </div>

      {/* CONTENIDO ocupa EXACTAMENTE el resto */}
      <div className="flex-1 flex items-center justify-center px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

          <ModuleCard
            title="Analytics"
            description="Análisis por categorías, productos, marcas y performance."
            onClick={() => router.push('/admin/commerce/analytics')}
          />

          <ModuleCard
            title="Strategy"
            description="Gestión estratégica y expansión en marketplaces."
            onClick={() => router.push('/admin/commerce/favorites')}
          />

        </div>

      </div>

    </div>
  );
}

function ModuleCard({
  title,
  description,
  onClick
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-56 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-left
                 hover:border-blue-500 hover:bg-zinc-900/70
                 transition-all duration-300 group"
    >
      <div className="flex flex-col justify-between h-full">

        <div>
          <h2 className="text-2xl font-semibold group-hover:text-blue-400 transition">
            {title}
          </h2>

          <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex justify-end text-sm text-zinc-600 group-hover:text-blue-400 transition">
          Entrar →
        </div>

      </div>
    </button>
  );
}