import { Card } from "./student/_shared";

function bar(className = "") {
  return <div className={`h-4 animate-pulse rounded-md bg-gradient-to-r from-bg via-border to-bg bg-[length:200%_100%] ${className}`} style={{ animation: "shimmer 1.6s ease-in-out infinite" }} />;
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 pb-20 md:pb-6">
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-7 w-1 rounded-full bg-brand/30" />
          <div className="space-y-2">
            {bar("w-56 h-8")}
            {bar("w-40 h-3")}
          </div>
        </div>
        {bar("w-32 h-10 rounded-xl")}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <div className="space-y-3">
              {bar("w-10 h-10 rounded-xl")}
              {bar("w-20 h-3")}
              {bar("w-16 h-6")}
            </div>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            {bar("w-40 h-5")}
            {bar("w-full h-48 rounded-xl")}
            <div className="grid grid-cols-3 gap-2">
              {bar("h-3")}{bar("h-3")}{bar("h-3")}
            </div>
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            {bar("w-32 h-5")}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-border" />
                <div className="flex-1 space-y-1.5">
                  {bar("w-3/4 h-3")}
                  {bar("w-1/2 h-2.5")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
