export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-zinc-950 text-white">
      {children}
    </div>
  );
}