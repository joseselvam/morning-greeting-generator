import { createFileRoute, useParams } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { findNavLabel } from "@/lib/dashboard-nav";
import type { RoleId } from "@/lib/roles";

// Student
import { MarksPage } from "@/components/dashboard/student/MarksPage";
import { AttendancePage } from "@/components/dashboard/student/AttendancePage";
import { AssignmentsPage } from "@/components/dashboard/student/AssignmentsPage";
import { HomeworkPage } from "@/components/dashboard/student/HomeworkPage";
import { RankHoldersPage } from "@/components/dashboard/student/RankHoldersPage";
import { ProgressPage } from "@/components/dashboard/student/ProgressPage";
import { StudyMaterialsPage } from "@/components/dashboard/student/StudyMaterialsPage";
import { FeeStatusPage } from "@/components/dashboard/student/FeeStatusPage";
import { RemarksPage } from "@/components/dashboard/student/RemarksPage";
import { EventsPage } from "@/components/dashboard/student/EventsPage";
import { AnnouncementsPage } from "@/components/dashboard/student/AnnouncementsPage";
import { ParentMeetingPage } from "@/components/dashboard/student/ParentMeetingPage";
import { StudentTimetablePage } from "@/components/dashboard/student/TimetablePage";
import { DocumentsPage } from "@/components/dashboard/student/DocumentsPage";

// Faculty
import {
  MarkEntryPage, FacultyAttendancePage, FacultyHomeworkPage, FacultyAssignmentsPage,
  FacultyTimetablePage, RankComputationPage, FacultyReportsPage, FacultyStudyMaterialsPage,
  FacultyAnnouncementsPage, FacultyParentMeetingPage, FacultyRemarksPage,
  FacultyLeaveRequestsPage, FacultyEventsPage,
} from "@/components/dashboard/faculty/pages";
import { StudentProfilesPage } from "@/components/dashboard/faculty/StudentProfilesPage";

// HOF
import {
  FacultyDirectoryPage, FacultyAttendanceOverviewPage, SubstituteAllocationPage,
  FacultyPerformancePage, LeaveManagementPage, TimetableManagementPage,
  CurriculumTrackerPage, ExamSchedulePage, DepartmentReportsPage,
  HofAnnouncementsPage, MeetingSchedulerPage, StudentEscalationsPage,
} from "@/components/dashboard/hof/pages";
import { TimetableDraftsPage, FacultyWorkloadPage, SubjectAllocationPage } from "@/components/dashboard/hof/extra-pages";

// Principal (legacy + KPI)
import {
  AcademicCalendarPage, SubstituteManagementPage, StaffLeaveApprovalPage,
  PrincipalAnnouncementsPage, NoticeboardPage,
} from "@/components/dashboard/principal/pages";
import {
  PrincipalKpisPage, PrincipalAnalyticsPage, AcademicPerformancePage,
  FacultyPerformancePrincipalPage, StudentDisciplinePage, AttendanceTrendsPage,
  PrincipalReportsPage,
} from "@/components/dashboard/principal/kpi-pages";

// Super Admin
import {
  SchoolManagementPage, UserManagementPage, SystemMonitorPage,
  DatabaseBackupPage, AuditLogsPage,
} from "@/components/dashboard/superadmin/pages";

// School Admin
import {
  StudentManagementPage as SAStudentManagementPage,
  AdmissionManagementPage, TeacherManagementPage, UserAccountsPage,
  FeeManagementPage, CertificateGeneratorPage, TimetablePublishingPage,
  ReportsPage, CredentialCenterPage,
} from "@/components/dashboard/schooladmin/pages";

import { ProfilePage } from "@/components/dashboard/ProfilePage";
import { NotificationsCenterPage } from "@/components/dashboard/NotificationsCenter";
import { SearchResultsPage } from "@/components/dashboard/SearchResultsPage";

export const Route = createFileRoute("/dashboard/$role/$section")({
  component: SectionPage,
});

