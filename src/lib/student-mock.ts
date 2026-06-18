import {
  Calculator, Atom, FlaskConical, Leaf, BookOpen, Monitor, type LucideIcon,
} from "lucide-react";

export const STUDENT = {
  name: "Arjun Kumar",
  regNo: "BA2024042",
  className: "10 — Section A",
  rollNo: 12,
};

export type SubjectKey = "math" | "physics" | "chemistry" | "biology" | "english" | "computer";

export interface SubjectDef {
  key: SubjectKey;
  name: string;
  color: string;       // primary hex
  bg: string;          // 10% bg
  icon: LucideIcon;
  teacher: string;
}

export const SUBJECTS: SubjectDef[] = [
  { key: "math",      name: "Mathematics",      color: "#191BDF", bg: "rgba(25,27,223,0.10)",  icon: Calculator,   teacher: "Mr. Ramesh Kumar" },
  { key: "physics",   name: "Physics",          color: "#3B82F6", bg: "rgba(59,130,246,0.10)", icon: Atom,         teacher: "Ms. Anjali Verma" },
  { key: "chemistry", name: "Chemistry",        color: "#F59E0B", bg: "rgba(245,158,11,0.10)", icon: FlaskConical, teacher: "Dr. Suresh Iyer" },
  { key: "biology",   name: "Biology",          color: "#10B981", bg: "rgba(16,185,129,0.10)", icon: Leaf,         teacher: "Mrs. Latha Pillai" },
  { key: "english",   name: "English",          color: "#8B5CF6", bg: "rgba(139,92,246,0.10)", icon: BookOpen,     teacher: "Mr. Daniel Joseph" },
  { key: "computer",  name: "Computer Science", color: "#EF4444", bg: "rgba(239,68,68,0.10)",  icon: Monitor,      teacher: "Ms. Priya Sharma" },
];

export const subjectByKey = (k: SubjectKey) => SUBJECTS.find((s) => s.key === k)!;

export type Grade = "A+" | "A" | "B+" | "B" | "C" | "F";
export const gradeStyle = (g: Grade) => {
  switch (g) {
    case "A+": return { bg: "rgba(16,185,129,0.15)", fg: "#059669" };
    case "A":  return { bg: "rgba(25,27,223,0.15)",  fg: "#191BDF" };
    case "B+": return { bg: "rgba(59,130,246,0.15)", fg: "#1D4ED8" };
    case "B":  return { bg: "rgba(245,158,11,0.15)", fg: "#B45309" };
    case "C":  return { bg: "rgba(249,115,22,0.15)", fg: "#C2410C" };
    case "F":  return { bg: "rgba(239,68,68,0.15)",  fg: "#DC2626" };
  }
};
export const pctToGrade = (p: number): Grade =>
  p >= 90 ? "A+" : p >= 80 ? "A" : p >= 70 ? "B+" : p >= 60 ? "B" : p >= 50 ? "C" : "F";

export const EXAM_TYPES = ["Unit Test I", "Mid Term", "Unit Test II", "Quarterly", "Half Yearly", "Annual"] as const;
export type ExamType = (typeof EXAM_TYPES)[number];

/* Marks: subject × examType -> obtained / 100 */
export const MARKS: Record<ExamType, Record<SubjectKey, number>> = {
  "Unit Test I":   { math: 88, physics: 82, chemistry: 74, biology: 91, english: 78, computer: 86 },
  "Mid Term":      { math: 91, physics: 79, chemistry: 71, biology: 88, english: 81, computer: 90 },
  "Unit Test II":  { math: 84, physics: 85, chemistry: 76, biology: 92, english: 75, computer: 88 },
  "Quarterly":     { math: 89, physics: 81, chemistry: 78, biology: 90, english: 80, computer: 87 },
  "Half Yearly":   { math: 92, physics: 86, chemistry: 80, biology: 94, english: 83, computer: 91 },
  "Annual":        { math: 95, physics: 88, chemistry: 82, biology: 96, english: 85, computer: 93 },
};

