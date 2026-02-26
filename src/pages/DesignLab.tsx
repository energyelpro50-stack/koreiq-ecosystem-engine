import { Cpu, Wifi, Brain, BarChart3, Layout, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import designLabImage from "@/assets/design-lab.jpg";

const focusAreas = [
  { icon: Layout, title: "Smart Infrastructure Architecture", desc: "End-to-end system design for intelligent urban infrastructure." },
  { icon: Wifi, title: "IoT Hardware & Firmware Design", desc: "Custom sensor networks and edge device engineering." },
  { icon: Brain, title: "AI Model Development", desc: "Purpose-built algorithms for real-world prediction and optimization." },
  { icon: BarChart3, title: "Predictive Analytics Systems", desc: "Data-driven insights that prevent failures before they happen." },
  { icon: Cpu, title: "Dashboard UX for Command Centers", desc: "Intuitive interfaces for complex infrastructure management." },
  { icon: Shield, title: "Safety & Emergency Engineering", desc: "Systems that respond in real-time to protect communities." },
];

export default function DesignLab() {
  return (
    <>
      <HeroSection
        headline="KoreIQ Design Lab – Where Intelligent Infrastructure Is Engineered"
        subtext="The KoreIQ Design Lab develops next-generation smart infrastructure solutions integrating AI algorithms, ML prediction engines, IoT sensor networks, edge devices, cloud command centers, and human-centric design."
        primaryCta={{ label: "Collaborate With Our Design Lab", to: "/contact" }}
        image={designLabImage}
      />

      <SectionWrapper>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Focus Areas</h2>
          <p className="text-muted-foreground text-lg">This is where real problems become engineered solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-8 hover:glow-border transition-all duration-300 group"
            >
              <area.icon className="h-10 w-10 text-primary mb-5 group-hover:text-accent transition-colors" />
              <h3 className="font-display font-semibold text-lg mb-3">{area.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/contact">Collaborate With Our Design Lab</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
