import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Droplets, Zap, Building, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import sustainImage from "@/assets/sustainability.jpg";

const pillars = [
  { icon: Zap, title: "Reduced Energy Waste", desc: "AI-optimized energy distribution cuts waste by predicting demand and balancing loads." },
  { icon: Droplets, title: "Water Conservation", desc: "Intelligent leak detection and pressure monitoring preserve water resources." },
  { icon: Building, title: "Infrastructure Longevity", desc: "Predictive maintenance extends asset lifespan and reduces replacement costs." },
  { icon: Leaf, title: "Emission Reduction", desc: "Smart systems integrate renewables and minimize carbon footprints." },
  { icon: Recycle, title: "Resource Optimization", desc: "Circular economy principles embedded into every system we design." },
];

export default function Sustainability() {
  return (
    <>
      <HeroSection
        headline="Building Intelligence for a Circular Future"
        subtext="Sustainability isn't an add-on — it's engineered into the core of every KoreIQ system. We enable governments and enterprises to build infrastructure that serves both people and the planet."
        primaryCta={{ label: "Build Sustainable Systems With Us", to: "/contact" }}
        image={sustainImage}
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-8 hover:glow-border transition-all duration-300 group"
            >
              <p.icon className="h-10 w-10 text-accent mb-5 group-hover:text-primary transition-colors" />
              <h3 className="font-display font-semibold text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/contact">Build Sustainable Systems With Us</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
