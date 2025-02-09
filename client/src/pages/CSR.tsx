import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, HandHeart, Scale, ArrowRight } from "lucide-react";

export default function CSR() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Corporate Social Responsibility</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1504805572947-34fad45aed93"
              alt="Corporate partnership"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Partner with Us</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join Feel Connect in making a lasting impact on mental health support 
              in Ukraine. Our corporate partnerships create meaningful change while 
              aligning with your organization's social responsibility goals.
            </p>
            <Button className="inline-flex items-center gap-2">
              Become a Partner <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Corporate Programs</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Employee mental health support</li>
                <li>Workplace wellness programs</li>
                <li>Crisis response training</li>
                <li>Community engagement</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <HandHeart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Impact Areas</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Mental health access</li>
                <li>Professional development</li>
                <li>Community resilience</li>
                <li>Sustainable support systems</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Scale className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Partnership Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Social impact reporting</li>
                <li>Employee engagement</li>
                <li>Brand alignment</li>
                <li>Community recognition</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Corporate Partnership Opportunities</h2>
          <p>
            Feel Connect offers various ways for corporations to contribute to mental 
            health support in Ukraine while meeting their CSR objectives:
          </p>

          <h3>Financial Support</h3>
          <ul>
            <li>Program funding partnerships</li>
            <li>Infrastructure development</li>
            <li>Professional training sponsorship</li>
            <li>Research and development support</li>
          </ul>

          <h3>In-Kind Contributions</h3>
          <ul>
            <li>Professional services</li>
            <li>Technology resources</li>
            <li>Facility access</li>
            <li>Marketing and communications support</li>
          </ul>

          <h2>Impact Measurement and Reporting</h2>
          <p>
            We provide comprehensive impact reports to our corporate partners, 
            demonstrating the tangible results of their support:
          </p>
          <ul>
            <li>Quarterly impact metrics</li>
            <li>Beneficiary testimonials</li>
            <li>Program outcome data</li>
            <li>Social return on investment analysis</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
