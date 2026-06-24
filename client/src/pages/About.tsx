import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">About Feel Connect</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
              alt="Professional counseling session"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Feel Connect is dedicated to providing crucial mental health support to 
              individuals affected by the war in Ukraine while fostering the sustainable 
              development of the private practice psychologist labor market.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe in creating lasting positive change by connecting those in need 
              with qualified mental health professionals and building a robust support network.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Compassion and Understanding</li>
                <li>Professional Excellence</li>
                <li>Sustainable Development</li>
                <li>Community Support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Evidence-based Treatment</li>
                <li>Trauma-informed Care</li>
                <li>Cultural Sensitivity</li>
                <li>Continuous Learning</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Our Impact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Thousands Supported</li>
                <li>Growing Professional Network</li>
                <li>Community Building</li>
                <li>Sustainable Change</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Our History</h2>
          <p>
            Founded in response to the growing mental health crisis in Ukraine, 
            Feel Connect has evolved into a comprehensive support system that bridges 
            the gap between those seeking help and qualified mental health professionals.
          </p>
          
          <h2>Looking Forward</h2>
          <p>
            We continue to expand our reach and impact through innovative programs, 
            professional development initiatives, and community-building efforts. 
            Our vision is to create a sustainable and accessible mental health support 
            system that serves as a model for crisis response and recovery.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