/* Attendance — March 2025 */
export type DayState = "present" | "absent" | "leave" | "holiday" | "future" | "empty";
export const MARCH_2025: { date: number; state: DayState }[] = (() => {
  // 1 Mar 2025 is a Saturday
  const arr: { date: number; state: DayState }[] = [];
  // 6 empty cells (Sun=0..Fri=5) before Sat
  for (let i = 0; i < 6; i++) arr.push({ date: 0, state: "empty" });
  const absent = new Set([5, 12, 19]);
  const leave = new Set([7, 24]);
  for (let d = 1; d <= 31; d++) {
    const dow = (d + 5) % 7; // 1=>Sat(6), 2=>Sun(0)...
    let state: DayState;
    if (d > 22) state = "future";
    else if (dow === 0) state = "holiday";
    else if (absent.has(d)) state = "absent";
    else if (leave.has(d)) state = "leave";
    else state = "present";
    arr.push({ date: d, state });
  }
  return arr;
})();

export const MONTHLY_TREND = [
  { m: "Jun", v: 94 }, { m: "Jul", v: 91 }, { m: "Aug", v: 89 }, { m: "Sep", v: 92 },
  { m: "Oct", v: 88 }, { m: "Nov", v: 93 }, { m: "Dec", v: 85 }, { m: "Jan", v: 90 },
  { m: "Feb", v: 92 }, { m: "Mar", v: 90 },
];

/* Assignments */
export type AssignmentStatus = "pending" | "submitted" | "overdue";
export interface Assignment {
  id: string; subject: SubjectKey; title: string; description: string;
  due: string; status: AssignmentStatus; priority: "high" | "medium" | "low";
  submittedOn?: string; marks?: number; max?: number;
}
export const ASSIGNMENTS: Assignment[] = [
  { id: "A1", subject: "math", title: "Quadratic Equations Worksheet", description: "Solve 25 problems covering nature of roots, sum-product formulas and word problems.", due: "18 Mar 2025", status: "pending", priority: "high" },
  { id: "A2", subject: "physics", title: "Lab Report — Refraction of Light", description: "Submit a typed lab report with diagrams and observations from the Snell's law experiment.", due: "20 Mar 2025", status: "pending", priority: "medium" },
  { id: "A3", subject: "english", title: "Essay — The Road Not Taken", description: "Write a 600-word literary analysis on Robert Frost's poem.", due: "22 Mar 2025", status: "pending", priority: "low" },
  { id: "A4", subject: "chemistry", title: "Periodic Table Assignment", description: "Group-wise property comparison chart.", due: "10 Mar 2025", status: "submitted", priority: "medium", submittedOn: "09 Mar 2025", marks: 18, max: 20 },
  { id: "A5", subject: "biology", title: "Photosynthesis Diagram", description: "Hand-drawn labelled diagram with explanation.", due: "08 Mar 2025", status: "submitted", priority: "low", submittedOn: "07 Mar 2025", marks: 15, max: 15 },
  { id: "A6", subject: "computer", title: "Python — Calculator Program", description: "GUI calculator using tkinter with screenshots.", due: "06 Mar 2025", status: "submitted", priority: "medium", submittedOn: "05 Mar 2025", marks: 24, max: 25 },
  { id: "A7", subject: "math", title: "Trigonometry Practice", description: "Identities and applications.", due: "04 Mar 2025", status: "submitted", priority: "medium", submittedOn: "03 Mar 2025", marks: 19, max: 20 },
  { id: "A8", subject: "physics", title: "Electric Circuits MCQ", description: "Online MCQ set, 30 questions.", due: "02 Mar 2025", status: "submitted", priority: "low", submittedOn: "01 Mar 2025", marks: 28, max: 30 },
  { id: "A9", subject: "english", title: "Grammar Worksheet 4", description: "Tenses & voice conversions.", due: "28 Feb 2025", status: "submitted", priority: "low", submittedOn: "27 Feb 2025", marks: 17, max: 20 },
  { id: "A10", subject: "chemistry", title: "Mole Concept Numericals", description: "20 numerical problems.", due: "25 Feb 2025", status: "submitted", priority: "medium", submittedOn: "24 Feb 2025", marks: 16, max: 20 },
  { id: "A11", subject: "biology", title: "Human Heart Anatomy", description: "Submit labelled diagram and one-page note.", due: "12 Mar 2025", status: "overdue", priority: "high" },
];

