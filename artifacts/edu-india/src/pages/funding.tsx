import { useListFundingMechanisms } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function Funding() {
  const { data: mechanisms, isLoading } = useListFundingMechanisms();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'government': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'csr': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'impact_bond': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      case 'international_aid': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
      case 'ngo': return 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'government': return 'Government';
      case 'csr': return 'Corporate CSR';
      case 'impact_bond': return 'Impact Bond';
      case 'international_aid': return 'International Aid';
      case 'ngo': return 'Philanthropy';
      default: return 'Mixed';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Funding Mechanisms</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Achieving educational equity requires sustainable, innovative financing. Explore the various structural vehicles used to fund large-scale interventions across India, and visit each institution directly.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-8 rounded-2xl border border-border bg-card">
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : mechanisms ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mechanisms.map((mech, idx) => (
            <motion.div
              key={mech.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-border bg-card flex flex-col hover:border-primary/40 transition-colors shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4 gap-4">
                <a
                  href={mech.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 hover:text-primary transition-colors"
                >
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {mech.name}
                  </h2>
                  <ExternalLink className="w-4 h-4 mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </a>
                <Badge variant="outline" className={`capitalize shrink-0 ${getTypeColor(mech.type)}`}>
                  {getTypeLabel(mech.type)}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                {mech.description}
              </p>

              {/* Examples */}
              <div className="bg-muted/50 rounded-xl p-5 border border-border mb-6">
                <h3 className="text-sm font-bold text-foreground mb-3">Prominent Examples</h3>
                <ul className="space-y-1.5">
                  {mech.examples.map((example, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-secondary mt-0.5 shrink-0">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Institution Links */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-foreground mb-3">Key Institutions</h3>
                <div className="flex flex-wrap gap-2">
                  {mech.institutionLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 hover:border-primary/60 transition-colors"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <span className="text-sm font-semibold text-foreground">Typical Scale</span>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{mech.scale}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No funding mechanisms found.
        </div>
      )}
    </div>
  );
}
