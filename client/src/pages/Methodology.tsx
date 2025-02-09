import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Activity, LineChart } from "lucide-react";

export default function Methodology() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Evidence-Based Interventions for War Trauma</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1590402494587-44b71d7772f6"
              alt="Veteran receiving counseling"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our methodology is grounded in evidence-based practices, specifically
              tailored for veterans and their families affected by war trauma.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Clinical interviews</li>
                <li>PTSD screening tools</li>
                <li>Trauma impact evaluation</li>
                <li>Family support assessment</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Using WHO-approved assessment tools adapted for conflict zones
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <Activity className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Therapy</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Cognitive Behavioral Therapy</li>
                <li>EMDR for trauma</li>
                <li>Group support sessions</li>
                <li>Family counseling</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Evidence-based interventions following international protocols
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <LineChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Monitoring</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Progress tracking</li>
                <li>Symptom monitoring</li>
                <li>Outcome measurement</li>
                <li>Long-term follow-up</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Regular assessment of treatment effectiveness and recovery progress
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Quality Assurance</h2>
          <p>
            All our therapeutic methods are approved by the World Health Organization
            and specifically adapted for conflict zones. Our approach emphasizes:
          </p>
          <ul>
            <li>Regular supervision and professional development</li>
            <li>Evidence-based practice updates</li>
            <li>Cultural competency training</li>
            <li>Trauma-informed care principles</li>
          </ul>

          <h2>Client Journey</h2>
          <p>
            From initial contact to ongoing support, we ensure a clear and supportive
            path to recovery:
          </p>
          <ol>
            <li>Initial assessment and needs evaluation</li>
            <li>Personalized treatment plan development</li>
            <li>Regular therapy sessions and progress monitoring</li>
            <li>Ongoing support and community integration</li>
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
