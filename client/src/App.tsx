import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

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
import OpenData from "@/pages/OpenData";
import Referral from "@/pages/Referral";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pro" component={ForProfessionals} />
          <Route path="/training" component={Training} />
          <Route path="/donors" component={ForDonors} />
          <Route path="/beneficiaries" component={ForBeneficiaries} />
          <Route path="/about" component={About} />
          <Route path="/methodology" component={Methodology} />
          <Route path="/data" component={OpenData} />
          <Route path="/referral" component={Referral} />
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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