/* Homework today */
export interface Homework { id: string; subject: SubjectKey; text: string; due: string; done: boolean; }
export const TODAYS_HOMEWORK: Homework[] = [
  { id: "H1", subject: "math",      text: "Exercise 4.3 — Q 1 to 12", due: "Tonight",  done: true  },
  { id: "H2", subject: "physics",   text: "Read chapter 10 & make notes on lens formula", due: "Tonight",  done: true  },
  { id: "H3", subject: "english",   text: "Learn 20 new vocabulary words from Unit 7",    due: "Tomorrow", done: false },
  { id: "H4", subject: "chemistry", text: "Write equations for first 10 reactions of alkenes", due: "Tomorrow", done: false },
];

/* Rank holders */
export interface RankRow { rank: number; name: string; reg: string; total: number; pct: number; grade: Grade; attendance: number; you?: boolean; }
export const LEADERBOARD: RankRow[] = [
  { rank: 1,  name: "Priya Iyer",       reg: "BA2024018", total: 564, pct: 94.0, grade: "A+", attendance: 98 },
  { rank: 2,  name: "Karan Mehta",      reg: "BA2024031", total: 552, pct: 92.0, grade: "A+", attendance: 96 },
  { rank: 3,  name: "Aisha Khan",       reg: "BA2024005", total: 541, pct: 90.2, grade: "A+", attendance: 95 },
  { rank: 4,  name: STUDENT.name,        reg: STUDENT.regNo, total: 533, pct: 88.8, grade: "A", attendance: 90, you: true },
  { rank: 5,  name: "Rohit Sharma",     reg: "BA2024047", total: 528, pct: 88.0, grade: "A", attendance: 93 },
  { rank: 6,  name: "Sneha Pillai",     reg: "BA2024022", total: 519, pct: 86.5, grade: "A", attendance: 92 },
  { rank: 7,  name: "Vikram Reddy",     reg: "BA2024058", total: 511, pct: 85.2, grade: "A", attendance: 88 },
  { rank: 8,  name: "Ananya Das",       reg: "BA2024014", total: 502, pct: 83.7, grade: "A", attendance: 91 },
  { rank: 9,  name: "Mohammed Faisal",  reg: "BA2024040", total: 494, pct: 82.3, grade: "A", attendance: 86 },
  { rank: 10, name: "Tara Joseph",      reg: "BA2024027", total: 486, pct: 81.0, grade: "A", attendance: 89 },
];

