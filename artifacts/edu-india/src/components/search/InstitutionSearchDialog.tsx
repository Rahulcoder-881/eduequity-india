import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useListInstitutions, getListInstitutionsQueryKey } from "@workspace/api-client-react";
import type { Institution } from "@workspace/api-client-react";
import { Search, ExternalLink, MapPin, GraduationCap, X } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  "central-university": "Central University",
  "state-university": "State University",
  iit: "IIT",
  nit: "NIT",
  iim: "IIM",
  aiims: "AIIMS",
  iiit: "IIIT",
  nlaw: "National Law University",
  cfti: "CFTI / Research Institute",
  "deemed-university": "Deemed University",
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
  other: "bg-gray-100 text-gray-600 border-gray-200",
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstitutionSearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();
  const { data: institutions = [] } = useListInstitutions({ query: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000, queryKey: getListInstitutionsQueryKey(), enabled: open } });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return institutions.slice(0, 12);
    const q = query.toLowerCase();
    return institutions
      .filter(
        (inst) =>
          inst.name.toLowerCase().includes(q) ||
          inst.shortName?.toLowerCase().includes(q) ||
          inst.state.toLowerCase().includes(q) ||
          inst.city.toLowerCase().includes(q) ||
          TYPE_LABELS[inst.type]?.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [query, institutions]);

  const handleViewAll = () => {
    onOpenChange(false);
    navigate(`/colleges${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">Search Government Colleges and Universities</DialogTitle>
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, state, city, or type (IIT, NIT, AIIMS...)"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[440px] overflow-y-auto divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No institutions found for "{query}"
            </div>
          ) : (
            filtered.map((inst) => (
              <ResultRow key={inst.id} inst={inst} onClose={() => onOpenChange(false)} />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/40">
          <span className="text-xs text-muted-foreground">
            {query ? `${filtered.length} results` : `${institutions.length} institutions total`}
          </span>
          <button
            onClick={handleViewAll}
            className="text-xs font-semibold text-primary hover:underline underline-offset-2 flex items-center gap-1"
          >
            View all with filters <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResultRow({ inst, onClose }: { inst: Institution; onClose: () => void }) {
  return (
    <a
      href={inst.website}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClose}
      className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
        <GraduationCap className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {inst.shortName ? `${inst.shortName} — ` : ""}{inst.name}
          </span>
          {inst.naacGrade && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full shrink-0">
              NAAC {inst.naacGrade}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${TYPE_COLORS[inst.type] ?? TYPE_COLORS.other}`}>
            {TYPE_LABELS[inst.type]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />{inst.city}, {inst.state}
          </span>
          <span className="text-xs text-muted-foreground">Est. {inst.established}</span>
        </div>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
