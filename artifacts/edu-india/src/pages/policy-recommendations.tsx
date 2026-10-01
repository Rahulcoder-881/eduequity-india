import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Legend,
} from "recharts";
import { ExternalLink, CheckCircle2, Clock, Target, Users, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  text: string;
  done?: boolean;
}

interface Phase {
  year: string;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  theme: string;
  priorities: string[];
  milestones: Milestone[];
  actors: string[];
  budgetCr: number;
}

const phases: Phase[] = [
  {
    year: "2026–27",
    label: "Phase 1: Foundation",
    color: "hsl(var(--primary))",
    bgColor: "hsl(var(--primary) / 0.06)",
    icon: <Target className="w-5 h-5" />,
    theme: "Close enrollment gaps and digitise the baseline",
    priorities: [
      "Use household-level campaigns and bridge courses to reach children still out of school (Educate Girls model)",
      "Mandate functional toilets + potable water in every government school (Right to Education Act enforcement)",
      "Train 500,000 teachers in TaRL and foundational literacy pedagogy under NIPUN Bharat",
      "Expand DIKSHA digital content to cover all NCERT Class 1–8 subjects in 22 scheduled languages",
      "Introduce universal school readiness screening in Anganwadis to flag at-risk children",
    ],
    milestones: [
      { text: "Measurable reduction in the out-of-school rate in high-burden districts" },
      { text: "100% schools with functional toilets" },
      { text: "NIPUN Bharat foundational literacy targets met in 10+ states" },
      { text: "DIKSHA daily sessions cross 50 million" },
    ],
    actors: ["Ministry of Education", "State Education Departments", "NCERT", "UNICEF India", "Pratham", "Educate Girls"],
    budgetCr: 82000,
  },
  {
    year: "2027–28",
    label: "Phase 2: Acceleration",
    color: "hsl(var(--secondary))",
    bgColor: "hsl(var(--secondary) / 0.06)",
    icon: <Zap className="w-5 h-5" />,
    theme: "Scale what works and eliminate secondary-level dropout",
    priorities: [
      "Scale TaRL to all 600+ districts — embed it as a standalone weekly session in timetable",
      "Roll out conditional scholarship (Gargi-model) nationally for girls in classes 9–12",
      "Expand PM POSHAN to cover Saturday and holiday sessions for nutritionally vulnerable children",
      "Build 50,000 new hostels for tribal and remote-area secondary students via Eklavya upgrade",
      "Launch a National Parent Engagement Index to track and reward school-community partnership",
    ],
    milestones: [
      { text: "Secondary GER rises from the latest UDISE+ baseline toward 88%" },
      { text: "ST & SC dropout rate at secondary falls below 15%" },
      { text: "Girls' conditional scholarship reaches 10 million beneficiaries" },
      { text: "Learning-level assessments (NAS) show 20% improvement in grade-appropriate reading" },
    ],
    actors: ["Tribal Affairs Ministry", "State Govts (Rajasthan, MP, UP)", "J-PAL South Asia", "Tata Trusts", "Azim Premji Foundation"],
    budgetCr: 120000,
  },
  {
    year: "2028–29",
    label: "Phase 3: Consolidation",
    color: "hsl(var(--accent))",
    bgColor: "hsl(var(--accent) / 0.06)",
    icon: <Globe className="w-5 h-5" />,
    theme: "Universalise secondary completion and raise quality to global benchmarks",
    priorities: [
      "Implement NEP 2020's 5+3+3+4 curricular framework nationally with assessment reform",
      "Achieve 6% GDP spend on education — additional 1.1% budgetary allocation over 3 years",
      "Embed vocational modules (PMKVY-aligned) in classes 9–12 for all government school students",
      "Establish community-run learning centres in every panchayat for adult and lifelong literacy",
      "Create a national open dataset of school performance indicators (transparent, real-time UDISE+)",
    ],
    milestones: [
      { text: "Secondary completion rate reaches 90%+ nationally" },
      { text: "Higher Ed GER crosses 35% (from current 28.4%)" },
      { text: "Gross Enrollment parity between rural and urban below 5 percentage points" },
      { text: "India progresses from SDG-4 rank 100 to top 75 globally" },
    ],
    actors: ["Finance Ministry", "Ministry of Education", "NASSCOM", "Industry Partners", "District Education Officers", "Gram Panchayats"],
    budgetCr: 165000,
  },
];

