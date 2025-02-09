import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const impactData = [
  { name: "2021", beneficiaries: 1200, professionals: 45 },
  { name: "2022", beneficiaries: 2800, professionals: 78 },
  { name: "2023", beneficiaries: 4500, professionals: 120 },
];

const satisfactionData = [
  { name: "Q1 2023", rating: 4.2 },
  { name: "Q2 2023", rating: 4.4 },
  { name: "Q3 2023", rating: 4.6 },
  { name: "Q4 2023", rating: 4.7 },
];

export default function Data() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Impact Data & Statistics</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35"
              alt="Data analysis"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Measuring Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              We believe in transparency and data-driven decision making. Our impact 
              measurements help us continuously improve our services and demonstrate 
              the effectiveness of our programs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-6">Program Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="beneficiaries" name="Beneficiaries" fill="hsl(var(--primary))" />
                    <Bar dataKey="professionals" name="Professionals" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-6">Client Satisfaction</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="rating" name="Satisfaction Rating" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Key Performance Indicators</h2>
          <p>
            Our success is measured through various indicators that reflect both the 
            immediate impact of our services and long-term sustainable development:
          </p>

          <h3>Service Delivery</h3>
          <ul>
            <li>Number of beneficiaries served</li>
            <li>Session completion rates</li>
            <li>Average response time</li>
            <li>Geographic coverage</li>
          </ul>

          <h3>Professional Development</h3>
          <ul>
            <li>Number of active professionals</li>
            <li>Training completion rates</li>
            <li>Professional retention rates</li>
            <li>Practice sustainability metrics</li>
          </ul>

          <h3>Quality Metrics</h3>
          <ul>
            <li>Client satisfaction scores</li>
            <li>Outcome assessments</li>
            <li>Professional satisfaction rates</li>
            <li>Program effectiveness measures</li>
          </ul>

          <h2>Research and Evaluation</h2>
          <p>
            We continuously evaluate our programs through rigorous research methods, 
            including:
          </p>
          <ul>
            <li>Regular outcome assessments</li>
            <li>Client feedback surveys</li>
            <li>Professional development tracking</li>
            <li>Program impact studies</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