/* Study materials */
export type FileType = "PDF" | "DOC" | "PPT" | "IMG" | "VID" | "ZIP";
export interface StudyFile { id: string; name: string; subject: SubjectKey; type: FileType; size: string; uploadedBy: string; date: string; isNew?: boolean; }
export const STUDY_FILES: StudyFile[] = [
  { id: "F1",  name: "Quadratic Equations — Class Notes",   subject: "math",      type: "PDF", size: "2.4 MB", uploadedBy: "Mr. Ramesh Kumar",    date: "14 Mar 2025", isNew: true },
  { id: "F2",  name: "Refraction Lab — Reference",          subject: "physics",   type: "PDF", size: "1.8 MB", uploadedBy: "Ms. Anjali Verma",    date: "13 Mar 2025", isNew: true },
  { id: "F3",  name: "Periodic Table Presentation",         subject: "chemistry", type: "PPT", size: "5.6 MB", uploadedBy: "Dr. Suresh Iyer",     date: "12 Mar 2025", isNew: true },
  { id: "F4",  name: "Photosynthesis Animation",            subject: "biology",   type: "VID", size: "24 MB",  uploadedBy: "Mrs. Latha Pillai",   date: "10 Mar 2025" },
  { id: "F5",  name: "Robert Frost — Poem Pack",            subject: "english",   type: "DOC", size: "640 KB", uploadedBy: "Mr. Daniel Joseph",   date: "08 Mar 2025" },
  { id: "F6",  name: "Python Examples Bundle",              subject: "computer",  type: "ZIP", size: "3.2 MB", uploadedBy: "Ms. Priya Sharma",    date: "07 Mar 2025" },
  { id: "F7",  name: "Trigonometry Formula Sheet",          subject: "math",      type: "PDF", size: "420 KB", uploadedBy: "Mr. Ramesh Kumar",    date: "06 Mar 2025" },
  { id: "F8",  name: "Optics Diagrams",                     subject: "physics",   type: "IMG", size: "1.1 MB", uploadedBy: "Ms. Anjali Verma",    date: "05 Mar 2025" },
  { id: "F9",  name: "Mole Concept Worksheet",              subject: "chemistry", type: "PDF", size: "780 KB", uploadedBy: "Dr. Suresh Iyer",     date: "03 Mar 2025" },
  { id: "F10", name: "Cell Division Notes",                 subject: "biology",   type: "DOC", size: "1.4 MB", uploadedBy: "Mrs. Latha Pillai",   date: "01 Mar 2025" },
  { id: "F11", name: "Reading Comprehension Set",           subject: "english",   type: "PDF", size: "910 KB", uploadedBy: "Mr. Daniel Joseph",   date: "28 Feb 2025" },
  { id: "F12", name: "OOP Concepts Slides",                 subject: "computer",  type: "PPT", size: "4.1 MB", uploadedBy: "Ms. Priya Sharma",    date: "25 Feb 2025" },
];

/* Fee */
export const FEE = {
  total: 45000, paid: 30000, pending: 15000,
  categories: [
    { name: "Tuition Fee",   amount: 22000, status: "paid"    as const, date: "12 Jan 2025" },
    { name: "Term Fee",      amount: 6000,  status: "paid"    as const, date: "12 Jan 2025" },
    { name: "Exam Fee",      amount: 3500,  status: "pending" as const, date: "31 Mar 2025" },
    { name: "Library Fee",   amount: 1500,  status: "paid"    as const, date: "12 Jan 2025" },
    { name: "Lab Fee",       amount: 4000,  status: "partial" as const, date: "31 Mar 2025" },
    { name: "Transport Fee", amount: 8000,  status: "pending" as const, date: "31 Mar 2025" },
  ],
  history: [
    { receipt: "RCPT-9821", date: "12 Jan 2025", type: "Tuition + Term", amount: 28000, mode: "UPI",  status: "Successful" },
    { receipt: "RCPT-9745", date: "12 Jan 2025", type: "Library Fee",    amount: 1500,  mode: "UPI",  status: "Successful" },
    { receipt: "RCPT-9690", date: "10 Jan 2025", type: "Lab Fee (50%)",  amount: 2000,  mode: "NEFT", status: "Successful" },
    { receipt: "RCPT-9550", date: "05 Jan 2025", type: "Tuition (Adv.)", amount: 5000,  mode: "Cash", status: "Successful" },
    { receipt: "RCPT-9410", date: "28 Dec 2024", type: "Misc.",          amount: 1200,  mode: "DD",   status: "Successful" },
    { receipt: "RCPT-9088", date: "15 Dec 2024", type: "Re-exam Fee",    amount: 500,   mode: "UPI",  status: "Failed"     },
  ],
};

