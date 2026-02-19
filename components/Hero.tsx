import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Twitter } from 'lucide-react';

const m = motion as any;

const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#projects');
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-8 mb-14">
                <m.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                    <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.5em] text-orange-600 font-black">
                      ABOUT ME.
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700 rounded-full" />
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                      Est. MMXXV • Senior Dossier
                    </span>
                  </div>
                </m.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-super-tighter leading-[1.1] text-slate-900 dark:text-white uppercase text-balance">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-400">
                    WELCOME TO MY <br className="hidden md:block" /> PORTFOLIO.
                  </span>
                </h1>
              </div>

              <div className="max-w-2xl">
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-14 leading-relaxed font-medium text-balance">
                  A multi-disciplinary engineer crafting digital experiences that harmonize <span className="text-slate-900 dark:text-white font-black">Fullstack Architecture</span>, <span className="text-slate-900 dark:text-white font-black">IoT Systems</span>, and <span className="text-slate-900 dark:text-white font-black">Modern Design.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-16">
                  <m.a 
                    href="#projects"
                    onClick={scrollToProjects}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-6 group bg-slate-900 dark:bg-white px-8 py-5 rounded-[2rem] text-white dark:text-slate-900 transition-all duration-300 shadow-2xl shadow-slate-500/10 cursor-pointer"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">View Projects</span>
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                      <ArrowDownRight size={16} className="text-white" />
                    </div>
                  </m.a>

                  <div className="flex gap-3">
                    {[
                      { icon: Github, href: 'https://github.com/sachin183291-hub' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/sachin-s-86b971326' },
                      { icon: Twitter, href: 'https://x.com/Mr_sachin183' }
                    ].map((item, i) => (
                      <m.a 
                        key={i} 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4, scale: 1.1 }}
                        className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300 glass-card"
                      >
                        <item.icon size={20} />
                      </m.a>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          </div>

          <m.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-600/20 rounded-[3rem] blur-2xl group-hover:bg-orange-600/30 transition-colors duration-700" />
              
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900">
                <img 
                  src="https://res.cloudinary.com/dwi2j4pju/image/upload/v1771496484/b8mnhgjf333myw1fsbzm.jpg"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                  alt="About Me"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <m.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl border border-white/20 shadow-2xl z-20 backdrop-blur-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">S</div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-orange-500 font-black mb-1">Status</p>
                    <p className="font-bold text-sm leading-none whitespace-nowrap">Available for Hire</p>
                  </div>
                </div>
              </m.div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;