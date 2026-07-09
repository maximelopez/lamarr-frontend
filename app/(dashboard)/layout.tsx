import Sidebar from "@/components/Sidebar";
import AuthGate from "@/components/AuthGate";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </AuthGate>
  );
}