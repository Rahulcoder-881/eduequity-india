import { useGetStateStats } from "@workspace/api-client-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, TrendingDown, TrendingUp, BookOpen, Users } from "lucide-react";
import type { StateEducationStat } from "@workspace/api-client-react";

const GEO_URL = `${import.meta.env.BASE_URL}india-states.json`;

const METRICS = [
  {
    key: "dropoutRate" as const,
    label: "Dropout Rate",
    unit: "%",
    desc: "Elementary dropout rate (Classes I–VIII). Lower = better.",
    domain: [3, 22] as [number, number],
    colors: ["#16a34a", "#84cc16", "#eab308", "#f97316", "#dc2626"],
    inverse: true,
  },
  {
    key: "secondaryGer" as const,
    label: "Secondary GER",
    unit: "%",
    desc: "Secondary Gross Enrollment Ratio. Higher = better.",
    domain: [40, 99] as [number, number],
    colors: ["#dc2626", "#f97316", "#eab308", "#84cc16", "#16a34a"],
    inverse: false,
  },
  {
    key: "literacyRate" as const,
    label: "Literacy Rate",
    unit: "%",
    desc: "Overall literacy rate (Census / NFHS-5). Higher = better.",
    domain: [63, 97] as [number, number],
    colors: ["#fde68a", "#93c5fd", "#60a5fa", "#3b82f6", "#1d4ed8"],
    inverse: false,
  },
  {
    key: "primaryGer" as const,
    label: "Primary GER",
    unit: "%",
    desc: "Primary Gross Enrollment Ratio. Higher = better.",
    domain: [89, 106] as [number, number],
    colors: ["#fed7aa", "#fdba74", "#fb923c", "#ea580c", "#c2410c"],
    inverse: false,
  },
];

type MetricKey = (typeof METRICS)[number]["key"];

const regionColors: Record<string, string> = {
  north: "bg-blue-100 text-blue-700",
  south: "bg-green-100 text-green-700",
  east: "bg-amber-100 text-amber-700",
  west: "bg-purple-100 text-purple-700",
  central: "bg-orange-100 text-orange-700",
  northeast: "bg-pink-100 text-pink-700",
};

function StatRow({ label, value, unit, icon }: { label: string; value: number | string; unit?: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon} {label}
      </span>
      <span className="font-bold text-foreground text-sm">
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        {unit && <span className="text-muted-foreground font-normal">{unit}</span>}
      </span>
    </div>
  );
}

