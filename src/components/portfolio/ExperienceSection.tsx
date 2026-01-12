import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Senior AI Engineer",
    company: "TechCorp AI",
    period: "2022 - Present",
    description: "Leading the development of LLM-powered products, managing ML infrastructure, and mentoring junior engineers. Reduced inference costs by 60% through model optimization.",
    technologies: ["LLMs", "MLOps", "Python", "Kubernetes"],
  },
  {
    title: "Machine Learning Engineer",
    company: "DataFlow Labs",
    period: "2020 - 2022",
    description: "Built and deployed ML models for real-time prediction systems. Designed data pipelines processing 10M+ events daily with 99.99% reliability.",
    technologies: ["PyTorch", "Spark", "AWS", "Airflow"],
  },
  {
    title: "Data Scientist",
    company: "Analytics Inc",
    period: "2018 - 2020",
    description: "Developed predictive models for customer behavior analysis. Implemented A/B testing frameworks and contributed to 30% increase in conversion rates.",
    technologies: ["Scikit-learn", "SQL", "Python", "Tableau"],
  },
  {
    title: "AI Research Intern",
    company: "University Research Lab",
    period: "2017 - 2018",
    description: "Published research on neural network compression techniques. Achieved 4x speedup with minimal accuracy loss on edge devices.",
    technologies: ["TensorFlow", "CUDA", "Research", "Publications"],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // Career Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building intelligent systems across industries and scales
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary glow-subtle z-10" />

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-primary text-sm font-mono mb-2">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-secondary text-sm mb-3 flex items-center gap-2">
                    <Briefcase size={14} />
                    {exp.company}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
