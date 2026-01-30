"use client";

import Image from "next/image";

const markets = [
  { name: "Frávega", file: "fravega.png", size: 190, angle: 1 },
  { name: "OnCity", file: "oncity.png", size: 90, angle: 150 },
  { name: "Megatone", file: "Megatone.svg", size: 190, angle: 45 },
  { name: "Casa del Audio", file: "casaaudio.png", size: 150, angle: 280 },
];

const RADIUS = 240;

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Soft white glow */}
      <div className="absolute inset-0 " />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-24 md:grid-cols-2">

          {/* INTEGRATION MAP */}
          <div className="relative flex items-center justify-center">
            {/* Core */}
            <div className="relative z-20 flex h-36 w-36 items-center justify-center rounded-full bg-white  ring-2 ring-white shadow-[0_0_80px_rgba(255,255,255,0.6)]">
              <Image
                src="/LQA-logo.png"
                alt="TLQ"
                width={100}
                height={100}
                priority
              />
            </div>

            {/* Tentacles (curved) */}
            <svg
              className="absolute"
              width={RADIUS * 1.6}
              height={RADIUS * 2}
              viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
            >
              {markets.map((m) => {
                const rad = (m.angle * Math.PI) / 180;
                const x = RADIUS + Math.cos(rad) * RADIUS;
                const y = RADIUS + Math.sin(rad) * RADIUS;

                const cx1 = RADIUS + Math.cos(rad - 0.4) * (RADIUS * 0.45);
                const cy1 = RADIUS + Math.sin(rad - 0.4) * (RADIUS * 0.45);
                const cx2 = RADIUS + Math.cos(rad + 0.4) * (RADIUS * 0.75);
                const cy2 = RADIUS + Math.sin(rad + 0.4) * (RADIUS * 0.75);

                return (
                  <g key={m.name}>
                    {/* Glow */}
                    <path
                      d={`M ${RADIUS} ${RADIUS} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="10"
                      fill="none"
                    />
                    {/* Core line */}
                    <path
                      d={`M ${RADIUS} ${RADIUS} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`}
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Market logos */}
            {markets.map((m) => {
              const rad = (m.angle * Math.PI) / 180;
              const x = Math.cos(rad) * RADIUS;
              const y = Math.sin(rad) * RADIUS;

              return (
                <div
                  key={m.name}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <Image
                    src={`/marketplace/${m.file}`}
                    alt={m.name}
                    width={m.size}
                    height={m.size}
                   className="bg-white rounded-xl p-2"/>
                </div>
              );
            })}
          </div>

         {/* LOGIN */}
<div className="flex items-center justify-center">
  <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white p-10 text-black shadow-[0_0_60px_rgba(255,255,255,0.18)]">

    

    {/* Form */}
    <form className="flex flex-col gap-6">
      
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-wide text-black/60">
          Email
        </label>
        <input
          type="email"
          placeholder="usuario@empresa.com"
          className="rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-wide text-black/60">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
        />
      </div>

      {/* Action */}
      <button
        type="submit"
        className="mt-4 rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-black/90"
      >
        Ingresar a la plataforma
      </button>
    </form>

    {/* Footer */}
    <div className="mt-8 text-center">
      <p className="text-xs text-black/40">
        Acceso exclusivo para cuentas habilitadas
      </p>
    </div>
  </div>
</div>
        </div>
      </main>
    </div>
  );
}