/* Remarks */
export type RemarkType = "warning" | "positive" | "info" | "counselling";
export interface Remark { id: string; type: RemarkType; date: string; text: string; teacher: string; subject: string; status: "Resolved" | "Pending Action" | "Acknowledged"; }
export const REMARKS: Remark[] = [
  { id: "R1", type: "positive",    date: "14 Mar 2025", text: "Excellent participation in the mathematics olympiad selection round. Keep up the analytical thinking.", teacher: "Mr. Ramesh Kumar", subject: "Mathematics", status: "Acknowledged" },
  { id: "R2", type: "warning",     date: "10 Mar 2025", text: "Late submission of chemistry assignment for the second time this month. Please prioritise deadlines.", teacher: "Dr. Suresh Iyer",  subject: "Chemistry",   status: "Pending Action" },
  { id: "R3", type: "info",        date: "06 Mar 2025", text: "Selected to represent the class at the inter-school debate championship.", teacher: "Mr. Daniel Joseph", subject: "English", status: "Acknowledged" },
  { id: "R4", type: "positive",    date: "02 Mar 2025", text: "Helped a peer understand difficult biology concepts during free period. Genuine team spirit.", teacher: "Mrs. Latha Pillai", subject: "Biology",     status: "Resolved" },
  { id: "R5", type: "warning",     date: "20 Feb 2025", text: "Not carrying physics practical record on lab day. Please ensure full lab readiness.",            teacher: "Ms. Anjali Verma",  subject: "Physics",     status: "Resolved" },
  { id: "R6", type: "counselling", date: "12 Feb 2025", text: "Suggested short counselling session to discuss board exam stress and study planning.",            teacher: "Counsellor — Mrs. Rao", subject: "Wellness",  status: "Resolved" },
  { id: "R7", type: "warning",     date: "05 Feb 2025", text: "Distracted during morning assembly. Please maintain decorum during school gatherings.",          teacher: "Discipline — Mr. Ali", subject: "Conduct", status: "Resolved" },
  { id: "R8", type: "positive",    date: "28 Jan 2025", text: "Scored a centum in mid-term mathematics. Outstanding effort.",                                    teacher: "Mr. Ramesh Kumar",  subject: "Mathematics", status: "Acknowledged" },
];

