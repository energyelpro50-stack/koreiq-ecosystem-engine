import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  headline: string;
  subtext: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  image?: string;
  overlay?: boolean;
}

export default function HeroSection({ headline, subtext, primaryCta, secondaryCta, image, overlay = true }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" />
          {overlay && <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />}
        </div>
      )}
      {!image && <div className="absolute inset-0 hero-gradient mesh-bg" />}
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-balance glow-text">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            {subtext}
          </p>
          <div className="flex flex-wrap gap-4">
            {primaryCta && (
              <Button size="lg" className="text-base px-8" asChild>
                <Link to={primaryCta.to}>{primaryCta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" className="text-base px-8 border-border/60 hover:bg-secondary" asChild>
                <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
