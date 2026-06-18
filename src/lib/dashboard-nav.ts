import {
  LayoutDashboard, BookOpen, ClipboardList, BookMarked, FileText, TrendingUp,
  CalendarDays, Calendar, Users, UserCheck, Megaphone, AlertTriangle,
  CreditCard, CalendarClock, ClipboardCheck, FileStack, Trophy, BarChart3,
  MessageSquare, FileCheck, CalendarRange, RefreshCw, Star,
  GraduationCap, UserPlus, AlertCircle, Newspaper, Settings,
  School, Monitor, Database, ScrollText, BookUser, KeyRound, Clock, LogIn,
  Target, Layout, FileBarChart, GitBranch, Gauge, UserSearch, Download,
  type LucideIcon,
} from "lucide-react";
import type { RoleId } from "./roles";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  slug: string;
  badge?: number;
}
export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_CONFIG: Record<RoleId, NavSection[]> = {
  super_admin: [
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "Management", items: [
      { label: "School Management", icon: School, slug: "schools" },
      { label: "User Management", icon: Users, slug: "users" },
    ]},
    { title: "System", items: [
      { label: "System Monitor", icon: Monitor, slug: "monitor" },
      { label: "Database Backup", icon: Database, slug: "backup" },
      { label: "Audit Logs", icon: ScrollText, slug: "audit-logs" },
    ]},
  ],
  school_admin: [
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "People", items: [
      { label: "Student Management", icon: GraduationCap, slug: "students" },
      { label: "Admission Management", icon: UserPlus, slug: "admissions", badge: 14 },
      { label: "Teacher Management", icon: BookUser, slug: "teachers" },
      { label: "User Accounts", icon: KeyRound, slug: "accounts" },
    ]},
    { title: "Operations", items: [
      { label: "Fee Management", icon: CreditCard, slug: "fees" },
      { label: "Certificate Generator", icon: FileText, slug: "certificates" },
      { label: "Timetable Publishing", icon: Clock, slug: "timetable" },
      { label: "Reports", icon: BarChart3, slug: "reports" },
    ]},
    { title: "Credentials", items: [
      { label: "Login Credential Center", icon: LogIn, slug: "credentials" },
    ]},
  ],
  student: [
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "Academics", items: [
      { label: "Marks & Grades", icon: BookOpen, slug: "marks" },
      { label: "Assignments", icon: ClipboardList, slug: "assignments", badge: 3 },
      { label: "Homework", icon: BookMarked, slug: "homework" },
      { label: "Study Materials", icon: FileText, slug: "study-materials" },
      { label: "Progress Report", icon: TrendingUp, slug: "progress" },
    ]},
    { title: "Schedule", items: [
      { label: "Timetable", icon: CalendarDays, slug: "timetable" },
      { label: "Events Calendar", icon: Calendar, slug: "events" },
    ]},
    { title: "School Life", items: [
      { label: "Rank Holders", icon: Users, slug: "rank-holders" },
      { label: "Attendance", icon: UserCheck, slug: "attendance" },
      { label: "Announcements", icon: Megaphone, slug: "announcements", badge: 2 },
      { label: "Remarks & Conduct", icon: AlertTriangle, slug: "remarks" },
      { label: "Fee Status", icon: CreditCard, slug: "fee-status" },
      { label: "Parent Meeting", icon: CalendarClock, slug: "parent-meeting" },
      { label: "My Documents", icon: Download, slug: "documents" },
    ]},
  ],
  faculty: [
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "Classroom", items: [
      { label: "Mark Entry", icon: ClipboardCheck, slug: "mark-entry" },
      { label: "Attendance Management", icon: UserCheck, slug: "attendance" },
      { label: "Homework Allocation", icon: BookMarked, slug: "homework" },
      { label: "Assignment Manager", icon: FileStack, slug: "assignments", badge: 12 },
      { label: "Student Profiles", icon: UserSearch, slug: "student-profiles" },
    ]},
    { title: "Academics", items: [
      { label: "Timetable", icon: CalendarDays, slug: "timetable" },
      { label: "Rank Computation", icon: Trophy, slug: "rank-computation" },
      { label: "Class Reports", icon: BarChart3, slug: "reports" },
      { label: "Study Material Upload", icon: BookOpen, slug: "study-materials" },
    ]},
    { title: "Communication", items: [
      { label: "Announcements", icon: Megaphone, slug: "announcements" },
      { label: "Parent Meeting", icon: CalendarClock, slug: "parent-meeting" },
      { label: "Remarks & Conduct", icon: MessageSquare, slug: "remarks" },
    ]},
    { title: "Administration", items: [
      { label: "Leave Requests", icon: FileCheck, slug: "leave-requests" },
      { label: "Events", icon: CalendarRange, slug: "events" },
    ]},
  ],
  hof: [
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "Faculty Management", items: [
      { label: "Faculty Directory", icon: Users, slug: "faculty-directory" },
      { label: "Faculty Attendance", icon: UserCheck, slug: "faculty-attendance" },
      { label: "Substitute Allocation", icon: RefreshCw, slug: "substitute-allocation", badge: 1 },
      { label: "Faculty Performance", icon: Star, slug: "faculty-performance" },
      { label: "Faculty Workload", icon: Gauge, slug: "workload" },
      { label: "Leave Management", icon: FileCheck, slug: "leave-management", badge: 3 },
    ]},
    { title: "Academics", items: [
      { label: "Timetable Management", icon: CalendarDays, slug: "timetable" },
      { label: "Timetable Drafts", icon: GitBranch, slug: "timetable-drafts" },
      { label: "Subject Allocation", icon: BookMarked, slug: "subject-allocation" },
      { label: "Curriculum Tracker", icon: BookOpen, slug: "curriculum" },
      { label: "Exam Schedule", icon: ClipboardList, slug: "exam-schedule" },
      { label: "Department Reports", icon: BarChart3, slug: "reports" },
    ]},
    { title: "Communication", items: [
      { label: "Announcements", icon: Megaphone, slug: "announcements" },
      { label: "Meeting Scheduler", icon: CalendarClock, slug: "meetings" },
      { label: "Student Escalations", icon: AlertTriangle, slug: "escalations" },
    ]},
  ],
  principal: [
    { title: "Overview", items: [{ label: "Overview", icon: LayoutDashboard, slug: "" }] },
    { title: "Analytics", items: [
      { label: "School Analytics", icon: BarChart3, slug: "analytics" },
      { label: "Academic Performance", icon: TrendingUp, slug: "academic-performance" },
      { label: "Faculty Performance", icon: Users, slug: "faculty-performance" },
      { label: "Student Discipline", icon: AlertCircle, slug: "discipline" },
      { label: "Attendance Trends", icon: UserCheck, slug: "attendance-trends" },
      { label: "School KPIs", icon: Target, slug: "kpis" },
    ]},
    { title: "Operations", items: [
      { label: "Announcements", icon: Megaphone, slug: "announcements" },
      { label: "Academic Calendar", icon: CalendarRange, slug: "academic-calendar" },
      { label: "Reports", icon: FileBarChart, slug: "reports" },
      { label: "Substitute Management", icon: RefreshCw, slug: "substitute-management" },
      { label: "Staff Leave Approval", icon: FileCheck, slug: "leave-approval", badge: 8 },
      { label: "Noticeboard", icon: Layout, slug: "noticeboard" },
    ]},
  ],
};

export function findNavLabel(role: RoleId, slug: string): string {
  for (const section of NAV_CONFIG[role]) {
    for (const item of section.items) {
      if (item.slug === slug) return item.label;
    }
  }
  return "Dashboard";
}
