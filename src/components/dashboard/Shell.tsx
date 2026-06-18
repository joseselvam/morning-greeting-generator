import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import {
  GraduationCap, PanelLeftClose, PanelLeftOpen, ChevronDown, ChevronRight,
  Bell, Calendar as CalendarIcon, HelpCircle, Search, LogOut, Settings, User, RefreshCw, Menu, X, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { NAV_CONFIG, findNavLabel } from "@/lib/dashboard-nav";
import { ROLE_USERS, NOTIFICATIONS } from "@/lib/mock-data";
import { clearSession, getSession } from "@/lib/auth-helpers";
import type { RoleId } from "@/lib/roles";

const ROLE_TITLE: Record<RoleId, string> = {
  super_admin: "Super Admin",
  school_admin: "School Admin",
  student: "Student",
  faculty: "Faculty",
  hof: "Head of Faculty",
  principal: "Principal",
};


export function DashboardShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { role?: RoleId; section?: string };
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const [role, setRole] = useState<RoleId | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({ to: "/login" });
      return;
    }
    setRole(params.role ?? s.role);
  }, [navigate, params.role]);

  useEffect(() => { setMobileOpen(false); setNotifOpen(false); setProfileOpen(false); }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (!role) return null;

  const currentSection = params.section ?? "";
  const pageLabel = findNavLabel(role, currentSection);
  const user = ROLE_USERS[role];
  const sidebarWidth = collapsed ? 72 : 260;

  function logout() {
    clearSession();
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
        currentSection={currentSection}
        user={user}
        onLogout={logout}
      />

      {/* Topbar */}
      <header
        className="fixed top-0 right-0 z-30 h-14 transition-[left,padding] duration-300 ease-[var(--ease-premium)] md:h-16 lg:h-[68px]"
        style={{
          left: 0,
          background: "rgba(248,247,244,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(229,228,224,0.8)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        }}
      >
        <div
          className="flex h-full items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:px-6"
          style={{ paddingLeft: undefined }}
        >
          {/* spacer for sidebar on md+ */}
          <div
            className="hidden shrink-0 md:block"
            style={{ width: sidebarWidth, transition: "width 300ms var(--ease-premium)" }}
          />
          {/* Left */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg shadow-[var(--shadow-neumorphic-sm)] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-ink" />
            </button>
            <div className="min-w-0 flex-1">
              <nav className="hidden items-center gap-1.5 font-[family-name:var(--font-dm)] text-[12px] text-muted-foreground md:flex">
                <span>Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-semibold text-brand">{pageLabel}</span>
              </nav>
              <h1
                className="truncate text-base font-bold leading-tight text-ink sm:text-lg lg:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pageLabel}
              </h1>
            </div>
          </div>

          {/* Center search */}
          <div className="relative hidden lg:block">
            <div
              className="flex h-10 w-[260px] items-center gap-2 rounded-full px-4 xl:w-[320px]"
              style={{ background: "#F8F7F4", boxShadow: "var(--shadow-neumorphic-inset)" }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-muted-foreground focus:outline-none"
                placeholder="Search students, reports..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value;
                    navigate({ to: "/dashboard/$role/$section", params: { role, section: "search-results" }, search: { q } as any });
                  }
                }}
              />
              <span
                className="rounded-md bg-bg px-1.5 py-0.5 font-[family-name:var(--font-dm)] text-[10px] font-bold text-muted-foreground shadow-[var(--shadow-neumorphic-sm)]"
              >⌘K</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="lg:hidden">
              <TopIconBtn icon={Search} label="Search" onClick={() => navigate({ to: "/dashboard/$role/$section", params: { role, section: "search-results" } })} />
            </div>
            <div className="hidden sm:block">
              <TopIconBtn icon={CalendarIcon} label="Calendar" onClick={() => toast("Academic calendar")} />
            </div>
            <div className="relative">
              <TopIconBtn icon={Bell} label="Notifications" onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }} dot />
              {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} onViewAll={() => { setNotifOpen(false); navigate({ to: "/dashboard/$role/$section", params: { role, section: "notifications-center" } }); }} />}
            </div>
            <div className="hidden md:block">
              <TopIconBtn icon={HelpCircle} label="Help" onClick={() => toast("Help center")} />
            </div>
            <div className="relative">
              <button
                onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
                className="flex h-9 w-9 items-center justify-center rounded-full font-[family-name:var(--font-dm)] text-[12px] font-bold text-white shadow-[var(--shadow-neumorphic-sm)] transition-transform hover:scale-[1.05]"
                style={{ background: "linear-gradient(135deg, #191BDF 0%, #4A4DFF 100%)" }}
                aria-label="Profile"
              >
                {user.initials}
              </button>
              {profileOpen && (
                <div
                  className="fixed right-3 top-[60px] z-50 w-56 overflow-hidden rounded-2xl border border-[rgba(229,228,224,0.8)] bg-surface p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:absolute sm:right-0 sm:top-12"
                  style={{ animation: "var(--animate-stagger-in)" }}
                >
                  <div className="border-b border-border px-3 py-2">
                    <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{user.name}</div>
                    <div className="text-[11px] text-muted-foreground">{user.sub}</div>
                  </div>
                  <ProfileItem icon={User} label="My Profile" onClick={() => navigate({ to: "/dashboard/$role/$section", params: { role, section: "profile" } })} />
                  <ProfileItem icon={Settings} label="Settings" onClick={() => navigate({ to: "/dashboard/$role/$section", params: { role, section: "account-settings" } })} />
                  <ProfileItem icon={RefreshCw} label="Switch Role" onClick={() => navigate({ to: "/login" })} />
                  <div className="my-1 h-px bg-border" />
                  <ProfileItem icon={LogOut} label="Sign Out" danger onClick={logout} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main
        className="pt-14 transition-[padding-left] duration-300 ease-[var(--ease-premium)] md:pt-16 md:pl-[var(--sb,260px)] lg:pt-[68px]"
        style={{ ["--sb" as never]: `${sidebarWidth}px` }}
      >
        <div
          className="mx-auto max-w-[1400px] px-3 py-4 xs:px-4 sm:px-5 sm:py-6 md:px-6 md:py-8 lg:px-8"
          style={{ animation: "var(--animate-fade-up)" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

/* ============ Sidebar ============ */
function Sidebar({
  role, collapsed, setCollapsed, mobileOpen, closeMobile, currentSection, user, onLogout,
}: {
  role: RoleId;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  closeMobile: () => void;
  currentSection: string;
  user: { name: string; sub: string; initials: string };
  onLogout: () => void;
}) {
  const width = collapsed ? 72 : 260;
  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen flex-col bg-bg transition-all duration-300 ease-[var(--ease-premium)] ${
        mobileOpen ? "flex" : "hidden md:flex"
      }`}
      style={{
        width: mobileOpen ? 280 : width,
        boxShadow: "8px 0 24px rgba(0,0,0,0.06)",
        borderRight: "1px solid rgba(229,228,224,0.6)",
      }}
    >
      {/* Logo */}
      <div className="relative flex h-[68px] items-center gap-3 border-b border-border px-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "linear-gradient(135deg, #191BDF 0%, #4A4DFF 100%)", boxShadow: "var(--shadow-brand-glow)" }}
        >
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="min-w-0">
            <div
              className="truncate text-[16px] font-bold leading-tight text-brand"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Baptist Academy
            </div>
            <div
              className="font-[family-name:var(--font-dm)] text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
            >
              ERP Portal
            </div>
          </div>
        )}
        {mobileOpen && (
          <button
            onClick={closeMobile}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-bg shadow-[var(--shadow-neumorphic-sm)] md:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-[72px] hidden h-8 w-8 items-center justify-center rounded-full bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] transition-all hover:scale-110 hover:text-brand md:flex"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* User card */}
      {(!collapsed || mobileOpen) && (
        <div className="mx-3 mt-4 rounded-2xl bg-bg p-3 shadow-[var(--shadow-neumorphic-sm)]">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-dm)] text-[14px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #191BDF 0%, #4A4DFF 100%)" }}
            >
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-ink" style={{ fontFamily: "Inter" }}>
                {user.name}
              </div>
              <span className="mt-0.5 inline-block rounded-full bg-brand-light px-2 py-0.5 font-[family-name:var(--font-dm)] text-[10px] font-bold text-brand">
                {ROLE_TITLE[role]}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
        {NAV_CONFIG[role].map((section, si) => (
          <div key={section.title} className={si > 0 ? "mt-5" : ""}>
            {(!collapsed || mobileOpen) && (
              <div className="mb-2 border-t border-border/60 pt-3 font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = currentSection === item.slug;
                const to = item.slug
                  ? `/dashboard/${role}/${item.slug}`
                  : `/dashboard/${role}`;
                return (
                  <Link
                    key={item.label}
                    to={to}
                    className={`group relative flex h-11 items-center gap-3 rounded-xl px-3 font-[family-name:var(--font-dm)] text-[13px] font-semibold transition-all duration-200 ease-[var(--ease-premium)] ${
                      active
                        ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]"
                        : "text-muted-foreground hover:translate-x-[3px] hover:bg-brand-light hover:text-brand"
                    }`}
                    title={collapsed && !mobileOpen ? item.label : undefined}
                  >
                    {active && <span className="absolute left-0 h-5 w-[3px] rounded-r bg-white" />}
                    <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
                    {(!collapsed || mobileOpen) && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 font-[family-name:var(--font-dm)] text-[10px] font-bold ${
                              active ? "bg-white/25 text-white" : "bg-danger text-white"
                            }`}
                            style={!active ? { background: "#EF4444", color: "white" } : undefined}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border px-3 py-3">
        <button
          onClick={onLogout}
          className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 font-[family-name:var(--font-dm)] text-[13px] font-semibold text-muted-foreground transition-all hover:bg-[rgba(239,68,68,0.1)] hover:text-[#DC2626] ${
            collapsed && !mobileOpen ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-[18px] w-[18px]" />
          {(!collapsed || mobileOpen) && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

function TopIconBtn({
  icon: Icon, onClick, label, dot,
}: { icon: typeof Bell; onClick?: () => void; label: string; dot?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bg text-ink shadow-[var(--shadow-neumorphic-sm)] transition-all duration-200 hover:text-brand"
    >
      <Icon className="h-[18px] w-[18px]" />
      {dot && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: "#EF4444", boxShadow: "0 0 0 2px #F8F7F4" }} />
      )}
    </button>
  );
}

function ProfileItem({
  icon: Icon, label, danger, onClick,
}: { icon: typeof User; label: string; danger?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 font-[family-name:var(--font-dm)] text-[13px] font-semibold transition-colors ${
        danger ? "text-[#DC2626] hover:bg-[rgba(239,68,68,0.1)]" : "text-ink hover:bg-brand-light hover:text-brand"
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function NotificationPanel({ onClose, onViewAll }: { onClose: () => void; onViewAll?: () => void }) {
  const color: Record<string, string> = { brand: "#191BDF", success: "#10B981", warning: "#F59E0B", info: "#3B82F6" };
  return (
    <div
      className="fixed left-3 right-3 top-[60px] z-50 max-h-[70vh] overflow-hidden rounded-2xl border border-[rgba(229,228,224,0.8)] shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[380px] sm:max-h-[500px]"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "var(--animate-stagger-in)",
      }}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="text-[18px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>Notifications</div>
        <button onClick={() => { toast.success("All marked as read"); onClose(); }} className="text-[13px] font-medium text-brand hover:underline">
          Mark all read
        </button>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        {NOTIFICATIONS.map((n, i) => (
          <div key={i} className="relative flex items-start gap-3 border-b border-border px-5 py-3 transition-colors hover:bg-brand-light/40">
            {n.unread && <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand" />}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: `${color[n.color]}1A`, color: color[n.color] }}
            >
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{n.title}</div>
              <div className="truncate text-[12px] text-muted-foreground">{n.subtitle}</div>
            </div>
            <div className="text-[11px] text-muted-foreground">{n.time}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-3 text-center">
        <button onClick={onViewAll} className="text-[13px] font-semibold text-brand hover:underline">View all notifications</button>
      </div>
    </div>
  );
}
