import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

const ptsdData = [
  { month: "Jan", baseline: 85, current: 65 },
  { month: "Feb", baseline: 82, current: 60 },
  { month: "Mar", baseline: 78, current: 52 },
  { month: "Apr", baseline: 75, current: 48 },
  { month: "May", baseline: 70, current: 42 },
  { month: "Jun", baseline: 68, current: 40 },
];

const beneficiariesData = [
  { year: 2021, veterans: 450, families: 280 },
  { year: 2022, veterans: 850, families: 520 },
  { year: 2023, veterans: 1200, families: 750 },
];

export default function Impact() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Our Impact</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1608681299041-cc19878f79f1"
              alt="Veteran rehabilitation"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Measurable Change</h2>
            <p className="text-lg text-muted-foreground">
              Through evidence-based interventions and continuous monitoring, we've
              achieved significant improvements in mental health outcomes for veterans
              and their families.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-6">PTSD Symptom Reduction</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ptsdData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="baseline" 
                      name="Baseline Score" 
                      stroke="hsl(var(--muted-foreground))" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      name="After Treatment" 
                      stroke="hsl(var(--primary))" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-6">Beneficiaries Served</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={beneficiariesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="veterans" name="Veterans" fill="hsl(var(--primary))" />
                    <Bar dataKey="families" name="Family Members" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Key Achievements</h2>
          <ul>
            <li>40% average reduction in PTSD symptoms</li>
            <li>70% of interventions led by trained local specialists</li>
            <li>85% program completion rate</li>
            <li>90% participant satisfaction rate</li>
          </ul>

          <h2>Sustainable Impact</h2>
          <p>
            Our focus on building local capacity and sustainable support systems has
            created lasting positive change in communities:
          </p>
          <ul>
            <li>1000+ mental health professionals trained</li>
            <li>20 community support centers established</li>
            <li>50+ support groups running independently</li>
            <li>30% reduction in long-term care dependency</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
