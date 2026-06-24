import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function Sources() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Information Sources</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1484981138541-3d074aa97716"
              alt="Professional resources"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Evidence-Based Resources</h2>
            <p className="text-lg text-muted-foreground">
              Our work is grounded in evidence-based practices and informed by leading 
              research in trauma-informed care, crisis response, and mental health 
              support. We carefully curate and verify all our information sources to 
              ensure the highest quality of care.
            </p>
          </div>
        </div>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Academic Sources</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Journal of Traumatic Stress",
                    url: "https://istss.org/journals"
                  },
                  {
                    title: "European Journal of Psychotraumatology",
                    url: "https://www.tandfonline.com/journals/zept20"
                  },
                  {
                    title: "Psychological Trauma: Theory, Research, Practice, and Policy",
                    url: "https://www.apa.org/pubs/journals/tra"
                  }
                ].map((source) => (
                  <div key={source.url} className="flex items-center justify-between">
                    <span>{source.title}</span>
                    <a 
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Visit <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Professional Organizations</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "World Health Organization - Mental Health",
                    url: "https://www.who.int/health-topics/mental-health"
                  },
                  {
                    title: "International Society for Traumatic Stress Studies",
                    url: "https://istss.org"
                  },
                  {
                    title: "European Society for Traumatic Stress Studies",
                    url: "https://estss.org"
                  }
                ].map((org) => (
                  <div key={org.url} className="flex items-center justify-between">
                    <span>{org.title}</span>
                    <a 
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Visit <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Research Methodology</h2>
          <p>
            Our approach to gathering and implementing information follows a rigorous 
            methodology that ensures we provide the most effective and appropriate 
            support for our communities. This includes:
          </p>
          
          <ul>
            <li>Regular review of current research and best practices</li>
            <li>Consultation with leading experts in trauma and crisis response</li>
            <li>Integration of local cultural context and needs</li>
            <li>Continuous evaluation and adaptation of our programs</li>
          </ul>

          <h2>Quality Assurance</h2>
          <p>
            All information sources used in our programs undergo thorough verification 
            and are regularly updated to reflect the latest developments in mental 
            health support and trauma care. We maintain close relationships with 
            academic institutions and professional organizations to ensure access to 
            the most current and reliable information.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