const recommendations = [
  {
    id: "R1",
    title: "Raise Education Budget to 6% of GDP",
    description: "India currently spends 2.9% of GDP on education vs the NEP 2020 target of 6%. Closing this gap would unlock approximately ₹5 lakh crore per year for school infrastructure, teacher salaries, and digital access.",
    impact: "High",
    timeframe: "3 Years",
    reference: { text: "NEP 2020 Financing Roadmap", url: "https://www.education.gov.in/nep/nep2020.pdf" },
  },
  {
    id: "R2",
    title: "Mandate Outcome-Linked Funding for States",
    description: "Tie 30% of Samagra Shiksha grants to verified learning outcomes (NAS scores, dropout rates) rather than inputs. States with demonstrated results receive additional performance bonuses.",
    impact: "High",
    timeframe: "1 Year",
    reference: { text: "World Bank Education Accountability Report", url: "https://www.worldbank.org/en/topic/education" },
  },
  {
    id: "R3",
    title: "Scale TaRL to Every Government School",
    description: "Dedicate one session per week exclusively to Teaching at the Right Level methodology across all Class 1–5 government schools. Rigorous J-PAL evaluations show 2x improvement in foundational skills within 6 months.",
    impact: "High",
    timeframe: "2 Years",
    reference: { text: "J-PAL South Asia", url: "https://www.povertyactionlab.org/south-asia" },
  },
  {
    id: "R4",
    title: "National Girls' Secondary Scholarship Programme",
    description: "Consolidate 27 fragmented state scholarship schemes into a single nationally portable conditional grant of ₹12,000/year for girls from BPL families completing Class 10 and 12.",
    impact: "Medium",
    timeframe: "1 Year",
    reference: { text: "National Scholarship Portal", url: "https://scholarships.gov.in" },
  },
  {
    id: "R5",
    title: "Universal Internet Connectivity by 2028",
    description: "Only 63.5% of schools had internet access in UDISE+ 2024-25. Under PM eVIDYA, prioritize reliable connectivity and offline-first content for the remaining schools in identified aspirational districts by 2028.",
    impact: "Medium",
    timeframe: "2 Years",
    reference: { text: "PM eVIDYA Programme", url: "https://www.education.gov.in/pmEvidya" },
  },
  {
    id: "R6",
    title: "Integrate ECCE into Right to Education Act",
    description: "Extend RTE Act protection to ages 3–6, making quality early childhood care a justiciable right. This ensures Anganwadi quality standards are legally enforceable and publicly funded.",
    impact: "High",
    timeframe: "3 Years",
    reference: { text: "UNICEF India – Early Childhood", url: "https://www.unicef.org/india/what-we-do/ecd" },
  },
];

const radarData = [
  { subject: "Access & Enrollment", current: 72, target: 95 },
  { subject: "Learning Quality", current: 38, target: 80 },
  { subject: "Secondary Retention", current: 55, target: 88 },
  { subject: "Teacher Training", current: 60, target: 90 },
  { subject: "Digital Inclusion", current: 45, target: 85 },
  { subject: "Gender Parity", current: 62, target: 95 },
  { subject: "Funding Adequacy", current: 33, target: 70 },
];

const budgetData = phases.map((p) => ({
  phase: p.label.split(":")[1].trim(),
  year: p.year,
  budget: p.budgetCr,
  fill: p.color,
}));

const impactColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-secondary/10 text-secondary border-secondary/20",
  Low: "bg-muted text-muted-foreground border-muted",
};

export default function PolicyRecommendations() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">
          Policy Recommendations & Roadmap
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Drawing from evidence across 15 years of interventions, this 3-year action roadmap identifies the highest-leverage policy reforms needed to achieve SDG-4 goals for India's most underserved communities by 2029.
        </p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Radar — current vs target */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-1">Current State vs 2029 Targets</h3>
          <p className="text-xs text-muted-foreground mb-6">Score out of 100 across six equity dimensions</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 0, right: 30, bottom: 0, left: 30 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Radar name="Current (2024-25)" dataKey="current" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Target (2028-29)" dataKey="target" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar — phased investment */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-1">Phased Budget Requirement</h3>
          <p className="text-xs text-muted-foreground mb-6">Incremental government allocation needed (INR Crore)</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K Cr`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(v: number) => [`₹${v.toLocaleString("en-IN")} Crore`, "Budget Needed"]}
                />
                <Bar dataKey="budget" radius={[4, 4, 0, 0]}>
                  {budgetData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3-Year Roadmap */}
      <div className="mb-20">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-10">3-Year Implementation Roadmap</h2>
        <div className="space-y-8">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-border overflow-hidden shadow-sm"
              style={{ backgroundColor: phase.bgColor }}
            >
              {/* Phase header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: phase.color }}>
                    {phase.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">{phase.year}</div>
                    <h3 className="text-xl font-bold text-foreground">{phase.label}</h3>
                    <p className="text-sm text-muted-foreground">{phase.theme}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold" style={{ color: phase.color }}>
                    ₹{(phase.budgetCr / 1000).toFixed(0)}K Cr
                  </div>
                  <div className="text-xs text-muted-foreground">incremental allocation</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
                {/* Priorities */}
                <div className="p-6 lg:col-span-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Priorities</h4>
                  <ul className="space-y-3">
                    {phase.priorities.map((p, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: phase.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestones */}
                <div className="p-6 lg:col-span-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Success Milestones</h4>
                  <ul className="space-y-3">
                    {phase.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: phase.color }} />
                        <span className="text-muted-foreground">{m.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actors */}
                <div className="p-6 lg:col-span-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Responsible Actors</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.actors.map((actor, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-foreground bg-background"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Recommendations */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Priority Policy Recommendations</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">Six legislative and budgetary reforms ranked by expected impact on equity outcomes for underserved communities.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">{rec.id}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${impactColor[rec.impact]}`}>{rec.impact} Impact</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />{rec.timeframe}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-foreground mb-3 leading-snug">{rec.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{rec.description}</p>
              <a
                href={rec.reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline underline-offset-2 mt-4 group"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                {rec.reference.text}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
        <h3 className="text-2xl font-serif font-bold mb-3">Help turn this roadmap into action</h3>
        <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
          These recommendations are only as powerful as the advocates who share them and the donors who fund the implementation. Every action — from a donation to a policy petition — matters.
        </p>
        <a
          href="/get-involved"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-colors text-sm"
        >
          <Users className="w-4 h-4" /> Get Involved
        </a>
      </div>
    </div>
  );
}
