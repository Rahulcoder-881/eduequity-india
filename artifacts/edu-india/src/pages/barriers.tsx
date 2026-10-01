import { useListBarriers } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Barriers() {
  const { data: barriers, isLoading } = useListBarriers();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const groupedBarriers = barriers?.reduce((acc, barrier) => {
    if (!acc[barrier.category]) acc[barrier.category] = [];
    acc[barrier.category].push(barrier);
    return acc;
  }, {} as Record<string, typeof barriers>);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Barriers to Entry</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The obstacles to quality education are multi-dimensional. We classify these barriers into core categories to better target specific interventions and allocate resources efficiently.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-12">
          {[1, 2].map(i => (
            <div key={i}>
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(j => (
                  <Skeleton key={j} className="h-48 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : groupedBarriers ? (
        <div className="space-y-16">
          {Object.entries(groupedBarriers).map(([category, items], idx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 capitalize border-b border-border pb-2">
                {category.replace('_', ' ')} Barriers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(barrier => (
                  <div key={barrier.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg leading-tight pr-4">{barrier.title}</h3>
                      <Badge variant="outline" className={`capitalize shrink-0 ${getSeverityColor(barrier.severity)}`}>
                        {barrier.severity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {barrier.description}
                    </p>
                    <div className="mt-auto">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Most Affected:</h4>
                      <div className="flex flex-wrap gap-2">
                        {barrier.affectedGroups.map(group => (
                          <span key={group} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No barriers data found.
        </div>
      )}
    </div>
  );
}