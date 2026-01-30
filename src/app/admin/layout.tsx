import Sidebar from "@/src/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="ml-64 h-screen overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}