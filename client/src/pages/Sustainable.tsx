import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Users, ArrowRight } from "lucide-react";

export default function Sustainable() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Sustainable Development</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c"
              alt="Community support meeting"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Building Lasting Change</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our sustainable development approach focuses on creating long-term solutions 
              for mental health support in Ukraine. We believe in empowering local professionals 
              and building resilient support systems.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="text-primary" />
                <span>Supporting private practice development</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="text-primary" />
                <span>Building professional networks</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="text-primary" />
                <span>Enhancing accessibility to mental health services</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Professional Development</h3>
              <p className="text-muted-foreground">
                Supporting psychologists in establishing and maintaining successful 
                private practices through training and resources.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quality Care</h3>
              <p className="text-muted-foreground">
                Ensuring high standards of mental health care through ongoing 
                education and supervision.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Building</h3>
              <p className="text-muted-foreground">
                Creating networks of support among professionals and communities 
                affected by trauma.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Our Sustainable Development Goals</h2>
          <p>
            Feel Connect is committed to creating a sustainable mental health support 
            system that can serve the needs of communities long after the immediate 
            crisis has passed. We focus on:
          </p>
          
          <ul>
            <li>
              Building capacity within the local mental health professional community
            </li>
            <li>
              Developing sustainable funding models for private practice
            </li>
            <li>
              Creating lasting support networks and referral systems
            </li>
            <li>
              Implementing evidence-based practices adapted to local needs
            </li>
          </ul>

          <h2>Long-term Impact</h2>
          <p>
            Our sustainable development approach ensures that the positive changes we 
            create today will continue to benefit communities for years to come. By 
            investing in professional development and building strong networks, we're 
            creating a resilient mental health support system.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
