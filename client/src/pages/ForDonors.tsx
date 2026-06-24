import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Presentation, FileText, ArrowRight } from "lucide-react";

export default function ForDonors() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Partner With Us</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
              alt="Professional team meeting"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Impact Investment</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Your support directly contributes to building sustainable mental health
              support systems in Ukraine, with measurable impact and transparent
              reporting.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ArrowRight className="text-primary" />
                <span>$100 provides 10 hours of therapy for veterans</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="text-primary" />
                <span>$1000 trains one local mental health specialist</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="text-primary" />
                <span>$10000 establishes a community support center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Presentation className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Project Proposals</h3>
              <p className="text-muted-foreground mb-4">
                Access our detailed project proposals and logframes
              </p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Proposal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Impact Reports</h3>
              <p className="text-muted-foreground mb-4">
                View our latest impact assessment and financial reports
              </p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="h-12 w-12 text-primary mb-4 grid place-items-center text-2xl font-bold">
                $
              </div>
              <h3 className="text-xl font-semibold mb-3">Budget Templates</h3>
              <p className="text-muted-foreground mb-4">
                Access our standardized budget templates and forecasts
              </p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Budget
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Partnership Framework</h2>
          <p>
            Our partnerships are built on transparency, accountability, and measurable
            impact. We provide:
          </p>
          <ul>
            <li>Quarterly progress reports and impact metrics</li>
            <li>Regular site visits and stakeholder meetings</li>
            <li>Custom reporting aligned with donor requirements</li>
            <li>Recognition and visibility opportunities</li>
          </ul>

          <h2>Sustainable Development Goals</h2>
          <p>
            Our work directly contributes to SDG 3 (Good Health and Well-being) and
            SDG 17 (Partnerships for the Goals), creating lasting positive change in
            communities affected by conflict.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
