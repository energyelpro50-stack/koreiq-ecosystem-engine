import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent!", description: "Our team will get back to you shortly." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <>
      <HeroSection
        headline="Let's Engineer a Smarter Future Together"
        subtext="Every infrastructure system can become intelligent. Every community deserves safer, smarter environments."
        primaryCta={{ label: "Start a Conversation", to: "#contact-form" }}
        secondaryCta={{ label: "Request a Consultation", to: "#contact-form" }}
      />

      <SectionWrapper id="contact-form">
        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="font-display font-bold text-2xl">Get in Touch</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Name</label>
                <Input required placeholder="Your name" className="bg-secondary/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                <Input required type="email" placeholder="your@email.com" className="bg-secondary/50 border-border/50" />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Organization</label>
              <Input placeholder="Your organization" className="bg-secondary/50 border-border/50" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">How can we help?</label>
              <Textarea required placeholder="Tell us about your infrastructure challenge..." rows={5} className="bg-secondary/50 border-border/50" />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              <Send className="h-4 w-4 mr-2" />
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </SectionWrapper>
    </>
  );
}
