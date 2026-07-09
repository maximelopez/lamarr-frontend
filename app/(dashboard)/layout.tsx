import AuthGate from "@/components/AuthGate";
import BottomNav from "@/components/BottomNav";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <div className="dashboard-layout">
        <main className="dashboard-content">
          {children}
        </main>
        <BottomNav />
      </div>
    </AuthGate>
    
  );
}