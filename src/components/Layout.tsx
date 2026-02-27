import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Design Lab", path: "/design-lab" },
  { label: "Solutions", path: "/solutions" },
  { label: "Technology", path: "/technology" },
  { label: "Sustainability", path: "/sustainability" },
  { label: "Impact", path: "/impact" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-display text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              KoreIQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="default" size="sm" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant="default" size="sm" className="mt-2" asChild>
                  <Link to="/contact" onClick={() => setMenuOpen(false)}>Get in Touch</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-primary-foreground">K</span>
                </div>
                <span className="font-display text-lg font-bold">KoreIQ</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                Engineering Intelligence for Real-World Impact.
              </p>
              <p className="text-xs text-accent">A DPIIT Recognised Startup</p>
              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                <p>Bangalore, India</p>
                <p><a href="mailto:admin@koreiq.com" className="hover:text-primary transition-colors">admin@koreiq.com</a></p>
                <p><a href="tel:+918431772325" className="hover:text-primary transition-colors">+91 8431772325</a></p>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Smart Bus Stops</Link></li>
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Smart Poles</Link></li>
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Emergency Systems</Link></li>
                <li><Link to="/solutions" className="hover:text-foreground transition-colors">Energy Systems</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/design-lab" className="hover:text-foreground transition-colors">Design Lab</Link></li>
                <li><Link to="/impact" className="hover:text-foreground transition-colors">Impact</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/technology" className="hover:text-foreground transition-colors">Technology</Link></li>
                <li><Link to="/sustainability" className="hover:text-foreground transition-colors">Sustainability</Link></li>
              </ul>
            </div>
          </div>
          <div className="section-divider mt-12 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2020–{new Date().getFullYear()} KoreIQ Technologies Pvt Ltd. All rights reserved.</p>
            <p className="italic text-xs">One World Through Connectivity & Control.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
