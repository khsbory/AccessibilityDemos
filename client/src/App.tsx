import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import MobileDemosPage from "@/pages/MobileDemosPage";
import PcDemosPage from "@/pages/PcDemosPage";
import CommonDemosPage from "@/pages/CommonDemosPage";
import RadioDemoPage from "@/pages/RadioDemoPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/mobile-demos" component={MobileDemosPage} />
        <Route path="/pc-demos" component={PcDemosPage} />
        <Route path="/common-demos" component={CommonDemosPage} />
        <Route path="/demos/radio-auto-select" component={RadioDemoPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
