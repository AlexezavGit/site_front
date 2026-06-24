import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Impact from "@/pages/Impact";
import Methodology from "@/pages/Methodology";
import ForDonors from "@/pages/ForDonors";
import Stories from "@/pages/Stories";
import Referral from "@/pages/Referral";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/impact" component={Impact} />
          <Route path="/methodology" component={Methodology} />
          <Route path="/for-donors" component={ForDonors} />
          <Route path="/stories" component={Stories} />
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