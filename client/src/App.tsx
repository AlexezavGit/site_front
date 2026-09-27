import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ForProfessionals from "@/pages/ForProfessionals";
import Training from "@/pages/Training";
import ForDonors from "@/pages/ForDonors";
import ForBeneficiaries from "@/pages/ForBeneficiaries";
import About from "@/pages/About";
import Methodology from "@/pages/Methodology";
import Referral from "@/pages/Referral";
import Portal from "@/pages/Portal";
import AuthPage from "@/pages/AuthPage";
import Consortium from "@/pages/Consortium";
import InstitutionalDashboard from "@/pages/InstitutionalDashboard";
import LandingRecipient from "@/pages/LandingRecipient";
import LandingProvider from "@/pages/LandingProvider";
import LandingPatron from "@/pages/LandingPatron";
import PatronCabinet from "@/pages/portal/DonorCabinet";
import ProviderCabinet from "@/pages/portal/ProviderCabinet";
import BeneficiaryCabinet from "@/pages/portal/BeneficiaryCabinet";
import AuditorCabinet from "@/pages/portal/AuditorCabinet";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          {/* Public pages */}
          <Route path="/" component={Home} />
          <Route path="/pro" component={ForProfessionals} />
          <Route path="/training" component={Training} />
          <Route path="/donors" component={ForDonors} />
          <Route path="/beneficiaries" component={ForBeneficiaries} />
          <Route path="/about" component={About} />
          <Route path="/methodology" component={Methodology} />
          <Route path="/referral" component={Referral} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/consortium" component={Consortium} />

          {/* Standalone landing pages (entry points per role) */}
          <Route path="/recipient" component={LandingRecipient} />
          <Route path="/provider" component={LandingProvider} />
          <Route path="/patron" component={LandingPatron} />

          {/* Institutional Dashboard */}
          <Route path="/institutional" component={InstitutionalDashboard} />

          {/* Portal hub */}
          <Route path="/portal" component={Portal} />

          {/* Protected cabinets */}
          <ProtectedRoute path="/portal/donor" component={PatronCabinet} role="donor" />
          <ProtectedRoute path="/portal/provider" component={ProviderCabinet} role="provider" />
          <ProtectedRoute path="/portal/beneficiary" component={BeneficiaryCabinet} role="beneficiary" />
          <ProtectedRoute path="/portal/auditor" component={AuditorCabinet} role="supervisor" />

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
