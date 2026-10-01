import { useListExams } from "@workspace/api-client-react";
import type { Exam } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar, Users, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  engineering: "Engineering",
  medical: "Medical",
  management: "Management",
  law: "Law",
  design: "Design",
  sciences: "Sciences & Research",
  "civil-services": "Civil Services",
};

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "bg-blue-100 text-blue-700 border-blue-200",
  medical: "bg-red-100 text-red-700 border-red-200",
  management: "bg-amber-100 text-amber-700 border-amber-200",
  law: "bg-emerald-100 text-emerald-700 border-emerald-200",
  design: "bg-purple-100 text-purple-700 border-purple-200",
  sciences: "bg-cyan-100 text-cyan-700 border-cyan-200",
  "civil-services": "bg-orange-100 text-orange-700 border-orange-200",
};

const CATEGORY_BG: Record<string, string> = {
  engineering: "bg-blue-50 border-blue-200",
  medical: "bg-red-50 border-red-200",
  management: "bg-amber-50 border-amber-200",
  law: "bg-emerald-50 border-emerald-200",
  design: "bg-purple-50 border-purple-200",
  sciences: "bg-cyan-50 border-cyan-200",
  "civil-services": "bg-orange-50 border-orange-200",
};

const LEVEL_LABELS: Record<string, string> = {
  ug: "UG",
  pg: "PG",
  both: "UG + PG",
};

const MODE_LABELS: Record<string, string> = {
  online: "Online CBT",
  offline: "Offline / OMR",
  both: "Online + Offline",
};

const FILTERS = [
  { key: "all", label: "All Exams" },
  { key: "engineering", label: "Engineering" },
  { key: "medical", label: "Medical" },
  { key: "management", label: "Management" },
  { key: "law", label: "Law" },
  { key: "design", label: "Design" },
  { key: "sciences", label: "Sciences" },
  { key: "civil-services", label: "Civil Services" },
];

