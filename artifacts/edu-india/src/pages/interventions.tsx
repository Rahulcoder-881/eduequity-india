import { useListInterventions } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

export default function Interventions() {
  const { data: interventions, isLoading } = useListInterventions();

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'rigorous_rct': return 'bg-accent/10 text-accent border-accent/20';
      case 'strong': return 'bg-primary/10 text-primary border-primary/20';
      case 'moderate': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'pilot': return 'bg-muted text-muted-foreground border-muted';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEvidenceLabel = (level: string) => {
    switch (level) {
      case 'rigorous_rct': return 'Rigorous RCT';
      case 'strong': return 'Strong Evidence';
      case 'moderate': return 'Moderate Evidence';
      case 'pilot': return 'Pilot Stage';
      default: return level;
    }
  };

  const groupedInterventions = interventions?.reduce((acc, item) => {
    if (!acc[item.level]) acc[item.level] = [];
    acc[item.level].push(item);
    return acc;
  }, {} as Record<string, typeof interventions>);

  const levelTitles: Record<string, string> = {
    early_childhood: "Early Childhood Education",
    primary: "Primary Education",
    secondary: "Secondary Education",
    vocational: "Vocational & Skills",
    adult: "Adult Literacy",
    digital: "Digital Infrastructure",
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Evidence-Based Interventions</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We focus on models backed by rigorous evaluation. Explore programmatic approaches that have demonstrated measurable impact across different stages of the educational lifecycle.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : groupedInterventions ? (
        <Accordion type="multiple" defaultValue={Object.keys(groupedInterventions)} className="w-full space-y-6">
          {Object.entries(groupedInterventions).map(([level, items]) => (
            <AccordionItem
              value={level}
              key={level}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                <span className="flex items-center gap-3">
                  {levelTitles[level] || level.replace('_', ' ')}
                  <span className="text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {items.length} {items.length === 1 ? 'model' : 'models'}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-2 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {items.map((intervention) => (
                    <motion.div
                      key={intervention.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 border border-border rounded-lg bg-background flex flex-col"
                    >
                      {/* Name + evidence badge */}
                      <div className="flex justify-between items-start mb-2 gap-3">
                        <h3 className="font-bold text-lg text-foreground leading-snug">{intervention.name}</h3>
                        <Badge
                          variant="outline"
                          className={`shrink-0 text-xs whitespace-nowrap ${getEvidenceColor(intervention.evidenceLevel)}`}
                        >
                          {getEvidenceLabel(intervention.evidenceLevel)}
                        </Badge>
                      </div>

                      {/* Organization — clickable link */}
                      <a
                        href={intervention.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-2 group mb-5 w-fit"
                      >
                        {intervention.organization}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </a>

                      {/* Description + Impact */}
                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Description</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{intervention.description}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Measurable Impact</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{intervention.impact}</p>
                        </div>
                      </div>

                      {/* Related org links */}
                      {intervention.organizationLinks.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-border">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Related Links</p>
                          <div className="flex flex-wrap gap-2">
                            {intervention.organizationLinks.map((link, i) => (
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
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No interventions data found.
        </div>
      )}
    </div>
  );
}
