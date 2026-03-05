import { Link, Outlet, useLocation } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto px-6 py-12 md:py-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white hover:text-accent transition-colors">
            Alex.dev
          </Link>
          <p className="text-muted text-sm mt-1 font-mono">Data Scientist & LLM Engineer</p>
        </div>
        
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors relative ${
              location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                ? 'text-white'
                : 'text-muted hover:text-white'
            }`}
            >
              {link.label}
              {(location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-accent -bottom-1"
                />
              )}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="mt-24 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} Alex. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <Twitter size={18} />
          </a>
          <a href="mailto:hello@example.com" className="hover:text-white transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}
