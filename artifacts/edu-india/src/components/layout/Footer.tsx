import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

const govPortals = [
  { name: "Know Your School (UDISE+)", url: "https://kys.udiseplus.gov.in" },
  { name: "School Report Cards (NCERT)", url: "http://schoolreportcards.in" },
  { name: "UDISE+ Data Portal", url: "https://udiseplus.gov.in" },
  { name: "National Scholarship Portal", url: "https://scholarships.gov.in" },
  { name: "DIKSHA Learning Platform", url: "https://diksha.gov.in" },
  { name: "PM POSHAN (Mid-Day Meal)", url: "https://pmposhan.education.gov.in" },
  { name: "Samagra Shiksha", url: "https://samagrashiksha.in" },
  { name: "NIPUN Bharat", url: "https://nipunbharat.education.gov.in" },
];

const dataSources = [
  { name: "Ministry of Education", url: "https://www.education.gov.in" },
  { name: "ASER 2024 (Pratham)", url: "https://asercentre.org/aser-2024/" },
  { name: "UDISE+ Portal", url: "https://udiseplus.gov.in" },
  { name: "World Bank – India", url: "https://www.worldbank.org/en/country/india/overview" },
  { name: "UNICEF India", url: "https://www.unicef.org/india" },
  { name: "NFHS-5 / MoHFW", url: "https://www.mohfw.gov.in/" },
];

const featuredNgos = [
  { name: "Pratham Foundation", url: "https://www.pratham.org/get-involved/donate/" },
  { name: "Educate Girls", url: "https://www.educategirls.ngo/donate" },
  { name: "Teach For India", url: "https://www.teachforindia.org/donate" },
  { name: "Nanhi Kali", url: "https://www.nanhikali.org/sponsor-nanhikali-as-an-individual" },
  { name: "CRY — Child Rights", url: "https://www.cry.org/donate" },
  { name: "Smile Foundation", url: "https://www.smilefoundation.in/donate/" },
  { name: "Akanksha Foundation", url: "https://www.akanksha.org/donate" },
  { name: "eVidyaloka", url: "https://www.evidyaloka.org/donate" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      {/* Government portals banner */}
      <div className="border-b border-primary-foreground/10 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary shrink-0 border border-secondary/40 px-2 py-1 rounded">
              Official Portals
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {govPortals.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                >
                  {p.name}
                  <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="font-serif font-bold text-2xl tracking-tight text-white mb-4 block">
                EduEquity<span className="text-secondary">India</span>
              </Link>
              <p className="text-primary-foreground/70 max-w-sm mt-4 text-sm leading-relaxed">
                An evidence-based resource for policymakers, educators, and donors working to bridge the educational divide for unprivileged communities across India.
              </p>
              <p className="text-xs text-primary-foreground/40 mt-3">
                Data: UDISE+ 2024-25 · ASER 2024 · NEP 2020 · Budget 2026-27
              </p>
              <div className="flex gap-3 mt-5">
                {[
                  { label: "Data-driven", color: "bg-secondary/20 text-secondary" },
                  { label: "Open access", color: "bg-accent/20 text-accent" },
                  { label: "Actionable", color: "bg-primary-foreground/10 text-primary-foreground/80" },
                ].map((tag) => (
                  <span key={tag.label} className={`text-xs px-2.5 py-1 rounded-full font-medium ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Research */}
            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-wider text-primary-foreground/50">Research</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/overview", label: "Demographics & Data" },
                  { href: "/barriers", label: "Barriers to Entry" },
                  { href: "/interventions", label: "Interventions" },
                  { href: "/case-studies", label: "Field Case Studies" },
                  { href: "/funding", label: "Funding Mechanisms" },
                  { href: "/policy", label: "Policy Roadmap" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Govt Portals */}
            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-wider text-primary-foreground/50">Govt. Schools</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Know Your School", url: "https://kys.udiseplus.gov.in" },
                  { name: "School Report Cards", url: "http://schoolreportcards.in" },
                  { name: "UDISE+ Portal", url: "https://udiseplus.gov.in" },
                  { name: "DIKSHA Platform", url: "https://diksha.gov.in" },
                  { name: "Samagra Shiksha", url: "https://samagrashiksha.in" },
                  { name: "NIPUN Bharat", url: "https://nipunbharat.education.gov.in" },
                ].map((l) => (
                  <li key={l.name}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer"
                      className="text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group">
                      {l.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* NGOs */}
            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-wider text-primary-foreground/50">Donate to NGOs</h3>
              <ul className="space-y-3 text-sm">
                {featuredNgos.map((l) => (
                  <li key={l.name}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer"
                      className="text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group">
                      {l.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Sources */}
            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-wider text-primary-foreground/50">Data Sources</h3>
              <ul className="space-y-3 text-sm">
                {dataSources.map((l) => (
                  <li key={l.name}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer"
                      className="text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-1.5 group">
                      {l.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40">
          <p>&copy; {new Date().getFullYear()} EduEquity India. Open data for public good.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span>UDISE+ 2024-25</span>
            <span>·</span>
            <span>ASER 2024</span>
            <span>·</span>
            <span>NFHS-5</span>
            <span>·</span>
            <span>NEP 2020</span>
            <span>·</span>
            <span>Budget 2026-27</span>
            <span>·</span>
            <span>AISHE 2023-24</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
