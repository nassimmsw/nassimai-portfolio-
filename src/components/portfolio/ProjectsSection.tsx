import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ArrowUpRight, Code2, Layers, Sparkles, Terminal, Database, Server, Smartphone, Cloud, FolderOpen, Eye } from "lucide-react";
import { supabase, Project } from "@/lib/supabase";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Terminal,
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Database,
  Server,
  Smartphone,
  Cloud,
  FolderOpen,
};

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "RSN Dev Portfolio",
    description: "Professional portfolio for RSN Dev development agency.",
    long_description: "Collaborated with RSN Dev, a professional development agency, to create their portfolio website. This showcases my ability to work with professional teams and deliver real-world projects.",
    tags: ["Professional", "Web Dev", "Collaboration"],
    color: "from-blue-500 via-indigo-500 to-violet-500",
    icon: "Layers",
    github: "#",
    demo: "https://rsndev.netlify.app",
    created_at: "",
  },
  {
    id: 2,
    title: "Number Guessing Game",
    description: "A simple Python game where the computer picks a random number.",
    long_description: "My first real Python project! Built a command-line game where players try to guess a random number. Added features like difficulty levels, hint system, and score tracking. Great for learning loops and conditionals.",
    tags: ["Python", "Beginner", "CLI", "Games"],
    color: "from-emerald-400 via-teal-500 to-cyan-500",
    icon: "Terminal",
    github: "#",
    demo: "#",
    created_at: "",
  },
  {
    id: 3,
    title: "Simple Calculator",
    description: "A basic calculator with a graphical interface using Tkinter.",
    long_description: "Built a calculator app with buttons for basic operations. Learned about GUI programming with Tkinter, event handling, and how to structure a simple application. Can perform addition, subtraction, multiplication, and division.",
    tags: ["Python", "Tkinter", "GUI", "Math"],
    color: "from-orange-400 via-amber-500 to-yellow-500",
    icon: "Code2",
    github: "#",
    demo: "#",
    created_at: "",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "This website! Built to showcase my learning journey.",
    long_description: "Designed and built this portfolio website to practice web development and showcase my projects. Learning about React, CSS, and how to create modern web interfaces. A work in progress as I continue to learn!",
    tags: ["React", "CSS", "HTML", "Web Dev"],
    color: "from-pink-400 via-rose-500 to-red-500",
    icon: "Sparkles",
    github: "#",
    demo: "#",
    created_at: "",
  },
  {
    id: 5,
    title: "Weather App",
    description: "Learning to fetch data from APIs and display weather info.",
    long_description: "Currently working on a weather application that fetches real-time data from a weather API. This project is helping me understand how to work with APIs, handle JSON data, and display information dynamically.",
    tags: ["Python", "APIs", "Learning", "In Progress"],
    color: "from-sky-400 via-blue-500 to-indigo-500",
    icon: "ExternalLink",
    github: "#",
    demo: "#",
    created_at: "",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      setProjects(data);
    }
    setLoading(false);
  };

  const displayProjects = loading ? defaultProjects : projects;

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-mono text-sm font-medium">Featured Projects</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            My <span className="text-gradient">Creations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring code, one project at a time
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">
          {displayProjects.map((project, index) => {
            const Icon = iconMap[project.icon] || Layers;
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.3 }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative group cursor-pointer overflow-hidden rounded-3xl
                  ${isLarge ? 'md:col-span-2' : ''}
                  ${index === 0 ? 'lg:col-span-2' : ''}
                  preserve-3d
                `}
                style={{ perspective: "1000px" }}
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500`} />
                
                {/* Glass Container */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
                <div className="absolute inset-0 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-300 rounded-3xl" />
                <div className="absolute inset-0 shadow-2xl shadow-black/20 group-hover:shadow-primary/10 transition-shadow duration-500" />

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Content */}
                <div className="relative h-full p-7 flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={{ 
                        rotate: hoveredIndex === index ? 12 : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                        y: hoveredIndex === index ? -2 : 0
                      }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} p-0.5 shadow-lg shadow-black/20`}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 blur-md" style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                      <div className="relative w-full h-full rounded-2xl bg-background/95 backdrop-blur flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </motion.div>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    <motion.h3 
                      className="font-display text-2xl font-bold mb-2 text-white group-hover:text-gradient transition-all duration-300"
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2 group-hover:text-white/60 transition-colors">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                          className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-white/50 group-hover:text-white/70 group-hover:bg-white/[0.08] transition-all duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none`}
                />

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Want to see more?</p>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group"
          >
            <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="font-medium">View All on GitHub</span>
            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50, rotateX: -5 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50, rotateX: -5 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden"
            >
              {/* Modal Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-20`} />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.1] to-transparent" />
              <div className="absolute inset-0 glass-dark" />
              
              <div className="relative p-8 md:p-12">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:rotate-90 duration-300"
                >
                  <X size={20} className="text-white/70" />
                </button>

                {/* Icon & Title */}
                <div className="flex items-start gap-6 mb-8">
                  <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedProject.color} p-1 shadow-xl shadow-black/20`}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-50 blur-md" />
                    <div className="relative w-full h-full rounded-3xl bg-background flex items-center justify-center">
                      {(() => {
                        const Icon = iconMap[selectedProject.icon] || Layers;
                        return <Icon className="w-10 h-10 text-white" />;
                      })()}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-white/[0.1] border border-white/[0.15] text-sm font-mono text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-lg leading-relaxed mb-10">
                  {selectedProject.long_description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.demo !== "#" && selectedProject.demo !== "" && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${selectedProject.color} text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all`}
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {selectedProject.github !== "#" && selectedProject.github !== "" && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.08] border border-white/[0.15] text-white font-semibold hover:bg-white/[0.12] hover:border-white/[0.25] transition-all"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Gradient Line */}
              <div className={`h-1 bg-gradient-to-r ${selectedProject.color}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