/* Events */
export type EventType = "exam" | "holiday" | "school" | "ptm" | "sports" | "cultural";
export const EVENT_META: Record<EventType, { label: string; color: string; bg: string }> = {
  exam:     { label: "Exam",         color: "#EF4444", bg: "rgba(239,68,68,0.12)"   },
  holiday:  { label: "Holiday",      color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  school:   { label: "School Event", color: "#191BDF", bg: "rgba(25,27,223,0.12)"   },
  ptm:      { label: "PTM",          color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  sports:   { label: "Sports",       color: "#F97316", bg: "rgba(249,115,22,0.12)" },
  cultural: { label: "Cultural",     color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
};
export interface EventItem { id: string; title: string; date: string; day: number; month: string; time?: string; venue?: string; type: EventType; }
export const EVENTS: EventItem[] = [
  { id: "E1",  title: "Unit Test II — Mathematics",  date: "18 Mar 2025", day: 18, month: "Mar", time: "09:00 — 11:00 AM", venue: "Hall A",       type: "exam" },
  { id: "E2",  title: "Holi Holiday",                date: "20 Mar 2025", day: 20, month: "Mar", venue: "School Closed",                          type: "holiday" },
  { id: "E3",  title: "Parent-Teacher Meeting",      date: "22 Mar 2025", day: 22, month: "Mar", time: "10:00 AM",         venue: "Room 204",     type: "ptm" },
  { id: "E4",  title: "Inter-School Debate",         date: "25 Mar 2025", day: 25, month: "Mar", time: "02:00 PM",         venue: "Auditorium",   type: "cultural" },
  { id: "E5",  title: "Annual Sports Day",           date: "28 Mar 2025", day: 28, month: "Mar", time: "08:00 AM",         venue: "Sports Field", type: "sports" },
  { id: "E6",  title: "Unit Test II — Physics",      date: "19 Mar 2025", day: 19, month: "Mar", time: "09:00 AM",         venue: "Hall B",       type: "exam" },
  { id: "E7",  title: "Unit Test II — Chemistry",    date: "21 Mar 2025", day: 21, month: "Mar", time: "09:00 AM",         venue: "Hall A",       type: "exam" },
  { id: "E8",  title: "Unit Test II — English",      date: "24 Mar 2025", day: 24, month: "Mar", time: "09:00 AM",         venue: "Hall C",       type: "exam" },
  { id: "E9",  title: "Founders' Day Celebration",   date: "02 Apr 2025", day: 2,  month: "Apr", time: "06:00 PM",         venue: "Auditorium",   type: "school" },
  { id: "E10", title: "Good Friday",                 date: "18 Apr 2025", day: 18, month: "Apr", venue: "School Closed",                          type: "holiday" },
  { id: "E11", title: "Cultural Fest — Spectra",     date: "12 Apr 2025", day: 12, month: "Apr", time: "10:00 AM",         venue: "Main Block",   type: "cultural" },
  { id: "E12", title: "Career Counselling Workshop", date: "05 Apr 2025", day: 5,  month: "Apr", time: "11:00 AM",         venue: "AV Room",      type: "school" },
];

/* Announcements */
export type AnnType = "general" | "urgent" | "exam" | "event" | "fee" | "academic";
export const ANN_META: Record<AnnType, { label: string; color: string; bg: string }> = {
  general:  { label: "General",  color: "#191BDF", bg: "rgba(25,27,223,0.12)"   },
  urgent:   { label: "Urgent",   color: "#EF4444", bg: "rgba(239,68,68,0.12)"   },
  exam:     { label: "Exam",     color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  event:    { label: "Event",    color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  fee:      { label: "Fee",      color: "#F97316", bg: "rgba(249,115,22,0.12)" },
  academic: { label: "Academic", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
};
export interface Announcement {
  id: string; type: AnnType; title: string; preview: string; body: string;
  postedBy: string; date: string; unread: boolean; pinned?: boolean; readBy?: number;
}
export const ANNOUNCEMENTS: Announcement[] = [
  { id: "N1", type: "urgent", title: "Class 10 Pre-board Schedule Released", preview: "The detailed pre-board examination schedule for Class 10 has been published. Please review and prepare accordingly.", body: "The pre-board examinations for Class 10 will begin on 25 March 2025 and conclude on 5 April 2025. All students are expected to be present 15 minutes before the start of each paper. Detailed seating arrangements will be posted on the noticeboard by 22 March 2025.", postedBy: "Principal Office", date: "15 Mar 2025", unread: true, pinned: true, readBy: 412 },
  { id: "N2", type: "fee", title: "Final Reminder — Annual Fee Due 31 March", preview: "Kindly clear all pending dues before 31 March to avoid late fee charges of ₹500/month.", body: "This is a gentle reminder that the second instalment of the annual fee is due on 31 March 2025. Payments can be made online via the parent portal or at the school accounts office. Late fee of ₹500 per month will be levied thereafter.", postedBy: "Accounts Office", date: "14 Mar 2025", unread: true, pinned: true, readBy: 380 },
  { id: "N3", type: "event", title: "Annual Sports Day — 28 March", preview: "Annual Sports Day will be held on the school grounds. Parents are cordially invited.", body: "We are delighted to invite parents to the Annual Sports Day on 28 March 2025 from 8 AM onwards. Refreshments will be provided. Please report at Gate 2.", postedBy: "Sports Department", date: "13 Mar 2025", unread: true, readBy: 502 },
  { id: "N4", type: "exam", title: "Practical Exam Lab Allocation", preview: "Lab allocation for Class 10 practicals has been updated on the noticeboard.", body: "Please check the noticeboard for your assigned lab for physics, chemistry, biology and computer science practical examinations.", postedBy: "Examination Cell", date: "12 Mar 2025", unread: true, readBy: 286 },
  { id: "N5", type: "academic", title: "Extra Mathematics Doubt-Clearing Session", preview: "Mr. Ramesh Kumar will host a 90-minute doubt session this Saturday at 10 AM.", body: "A focused doubt-clearing session for Class 10 Mathematics will be held on Saturday in Room 204 from 10:00 AM to 11:30 AM.", postedBy: "Mr. Ramesh Kumar", date: "10 Mar 2025", unread: true, readBy: 198 },
  { id: "N6", type: "general", title: "Library New Arrivals", preview: "Over 80 new titles added to the senior library section.", body: "Stop by the library to browse the latest additions ranging from competitive exam guides to contemporary fiction.", postedBy: "Library", date: "08 Mar 2025", unread: false, readBy: 312 },
  { id: "N7", type: "event", title: "Founders' Day on 2 April", preview: "Celebration begins at 6 PM in the auditorium.", body: "All students are required to attend in school uniform with the founders' day badge.", postedBy: "Principal Office", date: "06 Mar 2025", unread: false, readBy: 480 },
  { id: "N8", type: "academic", title: "Career Counselling Workshop", preview: "Workshop on 5 April covering stream selection and career mapping.", body: "Renowned career counsellor Dr. Anu Bhatt will conduct a workshop tailored for Class 10 students.", postedBy: "Counselling Cell", date: "05 Mar 2025", unread: false, readBy: 244 },
  { id: "N9", type: "general", title: "Uniform Code Reminder", preview: "Please adhere to the prescribed uniform code on all working days.", body: "Repeated non-compliance will be reported to parents through the conduct module.", postedBy: "Discipline Committee", date: "03 Mar 2025", unread: false, readBy: 528 },
  { id: "N10", type: "fee", title: "Online Payment Portal Maintenance", preview: "Payment portal will be unavailable on 20 Mar between 1 AM – 4 AM.", body: "Routine maintenance work. Please plan transactions accordingly.", postedBy: "IT Cell", date: "01 Mar 2025", unread: false, readBy: 410 },
];

/* Parent meetings */
export type MeetStatus = "Upcoming" | "Completed" | "Cancelled";
export interface Meeting {
  id: string; status: MeetStatus; mode: "in-person" | "online";
  date: string; time: string; teacher: string; subject: string;
  location: string; agenda: string[]; summary?: string; cancelReason?: string;
}
export const MEETINGS: Meeting[] = [
  { id: "M1", status: "Upcoming",  mode: "in-person", date: "22 Mar 2025, Saturday", time: "10:00 — 10:20 AM", teacher: "Mr. Ramesh Kumar", subject: "Class Teacher · Mathematics", location: "Room 204, Block B", agenda: ["Performance discussion across all subjects", "Attendance and conduct review", "Preparation plan for pre-boards"] },
  { id: "M2", status: "Completed", mode: "online",    date: "08 Feb 2025, Saturday", time: "11:00 — 11:20 AM", teacher: "Mrs. Latha Pillai", subject: "Biology",                       location: "Google Meet",        agenda: ["Lab work review", "Improvement areas"], summary: "Arjun is showing consistent improvement in lab work. Suggested continuing diagram practice." },
  { id: "M3", status: "Completed", mode: "in-person", date: "14 Dec 2024, Saturday", time: "09:30 — 09:50 AM", teacher: "Mr. Daniel Joseph", subject: "English",                       location: "Room 108, Block A",  agenda: ["Half-yearly performance", "Reading habits"], summary: "Reading list shared. Encourage 30 minutes daily reading." },
  { id: "M4", status: "Cancelled", mode: "online",    date: "30 Jan 2025, Thursday", time: "04:00 PM",         teacher: "Ms. Priya Sharma",  subject: "Computer Science",              location: "Google Meet",        agenda: ["Project review"], cancelReason: "Teacher on emergency leave. Rescheduling soon." },
];
