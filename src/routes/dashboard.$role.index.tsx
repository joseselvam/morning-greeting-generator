import { createFileRoute, useParams } from "@tanstack/react-router";
import { StudentHome } from "@/components/dashboard/StudentHome";
import { FacultyHome } from "@/components/dashboard/FacultyHome";
import { HofHome } from "@/components/dashboard/HofHome";
import { PrincipalHome } from "@/components/dashboard/PrincipalHome";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import type { RoleId } from "@/lib/roles";

export const Route = createFileRoute("/dashboard/$role/")({
  component: RoleHome,
});

function RoleHome() {
  const { role } = useParams({ from: "/dashboard/$role/" }) as { role: RoleId };
  if (role === "student") return <StudentHome />;
  if (role === "faculty") return <FacultyHome />;
  if (role === "hof") return <HofHome />;
  if (role === "principal") return <PrincipalHome />;
  return <PlaceholderPage title="Dashboard" role={role} />;
}
