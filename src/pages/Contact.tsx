import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, MapPin, Mail, Phone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import engineeringCrew from "@/assets/engineering-crew.jpg";

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const organization = (formData.get("organization") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!name || !email || !message) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, organization, message },
      });

      if (error) throw error;

      toast({ title: "Message sent!", description: "Our team will get back to you shortly." });
      (e.target as HTMLFormElement).reset();
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeroSection
        headline="Let's Engineer a Smarter Future Together"
        subtext="Every infrastructure system can become intelligent. Every community deserves safer, smarter environments."
        primaryCta={{ label: "Start a Conversation", to: "#contact-form" }}
        secondaryCta={{ label: "Request a Consultation", to: "#contact-form" }}
        image={engineeringCrew}
      />

      <SectionWrapper id="contact-form">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl">
              Contact <span className="gradient-text">Details</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Reach out to us to discuss how we can help transform your infrastructure with intelligent systems.
            </p>

            <div className="space-y-5 pt-2">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">Company</p>
                  <p className="text-sm text-muted-foreground">KoreIQ Technologies Pvt. Ltd.</p>
                  <p className="text-xs text-accent mt-0.5">A DPIIT Recognised Startup</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">Address</p>
                  <p className="text-sm text-muted-foreground">Bangalore, India</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">Email</p>
                  <a href="mailto:admin@koreiq.com" className="text-sm text-primary hover:underline">admin@koreiq.com</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">Mobile</p>
                  <a href="tel:+918431772325" className="text-sm text-primary hover:underline">+91 8431772325</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card p-8 md:p-10 space-y-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="font-display font-bold text-xl">Send Us a Message</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Name *</label>
                <Input name="name" required placeholder="Your name" className="bg-secondary/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email *</label>
                <Input name="email" required type="email" placeholder="your@email.com" className="bg-secondary/50 border-border/50" />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Organization</label>
              <Input name="organization" placeholder="Your organization" className="bg-secondary/50 border-border/50" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">How can we help? *</label>
              <Textarea name="message" required placeholder="Tell us about your infrastructure challenge..." rows={5} className="bg-secondary/50 border-border/50" />
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
