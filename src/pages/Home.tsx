import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { posts } from '../data/posts';
import { projects } from '../data/projects';

export default function Home() {
  const recentPosts = posts.slice(0, 2);
  const featuredProjects = projects.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-20"
    >
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono mb-4">
          <Terminal size={14} />
          <span>Hello, World!</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          I build intelligent systems and write about data science.
        </h1>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          I'm a software engineer specializing in Large Language Models and Data Science. 
          I love turning complex data into actionable insights and building tools that empower others.
        </p>
        <div className="flex gap-4 pt-4">
          <Link
            to="/portfolio"
            className="px-6 py-3 bg-ink text-bg font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            View Projects
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 bg-transparent border border-line text-ink font-medium rounded-lg hover:bg-card transition-colors"
          >
            Read Blog
          </Link>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Work</h2>
          <Link to="/portfolio" className="text-sm text-accent hover:underline flex items-center gap-1">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to="/portfolio"
              className="group block p-6 rounded-2xl border border-line bg-card hover:bg-card-hover transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium group-hover:text-accent transition-colors">{project.title}</h3>
                <span className="text-xs font-mono text-muted">{project.year}</span>
              </div>
              <p className="text-muted text-sm mb-6 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs rounded-md bg-tag text-tag-text border border-line">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-md bg-tag text-tag-text border border-line">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Writing</h2>
          <Link to="/blog" className="text-sm text-accent hover:underline flex items-center gap-1">
            All posts <ArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block p-6 rounded-2xl border border-line bg-card hover:bg-card-hover transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-3">
                <time className="text-sm font-mono text-muted shrink-0">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
                <h3 className="text-xl font-medium group-hover:text-accent transition-colors">{post.title}</h3>
              </div>
              <p className="text-muted text-sm md:ml-[110px]">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
