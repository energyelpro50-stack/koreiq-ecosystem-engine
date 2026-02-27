import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import cityTraffic from "@/assets/city-traffic.jpg";

const metrics = [
  { value: 10000, suffix: "+", label: "Infrastructure Nodes Connected" },
  { value: 42, suffix: "%", label: "Energy Saved on Average" },
  { value: 35, suffix: "%", label: "Water Conserved" },
  { value: 500, suffix: "+", label: "Emergencies Responded" },
  { value: 99.9, suffix: "%", label: "Downtime Prevented" },
  { value: 50, suffix: "+", label: "Communities Empowered" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold gradient-text">
      {Number.isInteger(value) ? Math.floor(count).toLocaleString() : count.toFixed(1)}{suffix}
    </div>
  );
}

export default function Impact() {
  return (
    <>
      <HeroSection
        headline="Measured Intelligence. Meaningful Impact."
        subtext="Every system we deploy creates measurable improvements in safety, efficiency, and sustainability. Here's the impact so far."
        primaryCta={{ label: "Create Impact With KoreIQ", to: "/contact" }}
        image={cityTraffic}
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-8 text-center hover:glow-border transition-all duration-300"
            >
              <AnimatedCounter value={m.value} suffix={m.suffix} />
              <p className="text-sm text-muted-foreground mt-3 font-display">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link to="/contact">Create Impact With KoreIQ</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
