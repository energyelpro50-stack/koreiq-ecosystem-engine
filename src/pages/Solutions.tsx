import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bus, Armchair, Siren, CloudLightning, Lightbulb, LayoutDashboard, Users, Zap, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";

const solutions = [
  {
    icon: Bus,
    title: "Smart Bus Stops",
    features: ["Real-time passenger information", "Surveillance integration", "Energy-efficient systems", "Centralized monitoring"],
    impact: "Safer public mobility.",
    cta: "Build Smart Transit Systems",
  },
  {
    icon: Armchair,
    title: "Smart Benches",
    features: ["Solar-powered", "Charging points", "Environmental sensors", "Data connectivity"],
    impact: "Smart public spaces.",
    cta: "Create Intelligent Public Spaces",
  },
  {
    icon: Siren,
    title: "Smart Emergency Response Systems",
    features: ["Emergency call systems", "Real-time alerts", "Command center linkage", "Audio-visual signaling"],
    impact: "Faster response. Saved lives.",
    cta: "Enhance Public Safety",
  },
  {
    icon: CloudLightning,
    title: "Disaster Management Systems",
    features: ["Early warning systems", "Environmental monitoring", "Predictive risk analytics", "Crisis dashboards"],
    impact: "Prepared cities save lives.",
    cta: "Strengthen Disaster Preparedness",
  },
  {
    icon: Lightbulb,
    title: "Smart Poles",
    features: ["Integrated lighting", "CCTV integration", "Environmental sensors", "EV charging & public Wi-Fi"],
    impact: "Multi-utility intelligent urban infrastructure.",
    cta: "Deploy Smart Urban Infrastructure",
  },
  {
    icon: LayoutDashboard,
    title: "Smart City Dashboards",
    features: ["Unified command & control", "Real-time data visualization", "Traffic & infrastructure integration", "AI-driven alerts"],
    impact: "Intelligent governance.",
    cta: "Enable Smart Governance",
  },
  {
    icon: Users,
    title: "Citizen & Community Dashboards",
    features: ["Transparency portals", "Public asset monitoring", "Community safety dashboards", "Utility consumption tracking"],
    impact: "Empowered communities.",
    cta: "Empower Your Citizens",
  },
  {
    icon: Zap,
    title: "Energy Control & Efficiency Systems",
    features: ["AI-based load optimization", "Fault detection", "Renewable integration", "Centralized energy dashboards"],
    impact: "Lower costs. Lower emissions.",
    cta: "Optimize Energy Performance",
  },
  {
    icon: Droplets,
    title: "Water Monitoring & Efficiency Systems",
    features: ["Leak detection", "Pressure monitoring", "Consumption analytics", "Predictive maintenance"],
    impact: "Sustainable water management.",
    cta: "Make Water Intelligent",
  },
];

export default function Solutions() {
  return (
    <>
      <HeroSection
        headline="Intelligent Products Designed Around Real Needs"
        subtext="Every solution we build starts with a real problem faced by real communities. Our products integrate seamlessly into urban infrastructure, making cities safer, smarter, and more sustainable."
        primaryCta={{ label: "Explore All Solutions", to: "#solutions-grid" }}
      />

      <SectionWrapper id="solutions-grid">
        <div className="space-y-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card p-8 md:p-10 hover:glow-border transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <sol.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl md:text-2xl mb-3">{sol.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {sol.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <p className="text-accent font-display font-semibold text-sm mb-4">Impact: {sol.impact}</p>
                  <Button size="sm" asChild>
                    <Link to="/contact">{sol.cta}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
