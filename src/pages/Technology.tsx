import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Radio, Wifi, Brain, Cpu, Zap, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import techImage from "@/assets/technology-flow.jpg";

const steps = [
  { icon: Radio, label: "Sense", desc: "IoT sensors capture real-world data across infrastructure networks." },
  { icon: Wifi, label: "Connect", desc: "Edge and cloud networks transmit data securely at scale." },
  { icon: Brain, label: "Analyze", desc: "AI/ML models extract patterns and predict outcomes." },
  { icon: Cpu, label: "Decide", desc: "Intelligent algorithms make data-driven decisions in real-time." },
  { icon: Zap, label: "Act", desc: "Automated systems execute optimized responses instantly." },
  { icon: RotateCw, label: "Optimize", desc: "Continuous learning improves performance over time." },
];

export default function Technology() {
  return (
    <>
      <HeroSection
        headline="From Sensors to Intelligence to Action"
        subtext="Data is not power. Actionable intelligence is. Our technology pipeline transforms raw data into decisions that protect people and optimize infrastructure."
        primaryCta={{ label: "Explore Our Technology Architecture", to: "/contact" }}
        image={techImage}
      />

      <SectionWrapper>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Intelligence Pipeline</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every KoreIQ system follows a six-stage pipeline that turns raw sensor data into meaningful, automated action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-8 text-center hover:glow-border transition-all duration-300 group relative"
            >
              <div className="absolute top-4 right-4 text-xs font-display font-bold text-primary/40">
                {String(i + 1).padStart(2, "0")}
              </div>
              <step.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:text-accent transition-colors" />
              <h3 className="font-display font-bold text-xl mb-2">{step.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-display font-medium italic text-foreground/80 mb-8"
          >
            "Data is not power. <span className="gradient-text not-italic font-bold">Actionable intelligence is.</span>"
          </motion.p>
          <Button size="lg" asChild>
            <Link to="/contact">Explore Our Technology Architecture</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
