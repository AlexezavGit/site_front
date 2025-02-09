import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Sustainable from "@/pages/Sustainable";
import Sources from "@/pages/Sources";
import Capacity from "@/pages/Capacity";
import Referral from "@/pages/Referral";
import CSR from "@/pages/CSR";
import Data from "@/pages/Data";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/sustainable" component={Sustainable} />
          <Route path="/sources" component={Sources} />
          <Route path="/capacity" component={Capacity} />
          <Route path="/referral" component={Referral} />
          <Route path="/csr" component={CSR} />
          <Route path="/data" component={Data} />
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
