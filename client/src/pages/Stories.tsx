import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function Stories() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Recovery Stories</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1601582589907-f92af5ed9db8"
              alt="Veterans support group"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Journey to Recovery</h2>
            <p className="text-lg text-muted-foreground">
              Real stories of strength, resilience, and healing from veterans and
              their families who have participated in our programs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="relative">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6">
                "Through the program, I found the strength to face my experiences and
                rebuild my life. The support from the therapists and fellow veterans
                was invaluable."
              </blockquote>
              <footer className="text-muted-foreground">
                <strong>Andriy</strong>
                <br />
                Combat Veteran, 35
              </footer>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6">
                "The family counseling sessions helped us understand and support each
                other better. We're stronger together now."
              </blockquote>
              <footer className="text-muted-foreground">
                <strong>Mykola and Family</strong>
                <br />
                Veteran Family, Kyiv
              </footer>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
                alt="Community support meeting"
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Peer Support Groups</h3>
              <p className="text-muted-foreground">
                Veterans helping veterans through shared experiences and understanding
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a"
                alt="Professional therapy session"
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Professional Care</h3>
              <p className="text-muted-foreground">
                Evidence-based therapy with trained trauma specialists
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a"
                alt="Family support"
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Family Integration</h3>
              <p className="text-muted-foreground">
                Supporting families through the recovery journey
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Program Impact</h2>
          <p>
            These stories represent just a few of the many lives transformed through
            our comprehensive support programs. Each journey is unique, but all share
            common threads of resilience, hope, and recovery.
          </p>

          <h2>Get Involved</h2>
          <p>
            If you're a veteran or family member looking for support, or if you'd
            like to share your story to inspire others, we welcome you to connect
            with our community.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
