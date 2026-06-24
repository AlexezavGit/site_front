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
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ArrowRight } from "lucide-react";

// PTSD symptom reduction data
const ptsdData = [
  { month: "Jan", baseline: 85, current: 65 },
  { month: "Feb", baseline: 82, current: 60 },
  { month: "Mar", baseline: 78, current: 52 },
  { month: "Apr", baseline: 75, current: 48 },
  { month: "May", baseline: 70, current: 42 },
  { month: "Jun", baseline: 68, current: 40 },
];

// Impact chain data
const impactChainSteps = [
  {
    title: "Donor Support",
    value: "100%",
    description: "Initial funding and resources"
  },
  {
    title: "Professional Training",
    value: "1000+",
    description: "Mental health specialists trained"
  },
  {
    title: "Treatment Hours",
    value: "50,000+",
    description: "Hours of therapy provided"
  },
  {
    title: "PTSD Reduction",
    value: "40%",
    description: "Average symptom reduction"
  }
];

// Beneficiary breakdown
const beneficiaryData = [
  { name: "Veterans", value: 60 },
  { name: "Family Members", value: 40 }
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))'];

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
              alt="Male veteran during rehabilitation session"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Chain of Impact</h2>
            <div className="space-y-6">
              {impactChainSteps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{step.value}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < impactChainSteps.length - 1 && (
                      <ArrowRight className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
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
                      name="Initial Assessment" 
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
              <h3 className="text-xl font-semibold mb-6">Beneficiary Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={beneficiaryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {beneficiaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Key Achievements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3>Treatment Outcomes</h3>
              <ul>
                <li>40% average reduction in PTSD symptoms</li>
                <li>85% program completion rate</li>
                <li>90% participant satisfaction rate</li>
              </ul>
            </div>
            <div>
              <h3>Capacity Building</h3>
              <ul>
                <li>1000+ mental health professionals trained</li>
                <li>20 community support centers established</li>
                <li>30% reduction in long-term care dependency</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}