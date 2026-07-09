import AuthGate from "@/components/AuthGate";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <div className="dashboard-layout flex flex-col">
        <TopBar />
        <main className="dashboard-content">
          {children}
        </main>
        <BottomNav />
      </div>
    </AuthGate>

  );
}