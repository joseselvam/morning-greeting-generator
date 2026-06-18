import type { RoleId } from "./roles";

export const ROLE_USERS: Record<RoleId, { name: string; sub: string; initials: string }> = {
  super_admin: { name: "Mr. Aditya Mehra", sub: "Super Administrator", initials: "AM" },
  school_admin: { name: "Mrs. Anitha Reddy", sub: "School Administrator", initials: "AR" },
  student: { name: "Arjun Krishnamurthy", sub: "Class 11 — Section A", initials: "AK" },
  faculty: { name: "Mr. Rajesh Iyer", sub: "Mathematics Dept.", initials: "RI" },
  hof: { name: "Dr. Priya Venkatesan", sub: "Head — Sciences", initials: "PV" },
  principal: { name: "Dr. Samuel Devanand", sub: "Principal", initials: "SD" },
};


export const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: "#191BDF",
  Physics: "#3B82F6",
  Chemistry: "#10B981",
  Biology: "#F59E0B",
  English: "#EF4444",
  History: "#8B5CF6",
  "Computer Science": "#06B6D4",
  Tamil: "#EC4899",
};

export const STUDENT_MARKS = [
  { subject: "Mathematics", score: 94, max: 100 },
  { subject: "Physics", score: 88, max: 100 },
  { subject: "Chemistry", score: 91, max: 100 },
  { subject: "English", score: 82, max: 100 },
  { subject: "Computer Science", score: 96, max: 100 },
  { subject: "History", score: 76, max: 100 },
];

export const STUDENT_ASSIGNMENTS = [
  { subject: "Mathematics", title: "Integration Worksheet — Chapter 7", due: "Tomorrow", status: "overdue" as const },
  { subject: "Physics", title: "Electromagnetic Induction Lab Report", due: "In 2 days", status: "pending" as const },
  { subject: "English", title: "Essay: Modern Literature Analysis", due: "In 5 days", status: "pending" as const },
  { subject: "Chemistry", title: "Organic Chemistry Problem Set", due: "Last week", status: "submitted" as const },
];

export const STUDENT_HOMEWORK = [
  { subject: "Mathematics", task: "Solve exercises 7.1 to 7.4 from textbook", due: "Tomorrow" },
  { subject: "Physics", task: "Read Chapter 6 — Electromagnetic Waves", due: "Tomorrow" },
  { subject: "English", task: "Prepare summary of Act III, Macbeth", due: "Day after" },
];

export const ANNOUNCEMENTS = [
  { title: "Annual Sports Day Postponed", preview: "Due to weather forecasts, the annual sports day scheduled for this Friday has been moved.", date: "2h ago", priority: "high" as const },
  { title: "Library Hours Extended", preview: "The school library will remain open until 7 PM on weekdays during exam season.", date: "Yesterday", priority: "normal" as const },
  { title: "Parent-Teacher Meeting", preview: "Quarterly PTM scheduled for March 28th. Please confirm your slot via the portal.", date: "2 days ago", priority: "normal" as const },
];

export const EVENTS = [
  { day: "28", month: "MAR", name: "Parent-Teacher Meeting", type: "PTM", time: "9:00 AM" },
  { day: "02", month: "APR", name: "Mid-Term Examinations", type: "Exam", time: "Whole Day" },
  { day: "14", month: "APR", name: "Tamil New Year — Holiday", type: "Holiday", time: "—" },
];

// Faculty
export const FACULTY_CLASSES_TODAY = [
  { time: "08:30", subject: "Mathematics", section: "Class 11 — A", room: "Rm 204", status: "completed" as const },
  { time: "09:30", subject: "Mathematics", section: "Class 10 — B", room: "Rm 108", status: "completed" as const },
  { time: "11:00", subject: "Mathematics", section: "Class 12 — A", room: "Rm 301", status: "ongoing" as const },
  { time: "13:30", subject: "Mathematics", section: "Class 9 — C", room: "Rm 112", status: "upcoming" as const },
  { time: "14:30", subject: "Mathematics", section: "Class 11 — B", room: "Rm 205", status: "upcoming" as const },
];

