import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { posts } from '../data/posts';
import { useState, useEffect } from 'react';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [readingPercent, setReadingPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setReadingPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-accent hover:underline">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: readingPercent > 0 ? 1 : 0, y: readingPercent > 0 ? 0 : 20 }}
        className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-md border border-line px-4 py-2 rounded-full text-sm font-mono z-50 shadow-lg"
      >
        {readingPercent}% Read
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <time className="text-sm font-mono text-muted">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed">
            {post.summary}
          </p>
        </header>

        <div className="markdown-body">
          <ReactMarkdown
            components={{
              img: ({node, ...props}) => (
                <img {...props} referrerPolicy="no-referrer" alt={props.alt || 'Blog image'} />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.article>
    </>
  );
}
