import { useGetDropoutRates, useGetEnrollmentTrends } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

const DROPOUT_COLORS = [
  "hsl(var(--destructive))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--accent))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--muted-foreground))",
];

const SourceNote = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
    <span className="font-semibold uppercase tracking-wide">Source:</span>
    {children}
  </p>
);

export default function Overview() {
  const { data: dropoutRates, isLoading: isLoadingDropout } = useGetDropoutRates();
  const { data: enrollmentTrends, isLoading: isLoadingTrends } = useGetEnrollmentTrends();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-16"
      >
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Scope &amp; Demographics</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Educational inequity in India is not uniform; it intersects heavily with caste, gender, geography, and economic status. Understanding these precise demographic realities is essential for deploying effective interventions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Defining the Scope</h2>
            <p className="text-muted-foreground mb-4">
              When we discuss "unprivileged communities," we are referring to historically and systemically marginalized groups including:
            </p>
            <ul className="space-y-3">
              {[
                { title: "Scheduled Castes (SC) & Scheduled Tribes (ST)", desc: "Facing historical disadvantages and geographic isolation, respectively." },
                { title: "Other Backward Classes (OBC) & Minorities", desc: "Experiencing socio-economic challenges and systemic discrimination." },
                { title: "Girls & Young Women", desc: "Vulnerable to early dropout due to cultural norms and lack of sanitation facilities." },
                { title: "Children with Disabilities", desc: "Severely lacking accessible infrastructure and trained special educators." },
                { title: "Rural & Urban Slum Dwellers", desc: "Suffering from resource-poor learning environments and economic instability." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <div>
                    <strong className="text-foreground">{item.title}:</strong>{" "}
                    <span className="text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dropout chart */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-1">Dropout Rates by Demographic</h3>
          <p className="text-xs text-muted-foreground mb-5">Elementary level (classes I–VIII), %</p>
          <div className="h-[300px] w-full">
            {isLoadingDropout ? (
              <Skeleton className="w-full h-full" />
            ) : dropoutRates ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dropoutRates}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                  <XAxis
                    type="number"
                    domain={[0, 35]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="group"
                    width={160}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v}%`, "Dropout Rate"]}
                  />
                  <Bar dataKey="rate" radius={[0, 4, 4, 0]} name="Dropout Rate (%)">
                    {dropoutRates.map((_, index) => (
                      <Cell key={index} fill={DROPOUT_COLORS[index % DROPOUT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <SourceNote>
            <a href="https://udiseplus.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2">
              UDISE+ 2024-25 <ExternalLink className="w-3 h-3" />
            </a>
            {" / "}
            <a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2">
              NFHS-5 <ExternalLink className="w-3 h-3" />
            </a>
          </SourceNote>
        </div>
      </div>

      {/* Enrollment trends chart */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-3">Gross Enrollment Ratio Trends</h3>
          <p className="text-muted-foreground">
            While primary enrollment has reached near-universal levels (99.1%), the sharp drop-off at secondary and higher education remains a critical bottleneck — especially for marginalized communities.
          </p>
        </div>

        <div className="h-[400px] w-full">
          {isLoadingTrends ? (
            <Skeleton className="w-full h-full" />
          ) : enrollmentTrends ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  domain={[0, 105]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [`${v}%`]}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Line
                  type="monotone"
                  dataKey="primaryEnrollment"
                  name="Primary GER (%)"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="secondaryEnrollment"
                  name="Secondary GER (%)"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="higherEnrollment"
                  name="Higher Ed GER (%)"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
          )}
        </div>
        <SourceNote>
          <a href="https://udiseplus.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2">
            UDISE+ 2024-25 <ExternalLink className="w-3 h-3" />
          </a>
          {" / "}
          <a href="https://aishe.gov.in/aishe-final-report" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2">
            AISHE 2023-24 <ExternalLink className="w-3 h-3" />
          </a>
          {" / "}
          <a href="https://www.education.gov.in/mhrd-annual-report" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2">
            MHRD Annual Reports <ExternalLink className="w-3 h-3" />
          </a>
        </SourceNote>
      </div>
    </div>
  );
}
