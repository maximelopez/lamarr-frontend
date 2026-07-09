import BottomNav from "@/components/BottomNav";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}