import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Droplets, Zap, Shield, Clock, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import heroImage from "@/assets/hero-city.jpg";

const problems = [
  { icon: Zap, title: "Energy Waste", desc: "Billions lost to inefficient power distribution and unoptimized consumption." },
  { icon: Droplets, title: "Water Leakage", desc: "Up to 40% of treated water lost before reaching consumers." },
  { icon: Shield, title: "Unsafe Public Spaces", desc: "Communities without real-time safety monitoring remain vulnerable." },
  { icon: Clock, title: "Delayed Response", desc: "Emergency systems that can't react in real-time cost lives." },
  { icon: Building, title: "Infrastructure Failures", desc: "Aging systems without predictive maintenance collapse without warning." },
  { icon: AlertTriangle, title: "Disaster Unpreparedness", desc: "Cities without early-warning intelligence face catastrophic losses." },
];

export default function Index() {
  return (
    <>
      <HeroSection
        headline="Intelligence That Protects Cities. Optimizes Infrastructure. Empowers Communities."
        subtext="AI-powered connected ecosystems transforming energy, water, public infrastructure, and urban safety."
        primaryCta={{ label: "Solve a Challenge With Us", to: "/contact" }}
        secondaryCta={{ label: "Explore Our Solutions", to: "/solutions" }}
        image={heroImage}
      />

      {/* Emotional Anchor */}
      <SectionWrapper className="text-center">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-display font-medium leading-relaxed italic text-foreground/90">
            "We don't build technology for machines.
            <br />
            <span className="gradient-text not-italic font-bold">We build intelligent systems that protect people, conserve resources, and empower communities.</span>"
          </p>
        </motion.blockquote>
      </SectionWrapper>

      <div className="section-divider" />

      {/* Problem Section */}
      <SectionWrapper>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Infrastructure Without Intelligence <span className="gradient-text">Fails People</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The world's critical systems are breaking — not because they lack capacity, but because they lack intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-6 hover:glow-border transition-all duration-300 group"
            >
              <p.icon className="h-8 w-8 text-primary mb-4 group-hover:text-accent transition-colors" />
              <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/contact">Talk to Our Experts</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Tech Stack Strip */}
      <div className="section-divider" />
      <SectionWrapper className="text-center">
        <p className="text-sm font-display uppercase tracking-[0.3em] text-muted-foreground mb-8">Powered By</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-foreground/60">
          {["Artificial Intelligence", "Machine Learning", "IoT", "Cloud Technologies", "Edge Computing", "Advanced Analytics"].map((t) => (
            <span key={t} className="text-sm md:text-base font-display font-medium">{t}</span>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
