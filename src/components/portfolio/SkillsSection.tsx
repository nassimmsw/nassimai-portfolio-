import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "PyTorch", level: 95 },
      { name: "TensorFlow", level: 90 },
      { name: "Transformers", level: 92 },
      { name: "LangChain", level: 88 },
      { name: "OpenAI API", level: 94 },
    ],
  },
  {
    title: "Data & ML Engineering",
    skills: [
      { name: "Python", level: 98 },
      { name: "SQL", level: 90 },
      { name: "Pandas/NumPy", level: 95 },
      { name: "Spark", level: 82 },
      { name: "Airflow", level: 85 },
    ],
  },
  {
    title: "MLOps & Cloud",
    skills: [
      { name: "Docker", level: 92 },
      { name: "Kubernetes", level: 85 },
      { name: "AWS/GCP", level: 88 },
      { name: "MLflow", level: 90 },
      { name: "CI/CD", level: 87 },
    ],
  },
  {
    title: "Tools & Frameworks",
    skills: [
      { name: "FastAPI", level: 93 },
      { name: "Ray", level: 80 },
      { name: "Weights & Biases", level: 88 },
      { name: "Git", level: 95 },
      { name: "Linux", level: 90 },
    ],
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // Technical Skills
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building production-ready AI systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              className="p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground font-mono">
                        {skill.name}
                      </span>
                      <span className="text-sm text-primary font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
