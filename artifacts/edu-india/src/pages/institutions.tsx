import { useListInstitutions, getListInstitutionsQueryKey } from "@workspace/api-client-react";
import type { Institution } from "@workspace/api-client-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearch } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, MapPin, GraduationCap, BookOpen, X, Calendar, Award, ChevronDown } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  "central-university": "Central University",
  "state-university": "State University",
  iit: "IIT",
  nit: "NIT",
  iim: "IIM",
  aiims: "AIIMS",
  iiit: "IIIT",
  nlaw: "National Law University",
  cfti: "CFTI / Research",
  "deemed-university": "Deemed University",
  "du-college": "Delhi University College",
  "mu-college": "Mumbai University College",
  "sppu-college": "Pune University College",
  other: "Other",
};

const TYPE_COLORS: Record<string, string> = {
  iit: "bg-blue-100 text-blue-700 border-blue-200",
  nit: "bg-indigo-100 text-indigo-700 border-indigo-200",
  iim: "bg-amber-100 text-amber-700 border-amber-200",
  aiims: "bg-red-100 text-red-700 border-red-200",
  iiit: "bg-purple-100 text-purple-700 border-purple-200",
  nlaw: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "central-university": "bg-orange-100 text-orange-700 border-orange-200",
  "state-university": "bg-teal-100 text-teal-700 border-teal-200",
  cfti: "bg-pink-100 text-pink-700 border-pink-200",
  "deemed-university": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "du-college": "bg-rose-100 text-rose-700 border-rose-200",
  "mu-college": "bg-violet-100 text-violet-700 border-violet-200",
  "sppu-college": "bg-lime-100 text-lime-700 border-lime-200",
  other: "bg-gray-100 text-gray-600 border-gray-200",
};

const NAAC_COLORS: Record<string, string> = {
  "A++": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "A+": "text-green-700 bg-green-50 border-green-200",
  "A": "text-lime-700 bg-lime-50 border-lime-200",
  "B++": "text-amber-700 bg-amber-50 border-amber-200",
  "B+": "text-yellow-700 bg-yellow-50 border-yellow-200",
};

const TYPE_FILTER_GROUPS = [
  { key: "all", label: "All Institutions" },
  { key: "iit", label: "IITs" },
  { key: "nit", label: "NITs" },
  { key: "iim", label: "IIMs" },
  { key: "aiims", label: "AIIMS" },
  { key: "iiit", label: "IIITs" },
  { key: "nlaw", label: "Law Universities" },
  { key: "central-university", label: "Central Universities" },
  { key: "state-university", label: "State Universities" },
  { key: "cfti", label: "Research Institutes" },
  { key: "du-college", label: "DU Colleges" },
  { key: "mu-college", label: "MU Colleges" },
  { key: "sppu-college", label: "Pune University Colleges" },
];

const PAGE_SIZE = 18;

function InstitutionCard({ inst }: { inst: Institution }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all flex flex-col h-full group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${TYPE_COLORS[inst.type] ?? TYPE_COLORS.other}`}>
              {TYPE_LABELS[inst.type]}
            </span>
            {inst.naacGrade && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${NAAC_COLORS[inst.naacGrade] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                NAAC {inst.naacGrade}
              </span>
            )}
            {inst.nirfRank && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-primary/5 text-primary border-primary/20">
                NIRF #{inst.nirfRank}
              </span>
            )}
          </div>
          <h3 className="font-bold text-foreground leading-tight text-sm group-hover:text-primary transition-colors">
            {inst.name}
          </h3>
          {inst.shortName && (
            <span className="text-xs text-muted-foreground font-medium">{inst.shortName}</span>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{inst.city}, {inst.state}</span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Est. {inst.established}</span>
        <span className="flex items-center gap-1"><Award className="w-3 h-3" />{inst.affiliation}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-3">
        {inst.description}
      </p>

      {/* Courses */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {inst.courses.slice(0, 5).map((c) => (
          <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {c}
          </span>
        ))}
        {inst.courses.length > 5 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            +{inst.courses.length - 5} more
          </span>
        )}
      </div>

      {/* Footer */}
      <a
        href={inst.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-2 mt-auto"
      >
        <ExternalLink className="w-3 h-3" /> Visit Official Website
      </a>
    </div>
  );
}

export default function Institutions() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialQ = params.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [typeFilter, setTypeFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data: institutions = [], isLoading } = useListInstitutions({ query: { staleTime: 5 * 60 * 1000, queryKey: getListInstitutionsQueryKey() } });

  useEffect(() => {
    setPage(1);
  }, [query, typeFilter, stateFilter]);

  const allStates = useMemo(
    () => ["all", ...Array.from(new Set(institutions.map((i) => i.state))).sort()],
    [institutions]
  );

  const filtered = useMemo(() => {
    let result = institutions;
    if (typeFilter !== "all") result = result.filter((i) => i.type === typeFilter);
    if (stateFilter !== "all") result = result.filter((i) => i.state === stateFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.shortName?.toLowerCase().includes(q) ||
          i.state.toLowerCase().includes(q) ||
          i.city.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.courses.some((c) => c.toLowerCase().includes(q)) ||
          TYPE_LABELS[i.type]?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [institutions, query, typeFilter, stateFilter]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
          Government Colleges &amp; Universities
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Searchable directory of India's premier institutions — IITs, NITs, IIMs, AIIMS, Central &amp; State Universities, DU, MU, Pune University colleges, and more. All entries are UGC/MHRD-recognized or government-established.
        </p>
      </div>

      {/* Search bar — always visible, prominent */}
      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city, state, course, or type (IIT, NIT, AIIMS, MBA...)..."
          className="w-full pl-12 pr-10 py-3.5 rounded-xl border-2 border-primary/30 bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-base shadow-sm transition-colors"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Type filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TYPE_FILTER_GROUPS.map((f) => (
          <button
            key={f.key}
            onClick={() => setTypeFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              typeFilter === f.key
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* State filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="pl-3 pr-8 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground outline-none appearance-none hover:border-primary/40 cursor-pointer"
          >
            {allStates.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All States & UTs" : s}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        </div>

        {/* Results count */}
        <span className="text-sm text-muted-foreground">
          <strong className="text-foreground">{filtered.length}</strong> institutions found
          {query && <span> for "<em>{query}</em>"</span>}
        </span>

        {/* Clear filters */}
        {(query || typeFilter !== "all" || stateFilter !== "all") && (
          <button
            onClick={() => { setQuery(""); setTypeFilter("all"); setStateFilter("all"); }}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 underline underline-offset-2"
          >
            <X className="w-3 h-3" /> Clear all filters
          </button>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <GraduationCap className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-2">No institutions found</h3>
          <p className="text-sm text-muted-foreground">Try a different search term or remove filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginated.map((inst) => (
              <InstitutionCard key={inst.id} inst={inst} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-8 py-2.5 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Load more ({filtered.length - paginated.length} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* Source note */}
      <p className="text-xs text-muted-foreground text-center mt-10 pt-6 border-t border-border">
        Sources: UGC, Ministry of Education, NIRF 2023, NAAC, and current institution directories. This directory is a curated 2024-25 snapshot; for admissions, accreditation, and courses, always verify the institution's official website.
      </p>
    </div>
  );
}