export const FACULTY_ASSIGNMENTS = [
  { title: "Quadratic Equations Worksheet", section: "Class 10 — A", submitted: 34, total: 40, due: "Mar 25" },
  { title: "Trigonometry Problem Set 3", section: "Class 11 — A", submitted: 28, total: 32, due: "Mar 23" },
  { title: "Calculus Take-Home Test", section: "Class 12 — A", submitted: 38, total: 38, due: "Mar 20" },
];

// HOF
export const ABSENT_FACULTY = [
  { name: "Ms. Lakshmi Narayan", subject: "Physics", classes: 3, substitute: null },
  { name: "Mr. Vikram Sundar", subject: "Chemistry", classes: 2, substitute: "Ms. Anjali Rao" },
  { name: "Mr. Karthik Menon", subject: "Biology", classes: 2, substitute: "Dr. Suresh Babu" },
];

export const LEAVE_REQUESTS = [
  { name: "Ms. Deepa Krishnan", subject: "Mathematics", dates: "Mar 25 – Mar 27", days: 3, reason: "Family function" },
  { name: "Mr. Anand Pillai", subject: "English", dates: "Apr 02", days: 1, reason: "Medical appointment" },
  { name: "Dr. Sanjana Murthy", subject: "Chemistry", dates: "Apr 05 – Apr 06", days: 2, reason: "Conference" },
];

export const CURRICULUM_PROGRESS = [
  { subject: "Mathematics", grade: "Class 11", covered: 14, total: 16, status: "ontrack" as const },
  { subject: "Physics", grade: "Class 11", covered: 11, total: 15, status: "behind" as const },
  { subject: "Chemistry", grade: "Class 11", covered: 13, total: 14, status: "ahead" as const },
  { subject: "Biology", grade: "Class 11", covered: 12, total: 15, status: "ontrack" as const },
  { subject: "English", grade: "Class 11", covered: 9, total: 13, status: "behind" as const },
];

// Principal
export const FEE_DEFAULTERS = [
  { name: "Rohan Mehta", class: "Class 10 — B", amount: 28500, overdue: 22 },
  { name: "Aditya Kapoor", class: "Class 9 — A", amount: 24000, overdue: 18 },
  { name: "Sneha Reddy", class: "Class 11 — C", amount: 31200, overdue: 14 },
  { name: "Vikrant Singh", class: "Class 8 — A", amount: 19800, overdue: 9 },
];

export const ADMISSIONS_FUNNEL = [
  { stage: "Applied", count: 248 },
  { stage: "Doc Review", count: 186 },
  { stage: "Interview", count: 94 },
  { stage: "Admitted", count: 47 },
  { stage: "Enrolled", count: 32 },
];

export const CLASS_PERFORMANCE = [
  { class: "Class 8", avg: 78 },
  { class: "Class 9", avg: 82 },
  { class: "Class 10", avg: 85 },
  { class: "Class 11", avg: 79 },
  { class: "Class 12", avg: 88 },
];

export const NOTIFICATIONS = [
  { title: "New assignment submitted", subtitle: "Priya Sharma — Mathematics", time: "5m", unread: true, color: "brand" },
  { title: "Fee payment received", subtitle: "₹24,000 from Class 10-A", time: "1h", unread: true, color: "success" },
  { title: "Leave request pending", subtitle: "Ms. Deepa Krishnan", time: "3h", unread: true, color: "warning" },
  { title: "Substitute confirmed", subtitle: "Ms. Anjali Rao for Physics", time: "Yesterday", unread: false, color: "info" },
  { title: "Monthly report ready", subtitle: "March 2026 analytics", time: "2d", unread: false, color: "brand" },
];
