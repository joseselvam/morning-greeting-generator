import {
  LayoutDashboard, BookOpen, ClipboardList, BookMarked, FileText, TrendingUp,
  CalendarDays, Calendar, Users, UserCheck, Megaphone, AlertTriangle,
  CreditCard, CalendarClock, ClipboardCheck, FileStack, Trophy, BarChart3,
  MessageSquare, FileCheck, CalendarRange, UserX, RefreshCw, Star,
  GraduationCap, UserPlus, Receipt, AlertCircle, Newspaper, Building2,
  Settings, type LucideIcon,
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
    ]},
  ],
  faculty: [
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "Classroom", items: [
      { label: "Mark Entry", icon: ClipboardCheck, slug: "mark-entry" },
      { label: "Attendance Management", icon: UserCheck, slug: "attendance" },
      { label: "Homework Allocation", icon: BookMarked, slug: "homework" },
      { label: "Assignment Manager", icon: FileStack, slug: "assignments", badge: 12 },
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
      { label: "Leave Management", icon: FileCheck, slug: "leave-management", badge: 3 },
    ]},
    { title: "Academics", items: [
      { label: "Timetable Management", icon: CalendarDays, slug: "timetable" },
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
    { title: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, slug: "" }] },
    { title: "People", items: [
      { label: "Student Management", icon: GraduationCap, slug: "student-management" },
      { label: "Faculty Management", icon: Users, slug: "faculty-management" },
      { label: "Admissions", icon: UserPlus, slug: "admissions", badge: 14 },
    ]},
    { title: "Academics", items: [
      { label: "Academic Reports", icon: BarChart3, slug: "academic-reports" },
      { label: "Academic Calendar", icon: CalendarDays, slug: "academic-calendar" },
      { label: "Exam Overview", icon: FileText, slug: "exam-overview" },
    ]},
    { title: "Finance", items: [
      { label: "Financial Dashboard", icon: CreditCard, slug: "financial-dashboard" },
      { label: "Fee Collection", icon: Receipt, slug: "fee-collection" },
      { label: "Fee Defaulters", icon: AlertCircle, slug: "fee-defaulters", badge: 47 },
    ]},
    { title: "Administration", items: [
      { label: "Substitute Management", icon: RefreshCw, slug: "substitute-management" },
      { label: "Staff Leave Approval", icon: FileCheck, slug: "leave-approval", badge: 8 },
      { label: "Conduct & Discipline", icon: AlertTriangle, slug: "conduct" },
      { label: "Announcements", icon: Megaphone, slug: "announcements" },
      { label: "Parent Communication", icon: MessageSquare, slug: "parent-communication" },
      { label: "Noticeboard", icon: Newspaper, slug: "noticeboard" },
    ]},
    { title: "Infrastructure", items: [
      { label: "Infrastructure Alerts", icon: Building2, slug: "infrastructure", badge: 3 },
      { label: "School Settings", icon: Settings, slug: "settings" },
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
