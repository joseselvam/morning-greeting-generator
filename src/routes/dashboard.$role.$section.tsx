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

// Faculty
import {
  MarkEntryPage, FacultyAttendancePage, FacultyHomeworkPage, FacultyAssignmentsPage,
  FacultyTimetablePage, RankComputationPage, FacultyReportsPage, FacultyStudyMaterialsPage,
  FacultyAnnouncementsPage, FacultyParentMeetingPage, FacultyRemarksPage,
  FacultyLeaveRequestsPage, FacultyEventsPage,
} from "@/components/dashboard/faculty/pages";

// HOF
import {
  FacultyDirectoryPage, FacultyAttendanceOverviewPage, SubstituteAllocationPage,
  FacultyPerformancePage, LeaveManagementPage, TimetableManagementPage,
  CurriculumTrackerPage, ExamSchedulePage, DepartmentReportsPage,
  HofAnnouncementsPage, MeetingSchedulerPage, StudentEscalationsPage,
} from "@/components/dashboard/hof/pages";

// Principal
import {
  StudentManagementPage, PrincipalFacultyManagementPage, AdmissionsPage,
  AcademicReportsPage, AcademicCalendarPage, ExamOverviewPage,
  FinancialDashboardPage, FeeCollectionPage, FeeDefaultersPage,
  SubstituteManagementPage, StaffLeaveApprovalPage, ConductPage,
  PrincipalAnnouncementsPage, ParentCommunicationPage, NoticeboardPage,
  InfrastructurePage, SchoolSettingsPage,
} from "@/components/dashboard/principal/pages";

import { ProfilePage } from "@/components/dashboard/ProfilePage";
import { NotificationsCenterPage } from "@/components/dashboard/NotificationsCenter";
import { SearchResultsPage } from "@/components/dashboard/SearchResultsPage";

export const Route = createFileRoute("/dashboard/$role/$section")({
  component: SectionPage,
});

const STUDENT_PAGES: Record<string, React.ComponentType> = {
  marks: MarksPage,
  attendance: AttendancePage,
  assignments: AssignmentsPage,
  homework: HomeworkPage,
  "rank-holders": RankHoldersPage,
  progress: ProgressPage,
  "study-materials": StudyMaterialsPage,
  "fee-status": FeeStatusPage,
  remarks: RemarksPage,
  events: EventsPage,
  announcements: AnnouncementsPage,
  "parent-meeting": ParentMeetingPage,
  timetable: StudentTimetablePage,
};

const FACULTY_PAGES: Record<string, React.ComponentType> = {
  "mark-entry": MarkEntryPage,
  attendance: FacultyAttendancePage,
  homework: FacultyHomeworkPage,
  assignments: FacultyAssignmentsPage,
  timetable: FacultyTimetablePage,
  "rank-computation": RankComputationPage,
  reports: FacultyReportsPage,
  "study-materials": FacultyStudyMaterialsPage,
  announcements: FacultyAnnouncementsPage,
  "parent-meeting": FacultyParentMeetingPage,
  remarks: FacultyRemarksPage,
  "leave-requests": FacultyLeaveRequestsPage,
  events: FacultyEventsPage,
};

const HOF_PAGES: Record<string, React.ComponentType> = {
  "faculty-directory": FacultyDirectoryPage,
  "faculty-attendance": FacultyAttendanceOverviewPage,
  "substitute-allocation": SubstituteAllocationPage,
  "faculty-performance": FacultyPerformancePage,
  "leave-management": LeaveManagementPage,
  timetable: TimetableManagementPage,
  curriculum: CurriculumTrackerPage,
  "exam-schedule": ExamSchedulePage,
  reports: DepartmentReportsPage,
  announcements: HofAnnouncementsPage,
  meetings: MeetingSchedulerPage,
  escalations: StudentEscalationsPage,
};

const PRINCIPAL_PAGES: Record<string, React.ComponentType> = {
  "student-management": StudentManagementPage,
  "faculty-management": PrincipalFacultyManagementPage,
  admissions: AdmissionsPage,
  "academic-reports": AcademicReportsPage,
  "academic-calendar": AcademicCalendarPage,
  "exam-overview": ExamOverviewPage,
  "financial-dashboard": FinancialDashboardPage,
  "fee-collection": FeeCollectionPage,
  "fee-defaulters": FeeDefaultersPage,
  "substitute-management": SubstituteManagementPage,
  "leave-approval": StaffLeaveApprovalPage,
  conduct: ConductPage,
  announcements: PrincipalAnnouncementsPage,
  "parent-communication": ParentCommunicationPage,
  noticeboard: NoticeboardPage,
  infrastructure: InfrastructurePage,
  settings: SchoolSettingsPage,
};

const PAGES: Record<RoleId, Record<string, React.ComponentType>> = {
  student: STUDENT_PAGES,
  faculty: FACULTY_PAGES,
  hof: HOF_PAGES,
  principal: PRINCIPAL_PAGES,
};

function SectionPage() {
  const { role, section } = useParams({ from: "/dashboard/$role/$section" }) as {
    role: RoleId;
    section: string;
  };

  // Profile & Settings are available to all roles
  if (section === "profile") return <ProfilePage initialTab="profile" />;
  if (section === "account-settings") return <ProfilePage initialTab="settings" />;
  if (section === "notifications-center") return <NotificationsCenterPage />;
  if (section === "search-results") return <SearchResultsPage />;

  const Comp = PAGES[role]?.[section];
  if (Comp) return <Comp />;

  const title = findNavLabel(role, section);
  return <PlaceholderPage title={title} role={role} />;
}
