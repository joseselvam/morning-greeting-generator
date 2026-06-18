import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
  User, Mail, Phone, MapPin, Calendar, Briefcase, Lock, Bell, Globe, Eye,
  EyeOff, Camera, Check, Shield, Palette, Moon, Sun, Smartphone, AlertTriangle,
} from "lucide-react";

import { PageWrap, PageHeader, SubHeader, Card, Chip, BrandBtn, GhostBtn } from "./student/_shared";
import { ROLE_USERS } from "@/lib/mock-data";
import type { RoleId } from "@/lib/roles";

const ROLE_LABEL: Record<RoleId, string> = {
  super_admin: "Super Admin", school_admin: "School Admin",
  student: "Student", faculty: "Faculty", hof: "Head of Faculty", principal: "Principal",
};

const ROLE_DETAILS: Record<RoleId, { dept: string; id: string; joined: string; phone: string; address: string }> = {
  super_admin: { dept: "System Administration", id: "SA/2024/01", joined: "Jan 2024", phone: "+91 98000 11122", address: "Baptist Academy HQ, Chennai 600028" },
  school_admin: { dept: "School Operations", id: "SCA/2024/01", joined: "Feb 2024", phone: "+91 98000 33344", address: "Baptist Academy Campus, Chennai 600028" },
  student: { dept: "Class 11 — Section A", id: "STU2026/1104", joined: "Jun 2023", phone: "+91 98765 43210", address: "12 Lloyd Road, Chennai 600006" },
  faculty: { dept: "Mathematics Department", id: "FAC/MAT/018", joined: "Aug 2020", phone: "+91 97456 11023", address: "44 Anna Salai, Chennai 600002" },
  hof: { dept: "Sciences Department", id: "HOF/SCI/004", joined: "Mar 2018", phone: "+91 98456 88723", address: "9 Greams Road, Chennai 600006" },
  principal: { dept: "Administration", id: "PRN/2014/01", joined: "Apr 2014", phone: "+91 99876 12340", address: "Baptist Academy Campus, Chennai 600028" },
};


