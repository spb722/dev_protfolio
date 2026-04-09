import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { projects, type Project } from '../data/projects';

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col p-6 rounded-2xl border border-line bg-card hover:bg-card-hover transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">{project.title}</h2>
        <span className="text-sm font-mono text-muted shrink-0 ml-3">{project.year}</span>
      </div>

      <div className="mb-4 flex-grow">
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.p
              key="full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-muted text-sm leading-relaxed overflow-hidden"
            >
              {project.description}
            </motion.p>
          ) : (
            <motion.p
              key="clamped"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted text-sm leading-relaxed line-clamp-3"
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline transition-colors"
        >
          {expanded ? (
            <><ChevronUp size={13} /> Show less</>
          ) : (
            <><ChevronDown size={13} /> Show more</>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-tag text-tag-text border border-line">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1 text-xs rounded-full bg-tag text-tag-text border border-line">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="flex gap-4 pt-3 border-t border-line/50">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors"
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
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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
          A collection of my work in LLM Engineering, Multi-Agent Systems, and ML Systems Design — shipped to production in Telecom.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.div>
  );
}
