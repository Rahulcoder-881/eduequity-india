import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const Home = lazy(() => import("@/pages/home"));
const Overview = lazy(() => import("@/pages/overview"));
const Barriers = lazy(() => import("@/pages/barriers"));
const Interventions = lazy(() => import("@/pages/interventions"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const Funding = lazy(() => import("@/pages/funding"));
const GetInvolved = lazy(() => import("@/pages/get-involved"));
const PolicyRecommendations = lazy(() => import("@/pages/policy-recommendations"));
const IndiaMap = lazy(() => import("@/pages/india-map"));
const Institutions = lazy(() => import("@/pages/institutions"));
const Exams = lazy(() => import("@/pages/exams"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function PageFallback() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/overview" component={Overview} />
            <Route path="/barriers" component={Barriers} />
            <Route path="/interventions" component={Interventions} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/funding" component={Funding} />
            <Route path="/get-involved" component={GetInvolved} />
            <Route path="/policy" component={PolicyRecommendations} />
            <Route path="/state-map" component={IndiaMap} />
            <Route path="/colleges" component={Institutions} />
            <Route path="/exams" component={Exams} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
