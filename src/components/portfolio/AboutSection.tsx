import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cpu, Sparkles, Zap } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Brain, label: "Machine Learning", value: "Learning" },
    { icon: Cpu, label: "Python", value: "Intermediate" },
    { icon: Sparkles, label: "AI Projects", value: "Enthusiast" },
    { icon: Zap, label: "Coding", value: "2+ Years" },
  ];

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-2xl" />
              <div className="absolute inset-4 rounded-2xl glass overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 rounded-full border border-primary/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-36 h-36 rounded-full border border-secondary/30"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                  >
                    <Brain className="w-12 h-12 text-primary-foreground" />
                  </motion.div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full glass text-sm font-mono text-primary"
              >
                AI/ML
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full glass text-sm font-mono text-secondary"
              >
                Python
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-mono text-sm mb-4 block">
              // About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Passionate About{" "}
              <span className="text-gradient">AI & Technology</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              I'm a 17-year-old student fascinated by artificial intelligence and 
              machine learning. Currently learning Python, exploring AI concepts, 
              and building small projects to develop my skills.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              I love experimenting with new technologies and dream of becoming 
              an AI engineer. Every day I'm learning something new and working 
              on personal projects to grow my knowledge.
            </p>

            {/* Highlight Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl glass hover:border-primary/50 transition-all duration-300 group"
                >
                  <Icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-display font-semibold text-foreground">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
