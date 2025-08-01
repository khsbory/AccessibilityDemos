import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import RadioDemoPage from "@/pages/RadioDemoPage";
import CategoryRadioDemoPage from "@/pages/CategoryRadioDemoPage";
import PaymentCarouselDemoPage from "@/pages/PaymentCarouselDemoPage";
import InfiniteCarouselDemoPage from "@/pages/InfiniteCarouselDemoPage";
import NotificationSettingsDemoPage from "@/pages/NotificationSettingsDemoPage";
import TabControlDemoPage from "@/pages/TabControlDemoPage";
import FocusManagementDemoPage from "@/pages/FocusManagementDemoPage";
import NotFound from "@/pages/not-found";
import ReleaseNotesPage from "@/pages/ReleaseNotesPage";
import CustomRadioDemoPage from "@/pages/CustomRadioDemoPage";
import LotteryScratchDemoPage from "@/pages/LotteryScratchDemoPage";
import AndroidExpandCollapsePage from "@/pages/AndroidExpandCollapsePage";
import AndroidCustomTabPage from "@/pages/AndroidCustomTabPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/demos/radio-auto-select" component={RadioDemoPage} />
        <Route path="/demos/category-radio" component={CategoryRadioDemoPage} />
        <Route path="/demos/payment-carousel" component={PaymentCarouselDemoPage} />
        <Route path="/demos/infinite-carousel" component={InfiniteCarouselDemoPage} />
        <Route path="/demos/notification-settings" component={NotificationSettingsDemoPage} />
        <Route path="/demos/tab-control" component={TabControlDemoPage} />
        <Route path="/demos/focus-management" component={FocusManagementDemoPage} />
        <Route path="/demos/custom-radio" component={CustomRadioDemoPage} />
        <Route path="/demos/lottery-scratch" component={LotteryScratchDemoPage} />
        <Route path="/demos/android-expand-collapse" component={AndroidExpandCollapsePage} />
        <Route path="/demos/android-custom-tab" component={AndroidCustomTabPage} />
        <Route path="/release-notes" component={ReleaseNotesPage} />
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
