import { useGetStatsSummary } from "@workspace/api-client-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, BookOpen, Users, TrendingUp, ShieldCheck, ExternalLink,
  School, GraduationCap, Search, BarChart3, Laptop, Landmark,
  FileText, Heart, Globe, Calendar, ChevronRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const govPortals = [
  {
    icon: <Search className="w-5 h-5" />,
    name: "Know Your School",
    desc: "Search any government school by name, district, or pin code across India",
    url: "https://kys.udiseplus.gov.in",
    color: "text-primary bg-primary/10",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    name: "School Report Cards",
    desc: "NCERT's state-wise report cards with infrastructure and quality data",
    url: "http://schoolreportcards.in",
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: <School className="w-5 h-5" />,
    name: "UDISE+ Data Portal",
    desc: "National unified district information system for education statistics",
    url: "https://udiseplus.gov.in",
    color: "text-accent bg-accent/10",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    name: "National Scholarship Portal",
    desc: "Apply for central and state government scholarships for students",
    url: "https://scholarships.gov.in",
    color: "text-primary bg-primary/10",
  },
  {
    icon: <Laptop className="w-5 h-5" />,
    name: "DIKSHA Platform",
    desc: "Free digital learning content for all NCERT grades and subjects",
    url: "https://diksha.gov.in",
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: <Landmark className="w-5 h-5" />,
    name: "Samagra Shiksha Portal",
    desc: "India's integrated school education scheme — grants, data, and programs",
    url: "https://samagrashiksha.in",
    color: "text-accent bg-accent/10",
  },
];

const latestReports = [
  {
    title: "ASER 2024",
    subtitle: "Annual Status of Education Report",
    date: "January 2025",
    publisher: "Pratham Education Foundation",
    summary: "73.8% of Grade 5 children can now read Grade 2 text — strongest recovery since 2012. But government school children remain 12–15 pp behind private school peers in learning outcomes.",
    tag: "Learning Outcomes",
    tagColor: "bg-secondary/10 text-secondary",
    url: "https://asercentre.org/aser-2024/",
    highlight: "73.8% Grade 5 reading recovery",
  },
  {
    title: "UDISE+ 2024-25",
    subtitle: "Unified District Information System for Education",
    date: "August 2025",
    publisher: "Ministry of Education, India",
    summary: "63.5% of schools now have internet access, up from 53.9% in 2023-24. Primary-stage dropout is 0.3%, while upper-primary and secondary retention remain the larger equity challenges. 24.69 crore students are enrolled.",
    tag: "Infrastructure & Enrollment",
    tagColor: "bg-primary/10 text-primary",
    url: "https://udiseplus.gov.in",
    highlight: "63.5% schools with internet",
  },
  {
    title: "NEP 2020 Progress",
    subtitle: "5-Year Implementation Review",
    date: "August 2025",
    publisher: "Ministry of Education",
    summary: "The 2025 national review marked five years of NEP 2020 implementation, with PM SHRI schools, foundational learning, multilingual content, and assessment reform as major workstreams. The 6% GDP education-spending target remains unmet.",
    tag: "Policy Implementation",
    tagColor: "bg-accent/10 text-accent",
    url: "https://www.education.gov.in/nep2020",
    highlight: "Five years of NEP implementation",
  },
  {
    title: "World Bank India Report 2024",
    subtitle: "Education for Development: India Country Brief",
    date: "April 2024",
    publisher: "World Bank Group",
    summary: "India has achieved near-universal primary enrollment but faces a 'learning crisis' — 57% of Grade 8 students cannot perform basic division. Recommends accelerated investment in teacher training.",
    tag: "International Assessment",
    tagColor: "bg-violet-100 text-violet-700",
    url: "https://www.worldbank.org/en/country/india/overview",
    highlight: "57% Grade 8 numeracy gap",
  },
  {
    title: "NFHS-5 Education Findings",
    subtitle: "National Family Health Survey 5",
    date: "2023",
    publisher: "Ministry of Health & Family Welfare",
    summary: "School attendance for girls aged 6–17 rose to 79.3% from 70.3% in NFHS-4. SC/ST dropout rates remain highest. Rural–urban education gap narrowed but persists across all levels.",
    tag: "Equity & Gender",
    tagColor: "bg-rose-100 text-rose-700",
    url: "https://www.mohfw.gov.in/",
    highlight: "79.3% girls' attendance",
  },
  {
    title: "Budget 2026-27 Education Analysis",
    subtitle: "Union Budget Education Allocation Brief",
    date: "February 2026",
    publisher: "Ministry of Education / Ministry of Finance",
    summary: "The Ministry of Education allocation reached ₹1,39,289.48 crore for 2026–27, an 8.27% increase over the previous budget estimate. The package also proposes five university townships and one girls' hostel in every district.",
    tag: "Funding & Budget",
    tagColor: "bg-amber-100 text-amber-700",
    url: "https://www.indiabudget.gov.in",
    highlight: "₹1,39,289 crore education allocation",
  },
];

