# Baptist Academy — School ERP Portal

A luxurious, role-aware School ERP frontend built with **TanStack Start**, **React 19**, **Tailwind v4** and a custom neumorphic / brand-glow design system. Four distinct roles — **Student**, **Faculty**, **Head of Faculty (HOF)** and **Principal** — each get their own navigation, dashboard, and feature set.

> Status: **Frontend 100% complete** · 59/59 pages · Ready for backend integration.

---

## Table of Contents

1. [Project Status](#project-status)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Routing Model](#routing-model)
6. [Design System](#design-system)
7. [Module & Page Inventory](#module--page-inventory)
8. [Component Library](#component-library)
9. [Mock Data Layer](#mock-data-layer)
10. [Responsive & Accessibility](#responsive--accessibility)
11. [Roadmap — Backend Phase](#roadmap--backend-phase)

---

## Project Status

| Module                | Pages   | Completion |
| --------------------- | ------- | ---------- |
| Auth (Login / Signup) | 2 / 2   | ✅ 100%    |
| Student               | 14 / 14 | ✅ 100%    |
| Faculty               | 14 / 14 | ✅ 100%    |
| Head of Faculty       | 13 / 13 | ✅ 100%    |
| Principal             | 18 / 18 | ✅ 100%    |
| Account (shared)      | 2 / 2   | ✅ 100%    |
| Utility (search/notifs/errors) | 5 / 5 | ✅ 100% |
| **Total**             | **68 / 68** | **✅ 100%** |

**Backend**: 0% (all data is mock — see [Roadmap](#roadmap--backend-phase)).

### Latest Milestone
- Built the shared `TimetableGrid` component used by Student, Faculty and HOF.
- Upgraded HOF **Timetable Management** with conflict detection and per-faculty grid switcher.
- Upgraded HOF **Exam Schedule** with inline exam-creation form and month-grouped cards.
- Upgraded Principal **Academic Calendar** to a full 12-month school-year view with category filters.
- Added Student **Timetable** page (daily list + weekly grid).

---

## Tech Stack

| Layer        | Choice                                            |
| ------------ | ------------------------------------------------- |
| Framework    | **TanStack Start v1** (SSR-capable, Vite 7)       |
| UI           | **React 19** + TypeScript (strict)                |
| Styling      | **Tailwind CSS v4** via `@import` in `src/styles.css` |
| Components   | `shadcn/ui` (Radix primitives) + custom design system |
| Icons        | `lucide-react`                                    |
| Animation    | CSS keyframes + framer-motion (where used)        |
| Routing      | File-based routing under `src/routes/`            |
| State        | Local component state + TanStack Query (loader pattern, prepared for backend) |
| Backend      | **Pending** — Lovable Cloud (Supabase) targeted   |

---

## Getting Started

```bash
# Install
bun install

# Dev server
bun dev

# Type-check (also runs automatically in CI)
bunx tsc --noEmit
```

Open the preview, then visit `/login`. Pick any role from the role selector — the demo signs you straight into that role's dashboard.

---

## Project Structure

```
src/
├── routes/                          # File-based routes (TanStack)
│   ├── __root.tsx                   # Root layout + global error boundaries
│   ├── index.tsx                    # Landing → redirects to /login
│   ├── login.tsx, signup.tsx        # Auth screens
│   ├── 403.tsx, 500.tsx             # Branded error pages
│   ├── dashboard.tsx                # Dashboard shell wrapper
│   ├── dashboard.index.tsx          # Auto-redirect to user's role
│   ├── dashboard.$role.index.tsx    # Role home (Student/Faculty/HOF/Principal)
│   └── dashboard.$role.$section.tsx # Section dispatcher (per-page maps)
│
├── components/
│   ├── auth/                        # Login / signup primitives
│   ├── dashboard/
│   │   ├── Shell.tsx                # Sidebar + topbar + mobile drawer
│   │   ├── primitives.tsx           # OverviewCard, Panel, ProgressBar, SectionHeader, BrandButton
│   │   ├── PlaceholderPage.tsx      # Fallback for any unimplemented slug
│   │   ├── PageSkeleton.tsx         # Shimmer skeleton loader
│   │   ├── ProfilePage.tsx          # Shared Profile + Account Settings (tabbed)
│   │   ├── NotificationsCenter.tsx  # Global notifications page
│   │   ├── SearchResultsPage.tsx    # Global search results
│   │   │
│   │   ├── shared/
│   │   │   └── TimetableGrid.tsx    # Reusable weekly grid component
│   │   ├── student/
│   │   │   ├── _shared.tsx          # PageWrap, PageHeader, Card, Chip, Avatar, GhostBtn, BrandBtn
│   │   │   ├── StudentHome.tsx      # Dashboard home
│   │   │   └── *Page.tsx            # 13 individual student pages
│   │   ├── faculty/pages.tsx        # 14 faculty pages (single bundle)
│   │   ├── hof/pages.tsx            # 13 HOF pages (single bundle)
│   │   └── principal/pages.tsx      # 18 principal pages (single bundle)
│   │
│   ├── errors/ErrorPages.tsx        # Branded 403 / 404 / 500 templates
│   └── ui/                          # shadcn/ui primitives
│
├── lib/
│   ├── roles.ts                     # RoleId type, ROLES array
│   ├── dashboard-nav.ts             # Per-role sidebar config + findNavLabel()
│   ├── mock-data.ts                 # Cross-role mock data
│   ├── student-mock.ts              # Student-specific mock data
│   └── utils.ts                     # cn() helper
│
├── styles.css                       # Tailwind v4 entry + design tokens
└── router.tsx                       # TanStack Router bootstrap
```

---

## Routing Model

The portal uses two dynamic params to drive every authenticated page:

```
/dashboard/$role/$section
         │      └── slug (e.g. "marks", "timetable", "exam-schedule")
         └────────── student | faculty | hof | principal
```

- `dashboard.$role.index.tsx` renders the role-specific **home** dashboard.
- `dashboard.$role.$section.tsx` is a **dispatcher**: it looks up the slug in `STUDENT_PAGES`, `FACULTY_PAGES`, `HOF_PAGES`, or `PRINCIPAL_PAGES`. If not found, it falls back to `<PlaceholderPage>`.

Special slugs available to **every** role:

| Slug                  | Page                          |
| --------------------- | ----------------------------- |
| `profile`             | `<ProfilePage initialTab="profile" />` |
| `account-settings`    | `<ProfilePage initialTab="settings" />` |
| `notifications-center`| `<NotificationsCenterPage />` |
| `search-results`      | `<SearchResultsPage />`       |

---

## Design System

All design tokens live in `src/styles.css`:

```
--brand           = primary brand color (indigo #191BDF family)
--brand-light     = surface tint
--brand-dark      = hover state
--bg / --surface  = page + card backgrounds
--ink             = primary text
--border          = neutral border
--font-display    = display headings
--font-dm         = body / UI typography
--shadow-neumorphic-sm / -lg
--shadow-brand-glow / -strong
--shadow-elevated
--ease-premium    = cubic-bezier(0.4, 0, 0.2, 1)
--animate-fade-up / --animate-stagger-in
```

**Rule:** never write raw colors like `text-white` or `bg-black`. Use the tokens (`bg-brand`, `text-ink`, `text-muted-foreground`, `bg-surface`, …) so dark-mode / re-theming stays trivial.

### Brand status colors
- Success `#10B981`, Warning `#F59E0B`, Danger `#EF4444`, Info `#3B82F6`.

### Spacing & radius
- 8px base grid (`p-2 / p-3 / p-4 / p-6`).
- Cards: `rounded-2xl` (mobile) → `rounded-[20px]` (desktop).
- Buttons: `rounded-xl` / `rounded-[12px]`.

---

## Module & Page Inventory

### Auth (2)
`/login`, `/signup`

### Student (14)
Dashboard · Marks & Grades · Assignments · Homework · Study Materials · Progress Report · **Timetable** · Events Calendar · Rank Holders · Attendance · Announcements · Remarks & Conduct · Fee Status · Parent Meeting

### Faculty (14)
Dashboard · Mark Entry · Attendance Management · Homework Allocation · Assignment Manager · Timetable · Rank Computation · Class Reports · Study Material Upload · Announcements · Parent Meeting · Remarks & Conduct · Leave Requests · Events

### Head of Faculty (13)
Dashboard · Faculty Directory · Faculty Attendance · Substitute Allocation · Faculty Performance · Leave Management · **Timetable Management** · Curriculum Tracker · **Exam Schedule** · Department Reports · Announcements · Meeting Scheduler · Student Escalations

### Principal (18)
Dashboard · Student Management · Faculty Management · Admissions · Academic Reports · **Academic Calendar** · Exam Overview · Financial Dashboard · Fee Collection · Fee Defaulters · Substitute Management · Staff Leave Approval · Conduct & Discipline · Announcements · Parent Communication · Noticeboard · Infrastructure Alerts · School Settings

### Account & Utility (shared, 7)
Profile · Account Settings · Notifications Center · Search Results · 403 · 404 · 500

---

## Component Library

### Layout primitives
- **`<Shell>`** (`dashboard/Shell.tsx`) — desktop sidebar, mobile drawer, topbar with global search + notifications popover + profile menu.
- **`<PageWrap>`**, **`<PageHeader>`**, **`<SubHeader>`** — consistent spacing & headings (in `student/_shared.tsx`, used across all roles).
- **`<Card>`** — neumorphic surface, responsive padding.

### Dashboard primitives (`primitives.tsx`)
- **`<OverviewCard>`** — KPI card with icon, value, trend, optional progress + pulse dot.
- **`<SectionHeader>`** — large section title with brand bar accent.
- **`<Panel>`** — softer surface for grouping content.
- **`<ProgressBar>`** — animated horizontal bar.
- **`<BrandButton>`** — primary / ghost CTA.
- **`<StatusBadge>`** — semantic status pill (present, pending, overdue, …).

### Shared widgets
- **`<TimetableGrid>`** (`shared/TimetableGrid.tsx`) — reusable weekly schedule. 6 days × 8 periods, with 5-tone color system (brand / info / warning / success / muted) and optional `onCellClick` for edit mode. Also exports `<TimetableLegend>` and the `DAYS` / `PERIODS` constants.
- **`<PageSkeleton>`** — shimmer loader for any page.
- **`<Avatar>`**, **`<Chip>`**, **`<GhostBtn>`**, **`<BrandBtn>`** — small reusable pieces.

---

## Mock Data Layer

All data lives in two files:

- `src/lib/mock-data.ts` — cross-role data (faculty list, announcements, school stats).
- `src/lib/student-mock.ts` — student-specific (subjects, marks, attendance log, homework).

Each page imports its slice or defines a small in-file array. **No data crosses the network yet** — every page renders synchronously from JS-resident arrays. This is the boundary the backend phase will replace.

---

## Responsive & Accessibility

### Breakpoints (Tailwind)
- `< 640px` mobile — single column, bottom-tab navigation, drawer sidebar.
- `640–1024px` tablet — 2-column grids.
- `≥ 1024px` desktop — sidebar + 3/4-column grids.

### Patterns enforced everywhere
- Horizontal scroll containers (`overflow-x-auto`) with `min-w-[…]` for tables and timetable grid.
- Mobile-first stacked headers (`flex-col sm:flex-row`).
- Touch targets ≥ 40px; primary CTAs ≥ 44px.
- Icon-only buttons carry `aria-label`.
- All interactive elements have visible `:hover` / `:focus-visible` states tied to `--brand` / `--brand-light`.
- Filter chips and tab strips switch to horizontal scroll on small screens.

### Reduced motion
- All transitions use `--ease-premium` with 200–300ms durations.
- Animations are decorative (opacity / translate) — content is fully usable with motion disabled.

---

## Roadmap — Backend Phase

Frontend is feature-complete. The next phase replaces the mock layer with Lovable Cloud:

1. **Enable Lovable Cloud** (auth + Postgres + storage in one click).
2. **Schema**: `users`, `user_roles` (separate table — never store role on user!), `students`, `classes`, `subjects`, `marks`, `attendance`, `assignments`, `homework`, `timetable`, `exams`, `fees`, `announcements`, `events`, `leave_requests`, `meetings`.
3. **Auth**: wire `/login` + `/signup` to Supabase auth, persist session via `client.ts`, attach bearer via `attachSupabaseAuth` middleware.
4. **Server functions**: convert each page's mock array into a `createServerFn` reading the matching table, gated by `requireSupabaseAuth`.
5. **RLS**: every table gets row-level policies using a `has_role()` security-definer function.
6. **File storage**: study-material uploads, assignment submissions, profile avatars → Lovable Cloud Storage.
7. **Notifications**: real notification rows + realtime channel for the topbar bell.

The dispatcher pattern in `dashboard.$role.$section.tsx` means each page can be migrated independently — no rewrite needed.

---

## License

Internal project — Baptist Academy ERP. Not for redistribution.
