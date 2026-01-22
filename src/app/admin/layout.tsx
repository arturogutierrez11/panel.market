import Sidebar from "@/src/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}