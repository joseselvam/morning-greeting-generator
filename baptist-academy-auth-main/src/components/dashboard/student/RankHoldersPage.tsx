import { Crown, Medal, Trophy, Star } from "lucide-react";
import { Avatar, Card, Chip, PageHeader, PageWrap, SubHeader } from "./_shared";
import { LEADERBOARD, MARKS, SUBJECTS, STUDENT, gradeStyle } from "@/lib/student-mock";

export function RankHoldersPage() {
  const top3 = LEADERBOARD.slice(0, 3);

  return (
    <PageWrap>
      <PageHeader
        title="Rank Holders"
        subtitle="Class leaderboard and subject toppers"
        right={
          <select className="rounded-xl border border-border bg-bg px-3 py-2 text-[12px] font-semibold shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none">
            <option>Class 10 — Section A</option><option>Class 10 — Section B</option>
          </select>
        }
      />

      {/* Podium */}
      <Card className="rounded-3xl !p-6 sm:!p-8" style={{ background: "linear-gradient(180deg, #fff, var(--color-brand-light))" }}>
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
          {/* 2nd */}
          <PodiumColumn person={top3[1]} place={2} ringColor="#9CA3AF" baseHeight={70} accent={<Medal className="h-6 w-6" style={{ color: "#9CA3AF" }} />} />
          {/* 1st */}
          <PodiumColumn person={top3[0]} place={1} ringColor="#F59E0B" baseHeight={100} highlight
            accent={<><Crown className="absolute -top-8 left-1/2 h-6 w-6 -translate-x-1/2" style={{ color: "#F59E0B" }} /><Trophy className="h-7 w-7" style={{ color: "#F59E0B" }} /></>}
          />
          {/* 3rd */}
          <PodiumColumn person={top3[2]} place={3} ringColor="#CD7C2F" baseHeight={50} accent={<Medal className="h-6 w-6" style={{ color: "#CD7C2F" }} />} />
        </div>
      </Card>

      {/* Leaderboard */}
      <Card padded={false}>
        <div className="flex items-center justify-between p-5">
          <SubHeader title="Class Leaderboard" />
          <select className="rounded-xl border border-border bg-bg px-3 py-2 text-[12px] font-semibold shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none">
            <option>Half Yearly</option><option>Mid Term</option><option>Annual</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="sticky top-0">
              <tr className="border-b-2 border-border bg-bg">
                {["Rank", "Student", "Total", "Average %", "Grade", "Attendance"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map((r) => {
                const gs = gradeStyle(r.grade);
                const rowStyle = r.you
                  ? { background: "rgba(25,27,223,0.05)", borderLeft: "3px solid #191BDF", borderRight: "3px solid #191BDF" }
                  : r.rank <= 3
                    ? { borderLeft: `2px solid ${r.rank === 1 ? "#F59E0B" : r.rank === 2 ? "#9CA3AF" : "#CD7C2F"}` }
                    : undefined;
                return (
                  <tr key={r.rank} className="border-b border-[rgba(229,228,224,0.4)]" style={rowStyle}>
                    <td className="px-4 py-3 sm:px-5">
                      {r.rank <= 3 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Trophy className="h-4 w-4" style={{ color: r.rank === 1 ? "#F59E0B" : r.rank === 2 ? "#9CA3AF" : "#CD7C2F" }} />
                          <span className="font-bold text-ink">#{r.rank}</span>
                        </span>
                      ) : (
                        <span className={`font-[family-name:var(--font-dm)] font-bold ${r.rank <= 10 ? "text-brand" : "text-muted-foreground"}`}>#{r.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.name} />
                        <div>
                          <div className="text-[13px] font-semibold text-ink">{r.name}{r.you && <Chip color="#191BDF" bg="var(--color-brand-light)" size="sm" className="ml-2">(You)</Chip>}</div>
                          <div className="text-[11px] text-muted-foreground">{r.reg}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-bold text-ink sm:px-5">{r.total}</td>
                    <td className="px-4 py-3 text-[13px] text-ink sm:px-5">{r.pct}%</td>
                    <td className="px-4 py-3 sm:px-5"><Chip color={gs.fg} bg={gs.bg} size="sm">{r.grade}</Chip></td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground sm:px-5">{r.attendance}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Subject toppers */}
      <div>
        <SubHeader title="Subject Toppers" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
          {SUBJECTS.map((s, i) => {
            const name = i === 0 ? STUDENT.name : ["Priya Iyer", "Karan Mehta", "Aisha Khan", "Sneha Pillai", "Tara Joseph"][i - 1] ?? "Priya Iyer";
            const score = MARKS["Half Yearly"][s.key];
            const isMe = name === STUDENT.name;
            return (
              <Card key={s.key} className={`text-center ${isMe ? "!border-2 !border-brand" : ""}`} style={{ background: isMe ? "rgba(25,27,223,0.04)" : undefined }}>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full" style={{ background: s.bg }}>
                  <s.icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <div className="mt-2 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{s.name}</div>
                <div className="mt-1 text-[14px] font-semibold text-ink">{name}{isMe && <Chip color="#191BDF" bg="var(--color-brand-light)" size="sm" className="ml-1">You</Chip>}</div>
                <div className="mt-1 flex items-center justify-center gap-1 text-[18px] font-extrabold" style={{ fontFamily: "var(--font-display)", color: s.color }}>
                  {score} {score >= 95 && <Star className="h-3.5 w-3.5" style={{ color: "#F59E0B" }} />}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageWrap>
  );
}

function PodiumColumn({ person, place, ringColor, baseHeight, accent, highlight }: { person: typeof LEADERBOARD[number]; place: 1 | 2 | 3; ringColor: string; baseHeight: number; accent: React.ReactNode; highlight?: boolean }) {
  const size = highlight ? 96 : 72;
  return (
    <div className={`flex flex-col items-center ${highlight ? "order-first md:order-none" : place === 2 ? "md:order-first" : ""}`}>
      <div className="relative mb-2">{accent}</div>
      <div
        className="relative flex items-center justify-center rounded-full text-white"
        style={{
          width: size, height: size,
          background: "linear-gradient(180deg, #191BDF, #1316B0)",
          boxShadow: `0 0 0 3px ${ringColor}, 0 0 0 7px ${highlight ? "rgba(245,158,11,0.18)" : "transparent"}, 0 10px 30px rgba(25,27,223,0.25)`,
          fontFamily: "var(--font-display)", fontSize: highlight ? 28 : 22, fontWeight: 800,
        }}
      >
        {person.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
      </div>
      <div className="mt-3 text-center">
        <div className="text-[16px] font-bold text-ink sm:text-[18px]" style={{ fontFamily: "var(--font-display)" }}>{person.name}{person.you && <Chip color="#191BDF" bg="var(--color-brand-light)" size="sm" className="ml-2">You</Chip>}</div>
        <div className="text-[11px] text-muted-foreground">Class 10 · {person.reg}</div>
        <div className="mt-1 font-[family-name:var(--font-dm)] text-[15px] font-bold text-brand">{person.total} marks · {person.pct}%</div>
      </div>
      <div
        className="mt-4 flex w-full max-w-[200px] items-center justify-center rounded-t-xl font-[family-name:var(--font-dm)] text-[14px] font-bold text-white"
        style={{ height: baseHeight, background: place === 1 ? "#191BDF" : place === 2 ? "#9CA3AF" : "#CD7C2F" }}
      >
        {place === 1 ? "1st" : place === 2 ? "2nd" : "3rd"}
      </div>
    </div>
  );
}
