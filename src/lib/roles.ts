import {
  GraduationCap, BookOpen, Users, Crown, ShieldAlert, Settings2,
  type LucideIcon,
} from "lucide-react";

export type RoleId =
  | "super_admin"
  | "school_admin"
  | "principal"
  | "hof"
  | "faculty"
  | "student";

export interface Role {
  id: RoleId;
  label: string;
  icon: LucideIcon;
}

export const ROLES: Role[] = [
  { id: "super_admin", label: "Super Admin", icon: ShieldAlert },
  { id: "school_admin", label: "School Admin", icon: Settings2 },
  { id: "principal", label: "Principal", icon: Crown },
  { id: "hof", label: "Head of Faculty", icon: Users },
  { id: "faculty", label: "Faculty", icon: BookOpen },
  { id: "student", label: "Student", icon: GraduationCap },
];

export const getRole = (id: RoleId | null): Role | undefined =>
  ROLES.find((r) => r.id === id);
