import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Users, Trophy, ArrowRight } from "lucide-react";

export default function Capacity() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Capacity Building</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Professional development session"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Strengthening Professional Capabilities</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our capacity building program focuses on enhancing the skills and resources 
              of mental health professionals to better serve communities affected by trauma.
            </p>
            <Button className="inline-flex items-center gap-2">
              Join Our Network <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Book className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Training Programs</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Trauma-informed care</li>
                <li>Crisis intervention</li>
                <li>Private practice management</li>
                <li>Professional ethics</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mentorship</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Peer support groups</li>
                <li>Expert supervision</li>
                <li>Case consultations</li>
                <li>Professional networking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Clinical tools</li>
                <li>Research access</li>
                <li>Best practice guides</li>
                <li>Assessment materials</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Our Approach to Capacity Building</h2>
          <p>
            Feel Connect's capacity building initiative takes a comprehensive approach 
            to strengthening the mental health support system in Ukraine. We focus on 
            both individual professional development and systemic improvements.
          </p>

          <h3>Key Focus Areas</h3>
          <ul>
            <li>
              <strong>Professional Development:</strong> Ongoing training and education 
              in evidence-based practices
            </li>
            <li>
              <strong>Practice Management:</strong> Support in establishing and 
              maintaining successful private practices
            </li>
            <li>
              <strong>Network Building:</strong> Creating sustainable professional 
              networks and support systems
            </li>
            <li>
              <strong>Quality Assurance:</strong> Implementing standards and best 
              practices in mental health care
            </li>
          </ul>

          <h2>Impact Measurement</h2>
          <p>
            We regularly assess the effectiveness of our capacity building programs 
            through:
          </p>
          <ul>
            <li>Professional competency assessments</li>
            <li>Practice sustainability metrics</li>
            <li>Client outcome measurements</li>
            <li>Network growth indicators</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