const featuredNgos = [
  {
    name: "Pratham Education Foundation",
    tagline: "Teaching at the Right Level — reaching 40 million children annually",
    focus: "Foundational literacy & numeracy",
    reach: "25+ states",
    donateUrl: "https://www.pratham.org/get-involved/donate/",
    learnUrl: "https://www.pratham.org",
    color: "border-secondary/40 hover:border-secondary",
    badge: "bg-secondary/10 text-secondary",
  },
  {
    name: "Educate Girls",
    tagline: "Community-led enrolment and retention of girls in rural India",
    focus: "Girls' education, Rajasthan / MP / UP",
    reach: "14,000+ villages",
    donateUrl: "https://www.educategirls.ngo/donate",
    learnUrl: "https://www.educategirls.ngo",
    color: "border-rose-300/60 hover:border-rose-400",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    name: "Teach For India",
    tagline: "Placing top graduates as fellows in under-resourced government schools",
    focus: "Urban government schools",
    reach: "8 cities, 500+ fellows",
    donateUrl: "https://www.teachforindia.org/donate",
    learnUrl: "https://www.teachforindia.org",
    color: "border-accent/40 hover:border-accent",
    badge: "bg-accent/10 text-accent",
  },
  {
    name: "Nanhi Kali",
    tagline: "Sponsor a girl child's education — 5 lakh girls across 11 states",
    focus: "Girl child sponsorship",
    reach: "11 states, 500k+ girls",
    donateUrl: "https://www.nanhikali.org/sponsor-nanhikali-as-an-individual",
    learnUrl: "https://www.nanhikali.org",
    color: "border-violet-300/60 hover:border-violet-400",
    badge: "bg-violet-100 text-violet-700",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Home() {
  const { data: stats, isLoading } = useGetStatsSummary();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden py-24 md:py-32 lg:py-44">
        {/* layered background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop')" }}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/60 to-primary" />
          {/* subtle grid texture */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-8 border border-secondary/30"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-ring" />
              Updated with ASER 2024 &amp; UDISE+ 2024-25 and Budget 2026-27 data
            </motion.span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
              Every child's right to{" "}
              <span className="relative inline-block">
                <span className="text-secondary">learn</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary/60 origin-left"
                />
              </span>{" "}
              is India's path to{" "}
              <span className="text-accent">progress</span>.
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Evidence-based research on the barriers facing 13.2 million out-of-school children, with actionable interventions to bridge the educational divide.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/overview">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base h-12 px-8 w-full sm:w-auto font-semibold shadow-lg">
                  Explore the Data
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground text-base h-12 px-8 w-full sm:w-auto bg-transparent">
                  Donate to NGOs
                  <Heart className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick stat ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm"
          >
            {[
              { n: "13.2M", label: "out-of-school children" },
              { n: "0.3%", label: "primary dropout rate" },
              { n: "63.5%", label: "schools with internet" },
              { n: "2.9%", label: "GDP on education (target 6%)" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-primary-foreground/70">
                <span className="font-bold text-secondary text-base">{s.n}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Key Stats ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Live Data</span>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-3">The Current Landscape</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Key figures from <strong>UDISE+ 2024-25</strong>, <strong>ASER 2024</strong>, and the <strong>Union Budget 2026-27</strong>.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card">
                  <Skeleton className="h-12 w-24 mb-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: stats.outOfSchoolChildren, suffix: "", color: "text-destructive", label: "Out-of-School Children", note: "Aged 6–18, India (ASER 2024)", trend: "-11.4% vs 2022" },
                { value: stats.dropoutRateElementary, suffix: "%", color: "text-primary", label: "Primary Dropout Rate", note: "All categories (UDISE+ 2024-25)", trend: "Down from 0.8% in 2023-24" },
                { value: stats.schoolsWithInternet, suffix: "%", color: "text-accent", label: "Schools with Internet", note: "All schools (UDISE+ 2024-25)", trend: "Up from 53.9% in 2023-24" },
                { value: stats.gdpSpendOnEducation, suffix: "%", color: "text-secondary", label: "GDP on Education", note: "Latest comparable public-spending estimate vs NEP target", trend: "Target: 6% by 2030" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm card-lift"
                >
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${s.color}`}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 mb-3">{s.note}</p>
                  <div className="text-xs font-medium text-accent bg-accent/8 px-2 py-1 rounded-md inline-block">
                    {s.trend}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Latest Reports ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Research & Reports</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">Latest Publications</h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                Key reports from ASER, UDISE+, World Bank, and the Ministry of Education — updated through 2026–27 where official data is available.
              </p>
            </div>
            <Link href="/overview" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-2 shrink-0">
              See full overview <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestReports.map((r, i) => (
              <motion.a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group flex flex-col p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all card-lift"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.tagColor}`}>{r.tag}</div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </div>
                <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{r.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{r.summary}</p>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {r.date}
                  </div>
                  <div className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                    {r.highlight}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured NGOs ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Civil Society</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">Featured NGOs</h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                Credible, high-impact organizations you can donate to directly. All have published annual reports and audited accounts.
              </p>
            </div>
            <Link href="/get-involved" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-2 shrink-0">
              Full NGO directory <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featuredNgos.map((ngo, i) => (
              <motion.div
                key={ngo.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className={`p-6 rounded-2xl bg-card border transition-all card-lift ${ngo.color}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-base">{ngo.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{ngo.tagline}</p>
                  </div>
                  <Badge className={`shrink-0 text-xs ${ngo.badge} border-0`}>{ngo.reach}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> {ngo.focus}
                </p>
                <div className="flex gap-2">
                  <a
                    href={ngo.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                  >
                    Donate
                  </a>
                  <a
                    href={ngo.learnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-medium py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
                  >
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Government Portals ───────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Official Resources</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">Government School Portals</h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                Direct links to India's national school infrastructure, scholarship systems, and digital learning platforms — maintained by the Ministry of Education.
              </p>
            </div>
            <a
              href="https://www.education.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-2 shrink-0"
            >
              Ministry of Education <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {govPortals.map((portal, i) => (
              <motion.a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all card-lift"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${portal.color}`}>
                  {portal.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{portal.name}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{portal.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navigate the Research ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">Deep Dive</span>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Explore the Research</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Navigate our analytical framework — from root causes of inequality to evidence-backed solutions and policy roadmaps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {[
              {
                href: "/barriers",
                icon: <ShieldCheck className="w-6 h-6" />,
                iconBg: "bg-destructive/10 text-destructive",
                title: "Identify Barriers",
                desc: "14 evidence-based barriers spanning economic, social, geographic, infrastructure, and policy dimensions — updated with ASER 2024 & UDISE+ 2024-25 findings.",
                badge: "14 barriers",
              },
              {
                href: "/interventions",
                icon: <TrendingUp className="w-6 h-6" />,
                iconBg: "bg-accent/10 text-accent",
                title: "Evidence-Based Interventions",
                desc: "Rigorously evaluated models across early childhood, primary, vocational, and digital education with J-PAL impact data.",
                badge: "10 interventions",
              },
              {
                href: "/case-studies",
                icon: <BookOpen className="w-6 h-6" />,
                iconBg: "bg-primary/10 text-primary",
                title: "Field Case Studies",
                desc: "Real-world success stories from across Indian states, detailing implementation models, per-beneficiary costs, and measurable outcomes.",
                badge: "10 case studies",
              },
              {
                href: "/policy",
                icon: <Users className="w-6 h-6" />,
                iconBg: "bg-secondary/20 text-secondary",
                title: "Policy Roadmap",
                desc: "Six key legislative reforms and a 3-year phased implementation plan aligned with SDG-4 and NEP 2020 targets.",
                badge: "6 reforms",
              },
              {
                href: "/funding",
                icon: <FileText className="w-6 h-6" />,
                iconBg: "bg-accent/10 text-accent",
                title: "Funding Mechanisms",
                desc: "Government schemes, CSR mandates, impact bonds, and international aid channels — with actual funding amounts and lead organizations.",
                badge: "6 mechanisms",
              },
              {
                href: "/get-involved",
                icon: <Heart className="w-6 h-6" />,
                iconBg: "bg-rose-100 text-rose-600",
                title: "Donate & Get Involved",
                desc: "Direct donation links to 12 verified NGOs, volunteer opportunities, and a contact form for institutional partnerships.",
                badge: "12 NGOs",
              },
            ].map((card, i) => (
              <motion.div
                key={card.href}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
              >
                <Link href={card.href}>
                  <div className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full card-lift">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${card.iconBg}`}>
                        {card.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{card.title}</h3>
                          <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary shrink-0" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{card.badge}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
