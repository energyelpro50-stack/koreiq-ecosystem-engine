import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bus, Armchair, Siren, CloudLightning, Lightbulb, LayoutDashboard, Users, Zap, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import communityImage from "@/assets/community-people.jpg";
import smartBusStop from "@/assets/smart-bus-stop.png";
import smartBench from "@/assets/smart-bench.jpg";
import emergencyPole from "@/assets/emergency-pole.png";
import disasterManagement from "@/assets/disaster-management.jpg";
import smartPole from "@/assets/smart-pole.jpg";
import smartCityDashboard from "@/assets/smart-city-dashboard.png";

const solutions = [
  {
    icon: Bus,
    title: "Smart Bus Stops",
    features: ["Real-time passenger information", "Surveillance integration", "Energy-efficient systems", "Centralized monitoring"],
    impact: "Safer public mobility.",
    cta: "Build Smart Transit Systems",
    image: smartBusStop,
  },
  {
    icon: Armchair,
    title: "Smart Benches",
    features: ["Solar-powered", "Charging points", "Environmental sensors", "Data connectivity"],
    impact: "Smart public spaces.",
    cta: "Create Intelligent Public Spaces",
    image: smartBench,
  },
  {
    icon: Siren,
    title: "Smart Emergency Response Systems",
    features: ["Emergency call systems", "Real-time alerts", "Command center linkage", "Audio-visual signaling"],
    impact: "Faster response. Saved lives.",
    cta: "Enhance Public Safety",
    image: emergencyPole,
  },
  {
    icon: CloudLightning,
    title: "Disaster Management Systems",
    features: ["Early warning systems", "Environmental monitoring", "Predictive risk analytics", "Crisis dashboards"],
    impact: "Prepared cities save lives.",
    cta: "Strengthen Disaster Preparedness",
    image: disasterManagement,
  },
  {
    icon: Lightbulb,
    title: "Smart Poles",
    features: ["Integrated lighting", "CCTV integration", "Environmental sensors", "EV charging & public Wi-Fi"],
    impact: "Multi-utility intelligent urban infrastructure.",
    cta: "Deploy Smart Urban Infrastructure",
    image: smartPole,
  },
  {
    icon: LayoutDashboard,
    title: "Smart City Dashboards",
    features: ["Unified command & control", "Real-time data visualization", "Traffic & infrastructure integration", "AI-driven alerts"],
    impact: "Intelligent governance.",
    cta: "Enable Smart Governance",
    image: smartCityDashboard,
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
        image={communityImage}
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
                {sol.image && (
                  <div className="flex-shrink-0 w-full lg:w-72 xl:w-80">
                    <div className="rounded-xl overflow-hidden border border-border/50">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        className="w-full h-48 lg:h-52 object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                {!sol.image && (
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <sol.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {sol.image && (
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <sol.icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <h3 className="font-display font-bold text-xl md:text-2xl">{sol.title}</h3>
                  </div>
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