function ExamCard({ exam }: { exam: Exam }) {
  const [expanded, setExpanded] = useState(false);
  const catColor = CATEGORY_COLORS[exam.category] ?? "bg-gray-100 text-gray-600 border-gray-200";
  const catBg = CATEGORY_BG[exam.category] ?? "bg-gray-50 border-gray-200";

  return (
    <div className={`rounded-xl border-2 ${catBg} overflow-hidden transition-shadow hover:shadow-md`}>
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColor}`}>
              {CATEGORY_LABELS[exam.category]}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-white/80 text-slate-600 border-slate-200">
              {LEVEL_LABELS[exam.level] ?? exam.level.toUpperCase()}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-white/80 text-slate-600 border-slate-200">
              {MODE_LABELS[exam.mode] ?? exam.mode}
            </span>
            {exam.frequency === "biannual" && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-200">
                Twice a year
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-0.5">{exam.shortName}</h3>
        <p className="text-sm text-slate-500 mb-3">{exam.name}</p>
        <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">{exam.description}</p>
      </div>

      {/* Dates grid */}
      <div className="mx-5 mb-4 rounded-lg bg-white/60 border border-white/80 p-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <span className="text-slate-400 font-medium uppercase tracking-wide">Applications</span>
          <p className="font-semibold text-slate-800 mt-0.5">{exam.applicationStart} — {exam.applicationEnd}</p>
        </div>
        <div>
          <span className="text-slate-400 font-medium uppercase tracking-wide">Exam Date</span>
          <p className="font-semibold text-slate-800 mt-0.5">{exam.examDate}</p>
        </div>
        <div>
          <span className="text-slate-400 font-medium uppercase tracking-wide">Results</span>
          <p className="font-semibold text-slate-800 mt-0.5">{exam.resultDate}</p>
        </div>
        <div>
          <span className="text-slate-400 font-medium uppercase tracking-wide">Candidates</span>
          <p className="font-semibold text-slate-800 mt-0.5">{exam.candidatesAppearing ?? "—"}</p>
        </div>
      </div>

      {/* Seats */}
      {exam.totalSeats != null && (
        <div className="mx-5 mb-4 flex items-center gap-2 text-sm text-slate-600">
          <Users className="w-4 h-4 shrink-0 text-slate-400" />
          <span><strong className="text-slate-800">{exam.totalSeats.toLocaleString()}</strong> total seats</span>
        </div>
      )}

      {/* Conducting body */}
      <div className="mx-5 mb-4 flex items-start gap-2 text-sm text-slate-600">
        <BookOpen className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
        <span>Conducted by <strong className="text-slate-800">{exam.conductingBody}</strong></span>
      </div>

      {/* Accepted by — expandable */}
      <button
        className="w-full flex items-center justify-between px-5 py-3 border-t border-white/50 text-sm font-medium text-slate-700 hover:bg-white/40 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <span>Accepted by {exam.acceptedBy.length} institution{exam.acceptedBy.length !== 1 ? "s/groups" : ""}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="px-5 pb-4 space-y-1">
          {exam.acceptedBy.map((inst) => (
            <div key={inst} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              {inst}
            </div>
          ))}
          <div className="pt-2">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Eligibility</p>
            <p className="text-xs text-slate-600 leading-relaxed">{exam.eligibility}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 bg-white/40 border-t border-white/50 flex items-center justify-between gap-3">
        <a
          href={exam.conductingBodyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
        >
          {exam.conductingBody.split("(")[0].trim()}
        </a>
        <a
          href={exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Official Website <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function ExamCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-16 rounded-lg" />
      <Skeleton className="h-10 rounded-lg" />
    </div>
  );
}

export default function Exams() {
  const { data: exams, isLoading, error } = useListExams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!exams) return [];
    return exams.filter((e) => {
      const catMatch = activeFilter === "all" || e.category === activeFilter;
      const levelMatch = levelFilter === "all" || e.level === levelFilter || e.level === "both";
      return catMatch && levelMatch;
    });
  }, [exams, activeFilter, levelFilter]);

  const counts = useMemo(() => {
    if (!exams) return {} as Record<string, number>;
    const c: Record<string, number> = { all: exams.length };
    exams.forEach((e) => { c[e.category] = (c[e.category] ?? 0) + 1; });
    return c;
  }, [exams]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-secondary" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Admission Calendar 2025–26</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              Entrance Exam Guide
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Complete calendar of major national entrance examinations — JEE, NEET, CAT, CLAT, GATE, CUET, and more.
              Dates, eligibility, seats, and direct links to official websites.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeFilter === f.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f.label}
              {counts[f.key] != null && (
                <span className={`ml-2 text-xs ${activeFilter === f.key ? "opacity-70" : "text-muted-foreground"}`}>
                  {counts[f.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Level filter + count */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level:</span>
            {(["all", "ug", "pg"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-3 py-1 rounded-md text-sm font-medium border transition-colors ${
                  levelFilter === l
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-background text-muted-foreground border-border hover:border-secondary/40"
                }`}
              >
                {l === "all" ? "All" : l.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{filtered.length}</strong> exam{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-6 text-center text-destructive mb-8">
            Failed to load exam data. Please try refreshing.
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <ExamCardSkeleton key={i} />)
            : filtered.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No exams match this filter</p>
            <p className="text-sm">Try selecting a different category or level.</p>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 rounded-xl bg-muted/50 border border-border p-6">
          <h3 className="font-semibold text-foreground mb-2">Important Notes</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>All dates are approximate for the 2025–26 academic cycle. Verify exact dates on each official website before applying.</li>
            <li>Application fees, syllabus, and reservation policies may change. Always check the latest official notification.</li>
            <li>Government-subsidised institutions (IITs, NITs, IIMs, AIIMS, Central Universities) provide heavily fee-subsidised education.</li>
            <li>SC/ST/OBC/PwD/EWS candidates receive reservation of seats and relaxed eligibility criteria as per Government of India norms.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
