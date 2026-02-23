import Sidebar from "@/src/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex bg-zinc-950 overflow-hidden">

      <Sidebar />

      <main className="flex-1 h-full overflow-auto">
        {children}
      </main>

    </div>
  );
}