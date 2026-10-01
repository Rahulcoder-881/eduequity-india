import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-24 h-24 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <AlertCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          The research, data, or resource you are looking for has been moved or does not exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-semibold">
              Return Home
            </Button>
          </Link>
          <Link href="/overview">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8">
              Read the Overview <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}