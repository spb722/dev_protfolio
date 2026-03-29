import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ArrowLeft } from 'lucide-react';
import { posts } from '../data/posts';
import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';

// Dynamically import all images in the blogs directory
const imageFiles = import.meta.glob('/src/content/blogs/**/*.{png,jpg,jpeg,gif,svg,webp}', {
  eager: true,
  import: 'default',
});

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);
  const { theme } = useTheme();

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
        className="fixed bottom-8 right-8 bg-card/80 backdrop-blur-md border border-line px-4 py-2 rounded-full text-sm font-mono z-50 shadow-lg text-ink"
      >
        {readingPercent}% Read
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-8 transition-colors">
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
                <span key={tag} className="px-2 py-1 text-xs rounded-md bg-tag text-tag-text border border-line">
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
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              p: ({ node, children }) => {
                const hasImage = node?.children?.some(
                  (child: any) => child.tagName === 'img'
                );
                if (hasImage) {
                  return <div className="my-6">{children}</div>;
                }
                return <p>{children}</p>;
              },
              img: ({node, src, ...props}) => {
                let resolvedSrc = src;
                if (src?.startsWith('./') && post) {
                  const imagePath = `/src/content/blogs/${post.id}/${src.replace('./', '')}`;
                  resolvedSrc = (imageFiles[imagePath] as string) || src;
                }
                return (
                  <Zoom>
                    <img {...props} src={resolvedSrc} referrerPolicy="no-referrer" alt={props.alt || 'Blog image'} />
                  </Zoom>
                );
              },
              code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={theme === 'dark' ? vscDarkPlus : vs}
                    language={match[1]}
                    PreTag="div"
                    className="syntax-highlighter-container rounded-lg !my-6 border border-line"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.article>
    </>
  );
}
