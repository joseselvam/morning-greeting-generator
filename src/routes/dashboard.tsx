import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Baptist Academy ERP" },
      { name: "description", content: "Baptist Academy ERP role-based dashboard for students, faculty, heads of faculty, and principal." },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}
