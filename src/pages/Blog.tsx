import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { posts } from '../data/posts';

export default function Blog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted max-w-2xl">
          Thoughts, tutorials, and insights on Data Science, Machine Learning, and software engineering.
        </p>
      </header>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group block p-6 rounded-2xl border border-line bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-3">
              <time className="text-sm font-mono text-muted shrink-0">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
              <h2 className="text-2xl font-medium group-hover:text-accent transition-colors">{post.title}</h2>
            </div>
            <p className="text-muted text-base md:ml-[110px] mb-4">{post.summary}</p>
            <div className="flex flex-wrap gap-2 md:ml-[110px]">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs rounded-md bg-black/50 text-gray-300 border border-line">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
