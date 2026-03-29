import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-lg text-muted max-w-2xl">
          A collection of my recent work in Data Science, Machine Learning, and Full-Stack Development.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col p-8 rounded-3xl border border-line bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">{project.title}</h2>
              <span className="text-sm font-mono text-muted">{project.year}</span>
            </div>
            
            <p className="text-muted text-base mb-8 flex-grow leading-relaxed">
              {project.description}
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs rounded-full bg-black/50 text-gray-300 border border-line">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-line/50">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
