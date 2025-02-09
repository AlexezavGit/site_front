import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Heart, Users, Brain, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Supporting Mental Health in Ukraine
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connecting those affected by trauma with professional psychological support
          </p>
          <Link href="/referral">
            <Button size="lg" className="rounded-full">
              Get Support Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mental Health Support</h3>
                <p className="text-muted-foreground">
                  Professional psychological assistance for those affected by trauma
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                <p className="text-muted-foreground">
                  Creating networks of support and understanding
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Development</h3>
                <p className="text-muted-foreground">
                  Supporting the growth of mental health professionals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
                alt="Community Support"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Feel Connect has helped thousands of individuals access vital mental health
                support while building a sustainable network of professional care providers.
              </p>
              <Link href="/data">
                <Button variant="outline" className="rounded-full">
                  View Our Impact Data
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
