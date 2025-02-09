import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, Activity, LineChart, 
  ClipboardCheck, UserCheck, Timer,
  GitMerge, Route
} from "lucide-react";

const clientJourneySteps = [
  {
    icon: UserCheck,
    title: "Initial Contact",
    description: "First meeting and needs assessment",
    details: "Comprehensive evaluation of veteran's needs and current situation"
  },
  {
    icon: ClipboardCheck,
    title: "Diagnosis",
    description: "Professional assessment using WHO-approved tools",
    details: "Using standardized PTSD and trauma assessment protocols"
  },
  {
    icon: GitMerge,
    title: "Treatment Selection",
    description: "Customized therapy plan",
    details: "CBT, EMDR, or somatic therapy based on individual needs"
  },
  {
    icon: Timer,
    title: "Progress Monitoring",
    description: "Regular assessment and adjustment",
    details: "Tracking improvement using validated measurement tools"
  }
];

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
              src="https://images.unsplash.com/photo-1612538498456-e861df91d4d0"
              alt="Male veteran receiving professional counseling"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our methodology is grounded in evidence-based practices, specifically
              tailored for veterans affected by war trauma.
            </p>
          </div>
        </div>

        {/* Client Journey Flow Chart */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Client Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {clientJourneySteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <step.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {/* Hover Details */}
                    <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                      <p className="text-sm">{step.details}</p>
                    </div>
                  </CardContent>
                </Card>
                {index < clientJourneySteps.length - 1 && (
                  <Route className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 rotate-90 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Evidence-Based Methods</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Cognitive Behavioral Therapy</li>
                <li>EMDR Trauma Treatment</li>
                <li>Somatic Experience</li>
                <li>Group Support Sessions</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  All methods are WHO-approved and adapted for conflict zones
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <Activity className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Treatment Process</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Initial Assessment</li>
                <li>Customized Treatment Plan</li>
                <li>Regular Progress Review</li>
                <li>Family Integration</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Personalized approach with continuous monitoring
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <LineChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Outcome Tracking</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Symptom Monitoring</li>
                <li>Quality of Life Measures</li>
                <li>Functional Improvement</li>
                <li>Family Feedback</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Regular assessment of treatment effectiveness
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
        </div>
      </motion.div>
    </div>
  );
}