import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Heart, Users, Brain, ArrowRight, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Long-term Mental Health Support Systems in Ukraine
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Building sustainable, trauma-sensitive humanitarian response through 
            community-led recovery and survivor-centered care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/referral">
              <Button size="lg" className="rounded-full">
                Access Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sustainable">
              <Button variant="outline" size="lg" className="rounded-full">
                Our Sustainable Approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">70%</h3>
              <p className="text-muted-foreground">
                Interventions Led by Local Specialists
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">40%</h3>
              <p className="text-muted-foreground">
                Average PTSD Reduction Rate
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p className="text-muted-foreground">
                Mental Health Professionals Trained
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Scalable Solutions for Mental Health Support
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Trauma-Sensitive Care
                </h3>
                <p className="text-muted-foreground">
                  Evidence-based trauma therapy and crisis intervention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Community-Led Recovery
                </h3>
                <p className="text-muted-foreground">
                  Building local capacity for sustainable support networks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Professional Development
                </h3>
                <p className="text-muted-foreground">
                  Training and certification for mental health specialists
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Cross-Sector Partnerships
                </h3>
                <p className="text-muted-foreground">
                  Collaboration with international organizations and donors
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sustainable Impact</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our WHO Building Back Better-aligned programs create lasting change 
                through locally-led interventions and evidence-based practices, 
                reducing long-term dependency on external support.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-primary" />
                  <span>10-year specialist rotation model</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-primary" />
                  <span>Annual impact audits by international partners</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-primary" />
                  <span>Continuous professional development programs</span>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/data">
                  <Button variant="outline" className="rounded-full">
                    View Impact Data
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                alt="Professional mental health support"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-sm font-medium">
                  "Our sustainable approach ensures long-term support for communities affected by conflict"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}