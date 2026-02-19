import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Cast motion to any to bypass missing prop types in some environments
const m = motion as any;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['hero', 'about', 'trajectory', 'education', 'skills', 'projects', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Trajectory', id: 'trajectory' },
    { name: 'Works', id: 'projects' },
    { name: 'Honors', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
      // Update the URL hash without triggering a jump
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div 
          className={`flex justify-between items-center px-4 md:px-6 py-3 rounded-xl md:rounded-2xl transition-all duration-500 ${
            scrolled || isOpen
              ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg' 
              : 'bg-transparent'
          }`}
        >
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, 'hero')} 
            className="flex items-center gap-2 group relative z-[110]"
          >
             <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">S</div>
             <span className="text-lg md:text-xl font-black tracking-tighter uppercase dark:text-white">Astra.</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-white/5 p-1 rounded-xl border border-slate-200/50 dark:border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all relative ${
                    activeSection === link.id 
                      ? 'text-orange-600' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {activeSection === link.id && (
                    <m.div layoutId="nav-active" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-sm z-0" />
                  )}
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/10 text-slate-500 hover:text-orange-500 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2 relative z-[110]">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-500 dark:text-slate-400"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-900 dark:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 bg-white dark:bg-[#050505] z-[100] p-6 flex flex-col pt-32"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`text-5xl font-black uppercase tracking-tighter transition-all ${
                    activeSection === link.id ? 'text-orange-600' : 'text-slate-200 dark:text-slate-900'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="mt-auto pb-10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-4">Social Presence</p>
              <div className="flex gap-4">
                {['Github', 'Linkedin', 'Twitter'].map(social => (
                  <span key={social} className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{social}</span>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;