import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bus, Armchair, Siren, CloudLightning, Lightbulb, LayoutDashboard, Users, Zap, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import PageSEO from "@/components/PageSEO";
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
    alt: "AI powered smart bus stop with real-time passenger information display and surveillance",
    schemaDesc: "AI powered smart bus stop with surveillance, passenger information systems, energy management and IoT connectivity.",
  },
  {
    icon: Armchair,
    title: "Smart Benches",
    features: ["Solar-powered", "Charging points", "Environmental sensors", "Data connectivity"],
    impact: "Smart public spaces.",
    cta: "Create Intelligent Public Spaces",
    image: smartBench,
    alt: "Solar powered smart bench with USB charging and environmental sensors for urban infrastructure",
    schemaDesc: "Solar powered smart bench with USB charging, environmental sensors and IoT data connectivity for urban public spaces.",
  },
  {
    icon: Siren,
    title: "Smart Emergency Response Systems",
    features: ["Emergency call systems", "Real-time alerts", "Command center linkage", "Audio-visual signaling"],
    impact: "Faster response. Saved lives.",
    cta: "Enhance Public Safety",
    image: emergencyPole,
    alt: "Smart emergency response pole with one-touch call system and real-time alert capability",
    schemaDesc: "AI powered emergency response system with one-touch calls, real-time alerts and command center integration for public safety.",
  },
  {
    icon: CloudLightning,
    title: "Disaster Management Systems",
    features: ["Early warning systems", "Environmental monitoring", "Predictive risk analytics", "Crisis dashboards"],
    impact: "Prepared cities save lives.",
    cta: "Strengthen Disaster Preparedness",
    image: disasterManagement,
    alt: "AI disaster management system with early warning and predictive risk analytics dashboard",
    schemaDesc: "AI powered disaster management platform with early warning systems, environmental monitoring and predictive risk analytics.",
  },
  {
    icon: Lightbulb,
    title: "Smart Poles",
    features: ["Integrated lighting", "CCTV integration", "Environmental sensors", "EV charging & public Wi-Fi"],
    impact: "Multi-utility intelligent urban infrastructure.",
    cta: "Deploy Smart Urban Infrastructure",
    image: smartPole,
    alt: "Smart pole with integrated lighting, CCTV surveillance, EV charging and environmental sensors",
    schemaDesc: "Multi-utility smart pole with integrated lighting, CCTV, environmental sensors, EV charging and public Wi-Fi for smart cities.",
  },
  {
    icon: LayoutDashboard,
    title: "Smart City Dashboards",
    features: ["Unified command & control", "Real-time data visualization", "Traffic & infrastructure integration", "AI-driven alerts"],
    impact: "Intelligent governance.",
    cta: "Enable Smart Governance",
    image: smartCityDashboard,
    alt: "Smart city command and control dashboard with real-time data visualization and AI driven alerts",
    schemaDesc: "Unified smart city command and control dashboard with real-time visualization, traffic integration and AI-driven alerts.",
  },
  {
    icon: Users,
    title: "Citizen & Community Dashboards",
    features: ["Transparency portals", "Public asset monitoring", "Community safety dashboards", "Utility consumption tracking"],
    impact: "Empowered communities.",
    cta: "Empower Your Citizens",
    alt: "Citizen community dashboard for public asset monitoring and utility consumption tracking",
    schemaDesc: "Citizen infrastructure dashboard with transparency portals, public asset monitoring and utility consumption tracking.",
  },
  {
    icon: Zap,
    title: "Energy Monitoring & Efficiency Systems",
    features: ["AI-based load optimization", "Fault detection", "Renewable integration", "Centralized energy dashboards"],
    impact: "Lower costs. Lower emissions.",
    cta: "Optimize Energy Performance",
    alt: "AI based energy monitoring system with load optimization and centralized energy dashboard",
    schemaDesc: "AI based energy monitoring and efficiency system with load optimization, fault detection and renewable energy integration.",
  },
  {
    icon: Droplets,
    title: "Water Monitoring & Efficiency Systems",
    features: ["Leak detection", "Pressure monitoring", "Consumption analytics", "Predictive maintenance"],
    impact: "Sustainable water management.",
    cta: "Make Water Intelligent",
    alt: "IoT based water monitoring system with leak detection and consumption analytics",
    schemaDesc: "IoT based water monitoring system with leak detection, pressure monitoring, consumption analytics and predictive maintenance.",
  },
];

const productSchemaList = solutions.map((sol) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": sol.title,
  "brand": { "@type": "Brand", "name": "KoreIQ" },
  "description": sol.schemaDesc,
  "category": "Smart City Infrastructure",
}));

export default function Solutions() {
  return (
    <>
      <PageSEO
        title="Smart Bus Stops, Smart Poles & Infrastructure Solutions | KoreIQ"
        description="Explore KoreIQ's AI and IoT powered smart infrastructure solutions including smart bus stops, smart poles, energy monitoring, water monitoring, disaster management and smart city dashboards."
        canonical="https://www.koreiq.com/solutions"
        jsonLd={productSchemaList}
      />

      <HeroSection
        headline="Intelligent Products Designed Around Real Needs"
        subtext="Every solution we build starts with a real problem faced by real communities. Our products integrate seamlessly into urban infrastructure, making cities safer, smarter, and more sustainable."
        primaryCta={{ label: "Explore All Solutions", to: "#solutions-grid" }}
        image={communityImage}
        imageAlt="Community people benefiting from smart city infrastructure solutions"
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
                        alt={sol.alt}
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
                    <h2 className="font-display font-bold text-xl md:text-2xl">{sol.title}</h2>
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

      {/* Internal Links */}
      <div className="section-divider" />
      <SectionWrapper>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold">Explore More</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Design Lab", to: "/design-lab" },
            { label: "Technology Platform", to: "/technology" },
            { label: "Sustainability", to: "/sustainability" },
            { label: "Impact", to: "/impact" },
            { label: "About KoreIQ", to: "/about" },
            { label: "Blog", to: "/blog" },
            { label: "Contact Us", to: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="px-4 py-2 glass-card text-sm font-display font-medium hover:text-primary hover:glow-border transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