export function ProfilePage({ initialTab }: { initialTab?: "profile" | "settings" } = {}) {
  const { role: roleParam } = useParams({ strict: false }) as { role?: RoleId };
  const role: RoleId = roleParam ?? "student";
  const user = ROLE_USERS[role];
  const details = ROLE_DETAILS[role];
  const [tab, setTab] = useState<"profile" | "security" | "notifications" | "preferences">(initialTab === "settings" ? "security" : "profile");
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Palette },
  ] as const;

  return (
    <PageWrap>
      <PageHeader title="My Account" subtitle="Manage your profile, security and preferences" />

      <Card padded={false}>
        <div className="relative h-24 rounded-t-2xl bg-gradient-to-r from-brand via-[#4A4DFF] to-[#7B7DFF] sm:h-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_60%)]"/>
        </div>
        <div className="relative px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="-mt-10 flex flex-col items-start gap-4 sm:-mt-12 sm:flex-row sm:items-end">
            <div className="relative shrink-0">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-surface text-xl font-bold text-white shadow-lg sm:h-24 sm:w-24 sm:text-2xl"
                style={{ background: "linear-gradient(135deg, #191BDF 0%, #4A4DFF 100%)" }}
              >
                {user.initials}
              </div>
              <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-brand shadow-[var(--shadow-neumorphic-sm)] hover:scale-110">
                <Camera className="h-4 w-4"/>
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-xl font-bold text-ink sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>{user.name}</h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <span className="truncate">{user.sub}</span>
                <Chip color="#191BDF" size="sm">{ROLE_LABEL[role]}</Chip>
                <Chip color="#10B981" size="sm">Active</Chip>
              </div>
            </div>
            <BrandBtn className="w-full sm:w-auto">Edit Profile</BrandBtn>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              tab === t.id
                ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]"
                : "bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"
            }`}>
            <t.icon className="h-3.5 w-3.5"/>{t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <SubHeader title="Personal Information"/>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Full Name"><input defaultValue={user.name} className={inputCls}/></Field>
              <Field label={`${ROLE_LABEL[role]} ID`}><input defaultValue={details.id} readOnly className={`${inputCls} cursor-not-allowed opacity-70`}/></Field>
              <Field label="Email"><input defaultValue={`${user.name.split(" ")[0].toLowerCase()}@baptist.edu.in`} className={inputCls}/></Field>
              <Field label="Phone"><input defaultValue={details.phone} className={inputCls}/></Field>
              <Field label="Date of Birth"><input type="date" defaultValue="2008-05-14" className={inputCls}/></Field>
              <Field label="Joined"><input defaultValue={details.joined} readOnly className={`${inputCls} cursor-not-allowed opacity-70`}/></Field>
              <div className="sm:col-span-2"><Field label="Address"><textarea rows={2} defaultValue={details.address} className={inputCls}/></Field></div>
            </div>
            <div className="mt-4 flex justify-end gap-2"><GhostBtn>Cancel</GhostBtn><BrandBtn icon={Check}>Save Changes</BrandBtn></div>
          </Card>
          <Card>
            <SubHeader title="Quick Info"/>
            <div className="space-y-3">
              <Info icon={Briefcase} label="Department" value={details.dept}/>
              <Info icon={Mail} label="Email" value={`${user.name.split(" ")[0].toLowerCase()}@baptist.edu.in`}/>
              <Info icon={Phone} label="Phone" value={details.phone}/>
              <Info icon={MapPin} label="Address" value={details.address}/>
              <Info icon={Calendar} label="Member Since" value={details.joined}/>
            </div>
          </Card>
        </div>
      )}

      {tab === "security" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <SubHeader title="Change Password" subtitle="Use a strong, unique password"/>
            <PasswordField label="Current Password"/>
            <PasswordField label="New Password"/>
            <PasswordField label="Confirm New Password"/>
            <BrandBtn icon={Check} className="mt-3 w-full">Update Password</BrandBtn>
          </Card>
          <Card>
            <SubHeader title="Account Security"/>
            <div className="space-y-3">
              <ToggleRow icon={Shield} title="Two-factor Authentication" desc="Extra layer of security on login" defaultOn/>
              <ToggleRow icon={Smartphone} title="Login alerts via SMS" desc="Get notified of new sign-ins" defaultOn/>
              <ToggleRow icon={Globe} title="Trusted devices only" desc="Block sign-ins from unknown devices"/>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-bg p-3">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Activity</div>
              <div className="mt-2 space-y-1.5 text-sm">
                <div className="flex justify-between"><span>Chrome · Chennai</span><span className="text-muted-foreground">Now</span></div>
                <div className="flex justify-between"><span>iPhone · Chennai</span><span className="text-muted-foreground">2h ago</span></div>
                <div className="flex justify-between"><span>Chrome · Bengaluru</span><span className="text-muted-foreground">Yesterday</span></div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "notifications" && (
        <Card>
          <SubHeader title="Notification Preferences" subtitle="Choose how you want to be notified"/>
          <div className="space-y-2">
            <ToggleRow icon={Bell} title="Push notifications" desc="Browser & mobile push" defaultOn/>
            <ToggleRow icon={Mail} title="Email notifications" desc={`Updates to ${user.name.split(" ")[0].toLowerCase()}@baptist.edu.in`} defaultOn/>
            <ToggleRow icon={Smartphone} title="SMS alerts" desc="High-priority alerts only"/>
            <ToggleRow icon={Calendar} title="Daily digest" desc="One summary email every morning" defaultOn/>
            <ToggleRow icon={Shield} title="Security alerts" desc="Always on for safety" defaultOn/>
          </div>
        </Card>
      )}

      {tab === "preferences" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <SubHeader title="Appearance"/>
            <div className="grid grid-cols-3 gap-2">
              {[{n:"Light",i:Sun},{n:"Dark",i:Moon},{n:"System",i:Smartphone}].map((t, i) => (
                <button key={t.n} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${i===0?"border-brand bg-brand-light/50":"border-border bg-bg"}`}>
                  <t.i className="h-6 w-6 text-brand"/>
                  <span className="text-sm font-bold text-ink">{t.n}</span>
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <SubHeader title="Language & Region"/>
            <div className="space-y-3">
              <Field label="Language"><select className={inputCls}><option>English (India)</option><option>हिन्दी (Hindi)</option><option>தமிழ் (Tamil)</option></select></Field>
              <Field label="Time Zone"><select className={inputCls}><option>(GMT+05:30) Chennai, Kolkata, New Delhi</option></select></Field>
              <Field label="Date Format"><select className={inputCls}><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></Field>
            </div>
          </Card>
        </div>
      )}

      {/* Danger Zone */}
      <div
        className="rounded-2xl border-l-[3px] border-l-destructive bg-[rgba(239,68,68,0.04)] p-5 shadow-[var(--shadow-neumorphic-sm)]"
      >
        <div className="mb-1 flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>Danger Zone</h3>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Deactivating your account archives all your data. This action cannot be undone.
        </p>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-destructive bg-transparent px-4 py-2.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive/5 sm:w-auto"
        >
          <AlertTriangle className="h-4 w-4" />
          Deactivate Account
        </button>
      </div>
    </PageWrap>
  );
}


const inputCls = "w-full rounded-xl border-[1.5px] border-[rgba(25,27,223,0.12)] bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground shadow-[inset_2px_2px_6px_#d6d4cf,inset_-2px_-2px_6px_#ffffff] transition-all focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/15";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-bg p-3">
      <Icon className="h-4 w-4 mt-0.5 text-brand"/>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-semibold text-ink">{value}</div>
      </div>
    </div>
  );
}
function PasswordField({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-3">
      <Field label={label}>
        <div className="relative">
          <input type={show ? "text" : "password"} className={`${inputCls} pr-10`} placeholder="••••••••"/>
          <button type="button" onClick={()=>setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand">
            {show ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
          </button>
        </div>
      </Field>
    </div>
  );
}
function ToggleRow({ icon: Icon, title, desc, defaultOn }: { icon: any; title: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
      <Icon className="h-5 w-5 text-brand shrink-0"/>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-ink">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button onClick={()=>setOn(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition-all ${on?"bg-brand":"bg-border"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on?"left-5":"left-0.5"}`}/>
      </button>
    </div>
  );
}
