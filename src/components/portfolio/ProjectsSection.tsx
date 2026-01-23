import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Number Guessing Game",
    description: "A simple Python game where the computer picks a random number.",
    longDescription: "My first real Python project! Built a command-line game where players try to guess a random number. Added features like difficulty levels, hint system, and score tracking. Great for learning loops and conditionals.",
    tags: ["Python", "Beginner", "CLI", "Games"],
    image: "from-primary/20 via-secondary/10 to-accent/20",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Simple Calculator",
    description: "A basic calculator with a graphical interface using Tkinter.",
    longDescription: "Built a calculator app with buttons for basic operations. Learned about GUI programming with Tkinter, event handling, and how to structure a simple application. Can perform addition, subtraction, multiplication, and division.",
    tags: ["Python", "Tkinter", "GUI", "Math"],
    image: "from-secondary/20 via-accent/10 to-primary/20",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description: "This website! Built to showcase my learning journey.",
    longDescription: "Designed and built this portfolio website to practice web development and showcase my projects. Learning about React, CSS, and how to create modern web interfaces. A work in progress as I continue to learn!",
    tags: ["React", "CSS", "HTML", "Web Dev"],
    image: "from-accent/20 via-primary/10 to-secondary/20",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Weather App (In Progress)",
    description: "Learning to fetch data from APIs and display weather info.",
    longDescription: "Currently working on a weather application that fetches real-time data from a weather API. This project is helping me understand how to work with APIs, handle JSON data, and display information dynamically.",
    tags: ["Python", "APIs", "Learning", "In Progress"],
    image: "from-primary/30 via-accent/10 to-secondary/20",
    github: "#",
    demo: "#",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // Featured Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Small projects I've built while learning to code
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden glass hover:border-primary/50 transition-all duration-500">
                {/* Project Image Placeholder */}
                <div className={`aspect-video bg-gradient-to-br ${project.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-background/40" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2"
                    >
                      View Details <ChevronRight size={16} />
                    </motion.div>
                  </div>
                  {/* Decorative elements */}
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.6 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-4 left-4 w-20 h-20 border border-foreground/10 rounded-lg" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 border border-foreground/10 rounded-full" />
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-muted text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl glass p-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X size={20} />
              </button>

              <div className={`aspect-video rounded-xl bg-gradient-to-br ${selectedProject.image} mb-6`} />

              <h3 className="font-display text-2xl font-bold mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {selectedProject.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-primary/10 text-sm font-mono text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.a
                  href={selectedProject.github}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-primary/50 transition-all"
                >
                  <Github size={18} /> View Code
                </motion.a>
                <motion.a
                  href={selectedProject.demo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground"
                >
                  <ExternalLink size={18} /> Live Demo
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
