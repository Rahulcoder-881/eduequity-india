import { useListCaseStudies } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MapPin, Building2, Users, Coins, Clock, ExternalLink } from "lucide-react";

export default function CaseStudies() {
  const { data: caseStudies, isLoading } = useListCaseStudies();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-muted/20 min-h-screen">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Field Case Studies</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Real stories of systemic change. Examine how local organizations, governments, and communities are collaborating to implement scalable educational models across India.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : caseStudies ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-border overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold leading-tight mb-2">{study.title}</CardTitle>

                  {/* Organization as a clickable link */}
                  <a
                    href={study.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline underline-offset-2 group w-fit"
                  >
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>{study.organization}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                </CardHeader>

                <CardContent className="flex-1 pb-6">
                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>
                        <span className="font-semibold block">Location</span>
                        {study.location}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>
                        <span className="font-semibold block">Target Group</span>
                        {study.targetGroup}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>
                        <span className="font-semibold block">Years Active</span>
                        {study.yearsActive}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Coins className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>
                        <span className="font-semibold block">Cost / Beneficiary</span>
                        {study.costPerBeneficiary ?? "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Model */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">The Model</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.model}</p>
                    </div>

                    {/* Outcomes */}
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground mb-1 text-sm">Key Outcomes</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.outcomes}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-start gap-3 border-t border-border pt-4 pb-6 px-6 mt-auto">
                  {/* Funding source text */}
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Funding: </span>
                    {study.fundingSource}
                  </p>

                  {/* Funding institution links */}
                  {study.fundingLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {study.fundingLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          {link.name}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No case studies data found.
        </div>
      )}
    </div>
  );
}
