import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Nassim Moussaoui. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Built with <Heart size={14} className="text-primary" /> using React & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
