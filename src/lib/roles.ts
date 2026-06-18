import { GraduationCap, BookOpen, Users, Crown, type LucideIcon } from "lucide-react";

export type RoleId = "student" | "faculty" | "hof" | "principal";

export interface Role {
  id: RoleId;
  label: string;
  icon: LucideIcon;
}

export const ROLES: Role[] = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "faculty", label: "Faculty", icon: BookOpen },
  { id: "hof", label: "Head of Faculty", icon: Users },
  { id: "principal", label: "Principal", icon: Crown },
];

export const getRole = (id: RoleId | null): Role | undefined =>
  ROLES.find((r) => r.id === id);
