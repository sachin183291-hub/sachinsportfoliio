import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Background from './components/Background';
import Resume from './components/Resume';
import ResumeModal from './components/ResumeModal';
import { Github, Linkedin, Twitter, ChevronUp, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const m = motion as any;

const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      outline.style.left = `${x}px`;
      outline.style.top = `${y}px`;
      outline.style.transform = `translate(-50%, -50%)`;
    };

    const toggleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'A' || target?.tagName === 'BUTTON' || target?.closest('a') || target?.closest('button')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', toggleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', toggleHover);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const footerLinks = [
    { name: 'About', id: 'about' },
    { name: 'Trajectory', id: 'trajectory' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Works', id: 'projects' },
    { name: 'Honors', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="relative min-h-screen selection:bg-orange-500/30 bg-[#fafafa] dark:bg-[#050505] transition-colors duration-500">
      <Background />
      <Navbar />
      
      <main className="relative z-10 w-full overflow-x-clip">
        <Hero />
        <div className="section-divider opacity-20" />
        <About />
        <div className="section-divider opacity-20" />
        <Experience />
        <div className="section-divider opacity-20" />
        <Education />
        <div className="section-divider opacity-20" />
        <Skills />
        <div className="section-divider opacity-20" />
        <Projects />
        <div className="section-divider opacity-20" />
        <Certificates />
        <div className="section-divider opacity-20" />
        <Resume onOpenResume={() => setIsResumeOpen(true)} />
        <div className="section-divider opacity-20" />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      <footer className="pt-32 pb-12 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 relative z-20 backdrop-blur-xl">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
            
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/20">S</div>
                <h3 className="text-2xl font-black tracking-tighter uppercase dark:text-white">ASTRA.</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-10 text-base leading-relaxed font-medium">
                Designing and engineering digital excellence through the lens of innovation and aesthetics. Based in Tamil Nadu, India.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Github, href: 'https://github.com/sachin183291-hub' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/sachin-s-86b971326' },
                  { Icon: Twitter, href: 'https://x.com/Mr_sachin183' }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-500 hover:text-orange-500 hover:scale-110 transition-all duration-300"
                  >
                    <item.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2 lg:ml-auto">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {footerLinks.map(link => (
                  <li key={link.id}>
                    <a 
                      href={`#${link.id}`} 
                      onClick={(e) => handleSmoothScroll(e, link.id)}
                      className="text-sm font-bold text-slate-400 hover:text-orange-500 dark:text-slate-500 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-8">Connect</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 group">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 group-hover:text-orange-500 transition-colors">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:sachinsiddhappachetty01@gmail.com" className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors truncate">
                    sachinsiddhappachetty01@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 transition-colors">
                    <MapPin size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-500">Tamil Nadu, India</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between h-full">
              <m.a 
                href="#hero"
                onClick={(e) => handleSmoothScroll(e, 'hero')}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-5 bg-orange-600 text-white rounded-[2rem] shadow-2xl shadow-orange-600/30 group mb-12 cursor-pointer"
              >
                <ChevronUp size={28} className="group-hover:translate-y-[-2px] transition-transform" />
              </m.a>
              <div className="text-left lg:text-right">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">
                  Crafted by About Me
                </p>
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-widest">
                  © 2026 • All Rights Reserved
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex gap-8">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Privacy Policy</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terms of Service</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status: Online</span>
             </div>
          </div>
        </div>
      </footer>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <ChatBot />
    </div>
  );
};

export default App;