export default function IndiaMap() {
  const { data: stateStats, isLoading } = useGetStateStats();
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("dropoutRate");
  const [selectedState, setSelectedState] = useState<StateEducationStat | null>(null);
  const [hoveredGeoName, setHoveredGeoName] = useState<string | null>(null);

  const metric = METRICS.find((m) => m.key === selectedMetric)!;

  const colorScale = useMemo(
    () =>
      scaleQuantize<string>()
        .domain(metric.domain)
        .range(metric.colors),
    [metric]
  );

  const dataByGeoName = useMemo(() => {
    if (!stateStats) return {};
    return Object.fromEntries(stateStats.map((s) => [s.geoName, s]));
  }, [stateStats]);

  const sortedByMetric = useMemo(() => {
    if (!stateStats) return [];
    return [...stateStats].sort((a, b) =>
      metric.inverse ? b[selectedMetric] - a[selectedMetric] : a[selectedMetric] - b[selectedMetric]
    );
  }, [stateStats, selectedMetric, metric.inverse]);

  const nationalAvg = useMemo(() => {
    if (!stateStats) return 0;
    const values = stateStats.map((s) => s[selectedMetric] as number).filter(Boolean);
    return +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  }, [stateStats, selectedMetric]);

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">State-by-State Education Map</h1>
        <p className="text-muted-foreground leading-relaxed">
          Explore education indicators across all Indian states and union territories. Data sourced from UDISE+ 2022-23 and NFHS-5. Click any state for detailed statistics.
        </p>
      </div>

      {/* Metric selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMetric(m.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              selectedMetric === m.key
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map + legend column */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            {/* Metric description */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <span className="text-sm font-semibold text-foreground">{metric.label}</span>
                <span className="text-xs text-muted-foreground ml-2">{metric.desc}</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground">
                National avg: <strong className="text-foreground">{nationalAvg}{metric.unit}</strong>
              </span>
            </div>

            {isLoading ? (
              <Skeleton className="w-full h-[500px] rounded-xl" />
            ) : (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [82.5, 23], scale: 920 }}
                width={700}
                height={560}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      const geoName = geo.properties.NAME_1 as string;
                      const stateData = dataByGeoName[geoName];
                      const value = stateData ? (stateData[selectedMetric] as number) : undefined;
                      const fillColor = value !== undefined ? colorScale(value) : "#e2e8f0";
                      const isSelected = selectedState?.geoName === geoName;
                      const isHovered = hoveredGeoName === geoName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke={isSelected ? "#1e293b" : "#ffffff"}
                          strokeWidth={isSelected ? 2 : 0.7}
                          style={{
                            default: { outline: "none", opacity: isHovered && !isSelected ? 0.8 : 1 },
                            hover: { outline: "none", cursor: "pointer", opacity: 0.85 },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={() => setHoveredGeoName(geoName)}
                          onMouseLeave={() => setHoveredGeoName(null)}
                          onClick={() => {
                            if (stateData) setSelectedState(stateData === selectedState ? null : stateData);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            )}

            {/* Color legend */}
            <div className="mt-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground shrink-0 w-16">
                  {metric.inverse ? "Better" : "Worse"}
                </span>
                <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                  {metric.colors.map((c, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground shrink-0 w-16 text-right">
                  {metric.inverse ? "Worse" : "Better"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1 px-16">
                <span>{metric.domain[0]}{metric.unit}</span>
                <span>{metric.domain[1]}{metric.unit}</span>
              </div>
            </div>
          </div>

          {/* Rankings strip */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-3">
              State Rankings — {metric.label}
              <span className="text-xs font-normal text-muted-foreground ml-2">
                ({metric.inverse ? "highest to lowest" : "lowest to highest"})
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {sortedByMetric.map((s, i) => (
                <button
                  key={s.geoName}
                  onClick={() => setSelectedState(selectedState?.geoName === s.geoName ? null : s)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                    selectedState?.geoName === s.geoName
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-center text-[10px] font-bold shrink-0 flex items-center justify-center ${
                    i === 0 ? "bg-emerald-100 text-emerald-700" : i === sortedByMetric.length - 1 ? "bg-red-100 text-red-700" : "bg-muted-foreground/10 text-muted-foreground"
                  }`}>
                    {i + 1}
                  </span>
                  <span className="truncate font-medium">{s.state}</span>
                  <span className="ml-auto font-bold shrink-0">{(s[selectedMetric] as number).toFixed(1)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="xl:col-span-1">
          <AnimatePresence mode="wait">
            {selectedState ? (
              <motion.div
                key={selectedState.geoName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-20"
              >
                {/* State header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <h2 className="text-xl font-bold text-foreground leading-tight">{selectedState.state}</h2>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${regionColors[selectedState.region] ?? "bg-muted text-muted-foreground"}`}>
                      {selectedState.region.charAt(0).toUpperCase() + selectedState.region.slice(1)} India
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-muted-foreground hover:text-foreground text-lg leading-none mt-0.5"
                  >
                    ×
                  </button>
                </div>

                {/* Highlight */}
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-5">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">"{selectedState.highlight}"</p>
                </div>

                {/* Stats */}
                <div className="mb-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Indicators</h3>
                  <StatRow
                    label="Dropout Rate"
                    value={selectedState.dropoutRate}
                    unit="%"
                    icon={<TrendingDown className="w-3.5 h-3.5 text-destructive" />}
                  />
                  <StatRow
                    label="Girls' Dropout Rate"
                    value={selectedState.girlsDropoutRate}
                    unit="%"
                    icon={<TrendingDown className="w-3.5 h-3.5 text-orange-500" />}
                  />
                  <StatRow
                    label="Primary GER"
                    value={selectedState.primaryGer}
                    unit="%"
                    icon={<TrendingUp className="w-3.5 h-3.5 text-accent" />}
                  />
                  <StatRow
                    label="Secondary GER"
                    value={selectedState.secondaryGer}
                    unit="%"
                    icon={<TrendingUp className="w-3.5 h-3.5 text-secondary" />}
                  />
                  <StatRow
                    label="Literacy Rate"
                    value={selectedState.literacyRate}
                    unit="%"
                    icon={<BookOpen className="w-3.5 h-3.5 text-blue-500" />}
                  />
                  <StatRow
                    label="Out-of-School Children"
                    value={selectedState.outOfSchoolChildren.toLocaleString("en-IN")}
                    icon={<Users className="w-3.5 h-3.5 text-muted-foreground" />}
                  />
                </div>

                {/* Comparison to national avg */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">vs. National Average</p>
                  {METRICS.map((m) => {
                    const stateVal = selectedState[m.key] as number;
                    const diff = +(stateVal - nationalAvg).toFixed(1);
                    const isBetter = m.inverse ? diff < 0 : diff > 0;
                    return (
                      <div key={m.key} className="flex items-center justify-between text-xs py-0.5">
                        <span className="text-muted-foreground">{m.label}</span>
                        <span className={`font-bold ${isBetter ? "text-emerald-600" : "text-red-500"}`}>
                          {diff > 0 ? "+" : ""}{diff}{m.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* UDISE link */}
                <a
                  href={`https://kys.udiseplus.gov.in/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline underline-offset-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  Search {selectedState.state} schools on UDISE+
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center sticky top-20 min-h-[300px]"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Select a State</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Click any state on the map or use the ranking list to explore detailed education statistics.
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  <strong>Source:</strong> UDISE+ 2022-23, NFHS-5
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick stat cards below detail panel */}
          {!selectedState && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Best", value: sortedByMetric[sortedByMetric.length - 1]?.state, sub: `${sortedByMetric[sortedByMetric.length - 1]?.[selectedMetric]}${metric.unit}`, color: "border-emerald-200 bg-emerald-50 text-emerald-700" },
                { label: "Needs attention", value: sortedByMetric[0]?.state, sub: `${sortedByMetric[0]?.[selectedMetric]}${metric.unit}`, color: "border-red-200 bg-red-50 text-red-700" },
              ].map((item) => (
                <div key={item.label} className={`p-3 rounded-xl border text-center ${item.color}`}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">{item.label}</div>
                  <div className="font-bold text-sm">{item.value}</div>
                  <div className="text-xs opacity-80">{item.sub}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
