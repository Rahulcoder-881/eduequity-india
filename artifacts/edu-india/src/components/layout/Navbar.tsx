import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { InstitutionSearchDialog } from "@/components/search/InstitutionSearchDialog";

const links = [
  { href: "/overview", label: "Overview" },
  { href: "/barriers", label: "Barriers" },
  { href: "/interventions", label: "Interventions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/funding", label: "Funding" },
  { href: "/policy", label: "Policy" },
  { href: "/state-map", label: "State Map" },
  { href: "/colleges", label: "Colleges" },
  { href: "/exams", label: "Exams" },
];

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl tracking-tight text-primary shrink-0" onClick={() => setOpen(false)}>
            EduEquity<span className="text-secondary">India</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-4 flex-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary pb-0.5 shrink-0 ${
                  location === link.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search button — visible on all pages */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-muted transition-colors text-sm"
              aria-label="Search government colleges and universities"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search colleges...</span>
              <span className="hidden sm:inline text-xs bg-muted border border-border rounded px-1 py-0.5 font-mono">⌘K</span>
            </button>

            <Link href="/get-involved" className="hidden sm:block">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-md h-9 px-4 text-sm">
                Take Action
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="xl:hidden border-t border-border bg-background/98 backdrop-blur">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Search in mobile menu */}
              <button
                onClick={() => { setOpen(false); setSearchOpen(true); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Search className="w-4 h-4" /> Search Colleges &amp; Universities
              </button>
              <div className="pt-2 border-t border-border mt-2">
                <Link href="/get-involved" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                    Take Action
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global search dialog — available from every page */}
      <InstitutionSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