const STUDENT_PAGES: Record<string, React.ComponentType> = {
  marks: MarksPage, attendance: AttendancePage, assignments: AssignmentsPage,
  homework: HomeworkPage, "rank-holders": RankHoldersPage, progress: ProgressPage,
  "study-materials": StudyMaterialsPage, "fee-status": FeeStatusPage, remarks: RemarksPage,
  events: EventsPage, announcements: AnnouncementsPage, "parent-meeting": ParentMeetingPage,
  timetable: StudentTimetablePage, documents: DocumentsPage,
};

const FACULTY_PAGES: Record<string, React.ComponentType> = {
  "mark-entry": MarkEntryPage, attendance: FacultyAttendancePage, homework: FacultyHomeworkPage,
  assignments: FacultyAssignmentsPage, timetable: FacultyTimetablePage,
  "rank-computation": RankComputationPage, reports: FacultyReportsPage,
  "study-materials": FacultyStudyMaterialsPage, announcements: FacultyAnnouncementsPage,
  "parent-meeting": FacultyParentMeetingPage, remarks: FacultyRemarksPage,
  "leave-requests": FacultyLeaveRequestsPage, events: FacultyEventsPage,
  "student-profiles": StudentProfilesPage,
};

const HOF_PAGES: Record<string, React.ComponentType> = {
  "faculty-directory": FacultyDirectoryPage, "faculty-attendance": FacultyAttendanceOverviewPage,
  "substitute-allocation": SubstituteAllocationPage, "faculty-performance": FacultyPerformancePage,
  "leave-management": LeaveManagementPage, timetable: TimetableManagementPage,
  curriculum: CurriculumTrackerPage, "exam-schedule": ExamSchedulePage,
  reports: DepartmentReportsPage, announcements: HofAnnouncementsPage,
  meetings: MeetingSchedulerPage, escalations: StudentEscalationsPage,
  "timetable-drafts": TimetableDraftsPage, workload: FacultyWorkloadPage,
  "subject-allocation": SubjectAllocationPage,
};

const PRINCIPAL_PAGES: Record<string, React.ComponentType> = {
  analytics: PrincipalAnalyticsPage,
  "academic-performance": AcademicPerformancePage,
  "faculty-performance": FacultyPerformancePrincipalPage,
  discipline: StudentDisciplinePage,
  "attendance-trends": AttendanceTrendsPage,
  kpis: PrincipalKpisPage,
  announcements: PrincipalAnnouncementsPage,
  "academic-calendar": AcademicCalendarPage,
  reports: PrincipalReportsPage,
  "substitute-management": SubstituteManagementPage,
  "leave-approval": StaffLeaveApprovalPage,
  noticeboard: NoticeboardPage,
};

const SUPER_ADMIN_PAGES: Record<string, React.ComponentType> = {
  schools: SchoolManagementPage,
  users: UserManagementPage,
  monitor: SystemMonitorPage,
  backup: DatabaseBackupPage,
  "audit-logs": AuditLogsPage,
};

const SCHOOL_ADMIN_PAGES: Record<string, React.ComponentType> = {
  students: SAStudentManagementPage,
  admissions: AdmissionManagementPage,
  teachers: TeacherManagementPage,
  accounts: UserAccountsPage,
  fees: FeeManagementPage,
  certificates: CertificateGeneratorPage,
  timetable: TimetablePublishingPage,
  reports: ReportsPage,
  credentials: CredentialCenterPage,
};

const PAGES: Record<RoleId, Record<string, React.ComponentType>> = {
  student: STUDENT_PAGES,
  faculty: FACULTY_PAGES,
  hof: HOF_PAGES,
  principal: PRINCIPAL_PAGES,
  super_admin: SUPER_ADMIN_PAGES,
  school_admin: SCHOOL_ADMIN_PAGES,
};

function SectionPage() {
  const { role, section } = useParams({ from: "/dashboard/$role/$section" }) as {
    role: RoleId;
    section: string;
  };

  if (section === "profile") return <ProfilePage initialTab="profile" />;
  if (section === "account-settings") return <ProfilePage initialTab="settings" />;
  if (section === "notifications-center") return <NotificationsCenterPage />;
  if (section === "search-results") return <SearchResultsPage />;

  const Comp = PAGES[role]?.[section];
  if (Comp) return <Comp />;

  const title = findNavLabel(role, section);
  return <PlaceholderPage title={title} role={role} />;
}
