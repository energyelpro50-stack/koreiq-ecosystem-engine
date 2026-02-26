import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";

export default function About() {
  return (
    <>
      <HeroSection
        headline="Technology With Purpose"
        subtext="Founded in 2020, KoreIQ was built to bridge the gap between infrastructure and intelligence. We believe every city, every community, every system can be made smarter — and that intelligence should serve people first."
        primaryCta={{ label: "Partner With KoreIQ", to: "/contact" }}
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <h2 className="font-display font-bold text-2xl mb-4 gradient-text">Our Vision</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              One World Through Connectivity & Control.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We envision a world where every piece of critical infrastructure is connected, intelligent, and working to protect and serve the communities that depend on it. From energy grids to water systems, from public safety networks to smart urban spaces — KoreIQ is engineering the intelligence layer that makes it all possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10"
          >
            <h2 className="font-display font-bold text-2xl mb-4 gradient-text">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To engineer intelligent systems that solve real-world infrastructure problems — making communities safer, smarter, more efficient, more sustainable, and more resilient. We combine AI, ML, IoT, cloud, edge computing, and advanced analytics to deliver connected control systems that create measurable impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10"
          >
            <h2 className="font-display font-bold text-2xl mb-4 gradient-text">Our Tagline</h2>
            <p className="text-2xl font-display font-bold text-foreground">
              Engineering Intelligence for Real-World Impact.
            </p>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/contact">Partner With KoreIQ</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
