import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Github, Globe, ArrowRight, X, GripVertical, Pause, Play, ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const m = motion as any;

// ── Multi-image mini-slideshow used inside each card ──────────────────────────
const ImageSlideshow: React.FC<{ images: string[]; title: string; isActive: boolean; isHovered: boolean }> = ({
  images, title, isActive, isHovered,
}) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {images.map((src, i) => (
        <m.img
          key={src}
          src={src}
          alt={`${title} - image ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? (isHovered ? 1.05 : 1) : 1,
            filter: (isHovered || isActive)
              ? 'grayscale(0%) brightness(0.9)'
              : 'grayscale(100%) brightness(0.4)',
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-orange-500 w-4' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Modal gallery for Hardware projects ───────────────────────────────────────
const ModalGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(p => (p - 1 + images.length) % images.length);
  const next = () => setCurrent(p => (p + 1) % images.length);

  return (
    <div className="relative w-full h-full bg-black group/gallery overflow-hidden">
      <AnimatePresence mode="wait">
        <m.img
          key={current}
          src={images[current]}
          alt={`${title} ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/60 hover:bg-orange-600 rounded-full text-white opacity-0 group-hover/gallery:opacity-100 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/60 hover:bg-orange-600 rounded-full text-white opacity-0 group-hover/gallery:opacity-100 transition-all">
            <ChevronRight size={18} />
          </button>
          {/* Counter */}
          <div className="absolute bottom-3 right-4 z-20 text-[10px] font-black font-mono text-white/60 bg-black/50 px-2 py-0.5 rounded-full">
            {current + 1} / {images.length}
          </div>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-orange-500 w-5' : 'bg-white/30 w-1.5'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onFocus: (p: Project) => void;
  isActive: boolean;
}> = ({ project, index, onFocus, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setIsHovered(false); };

  const allImages = project.images && project.images.length > 0 ? project.images : [project.image];
  const isHardware = project.category === 'Hardware';

  return (
    <m.div
      layout
      animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.4, z: isActive ? 0 : -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative shrink-0 w-[88vw] md:w-[600px] lg:w-[750px] h-[550px] md:h-[600px] perspective-1000"
    >
      <m.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full flex flex-col rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border transition-all duration-700 backdrop-blur-3xl shadow-2xl ${
          isHovered
            ? 'border-orange-500/50 bg-slate-900/70 shadow-[0_30px_60px_-15px_rgba(249,115,22,0.25)]'
            : isActive ? 'border-white/20 bg-slate-900/50 shadow-black/50' : 'border-white/10 bg-slate-900/40'
        }`}
      >
        {/* Top bar */}
        <div className="h-12 md:h-14 border-b border-white/5 bg-white/5 flex items-center justify-between px-6 md:px-8 z-20 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500/50'}`} />
            </div>
            <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40 font-black flex items-center gap-2">
              Project_ID_{project.id}
            </span>
          </div>
          {isHardware && (
            <span className="text-[8px] font-black uppercase tracking-widest text-orange-400/70 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block" />
              HARDWARE
            </span>
          )}
          <GripVertical size={14} className="text-white/20" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
          {/* Image / Slideshow panel */}
          <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5 shrink-0">
            {isHardware ? (
              <ImageSlideshow images={allImages} title={project.title} isActive={isActive} isHovered={isHovered} />
            ) : (
              <m.img
                src={project.image}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  filter: (isHovered || isActive) ? 'grayscale(0%) brightness(0.9)' : 'grayscale(100%) brightness(0.4)',
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
                alt={project.title}
              />
            )}

            {/* Hover overlay with links */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered || (isActive && window.innerWidth < 768) ? 1 : 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[4px] flex items-center justify-center gap-4 md:gap-6 z-10 transition-all duration-500"
            >
              <m.a whileHover={{ scale: 1.1, y: -3 }} href={project.githubUrl} target="_blank" className="p-3 md:p-4 bg-white/10 border border-white/20 rounded-xl md:rounded-2xl text-white hover:bg-orange-600 transition-all">
                <Github size={20} className="md:w-6 md:h-6" />
              </m.a>
              <m.a whileHover={{ scale: 1.1, y: -3 }} href={project.liveUrl} target="_blank" className="p-3 md:p-4 bg-white/10 border border-white/20 rounded-xl md:rounded-2xl text-white hover:bg-orange-600 transition-all">
                <Globe size={20} className="md:w-6 md:h-6" />
              </m.a>
            </m.div>

            <div className="absolute top-4 left-4 z-20">
              <div className="px-2 py-0.5 md:px-3 md:py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest">
                {project.category}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex-1 p-6 md:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-transparent">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>
              <div className="w-8 md:w-12 h-0.5 bg-orange-600/30" />
              <p className="text-xs md:text-base text-slate-400 font-medium leading-relaxed line-clamp-3 md:line-clamp-4">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 md:space-y-8 mt-4 md:mt-auto">
              <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[8px] md:text-[10px] font-black text-white/70 uppercase tracking-widest px-2 py-1 md:px-3 md:py-1.5 bg-white/5 rounded-lg md:rounded-xl border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Hardware: show image count badge */}
              {isHardware && allImages.length > 1 && (
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-orange-400/80">
                  <span className="flex gap-0.5">
                    {allImages.map((_, i) => <span key={i} className="w-1 h-1 rounded-full bg-orange-500/60 inline-block" />)}
                  </span>
                  {allImages.length} Photos
                </div>
              )}
              <m.button onClick={() => onFocus(project)} whileHover={{ x: 5 }} className="w-full flex items-center justify-between group/btn py-3 md:py-5 px-6 md:px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-xl md:rounded-[1.5rem] transition-all">
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">Details</span>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowRight size={16} className="md:w-5 md:h-5" />
                </div>
              </m.button>
            </div>
          </div>
        </div>
      </m.div>
    </m.div>
  );
};

// ── Main Projects Section ─────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [focusProject, setFocusProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [cardWidth, setCardWidth] = useState(750);

  const timerRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());
  const categories = ['All', 'Web', 'Mobile', 'AI', 'Hardware'];

  const filtered = useMemo(() =>
    filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter),
  [filter]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      if (width < 768) setCardWidth(width * 0.88);
      else if (width < 1024) setCardWidth(600);
      else setCardWidth(750);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filtered.length);
    setProgress(0);
    lastUpdateRef.current = Date.now();
  }, [filtered.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    setProgress(0);
    lastUpdateRef.current = Date.now();
  }, [filtered.length]);

  useEffect(() => {
    const duration = 5000;
    const interval = 20;
    const tick = () => {
      if (!isAutoPlaying || isHoveringCarousel || !!focusProject || filtered.length <= 1 || document.hidden) {
        lastUpdateRef.current = Date.now();
        return;
      }
      const now = Date.now();
      const delta = now - lastUpdateRef.current;
      lastUpdateRef.current = now;
      setProgress((prev) => {
        const nextProgress = prev + (delta / duration) * 100;
        if (nextProgress >= 100) { nextSlide(); return 0; }
        return nextProgress;
      });
    };
    timerRef.current = window.setInterval(tick, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isAutoPlaying, isHoveringCarousel, !!focusProject, filtered.length, nextSlide]);

  const handleManualNav = (dir: 'next' | 'prev') => {
    setProgress(0);
    lastUpdateRef.current = Date.now();
    if (dir === 'next') nextSlide(); else prevSlide();
  };

  const gap = window.innerWidth < 768 ? 20 : 80;
  const carouselOffset = (viewportWidth / 2) - (cardWidth / 2) - (activeIndex * (cardWidth + gap));

  return (
    <section id="projects" className="relative bg-[#050505] min-h-screen flex flex-col justify-center overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl relative z-20 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 md:gap-12">
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-12 md:w-16 h-1 bg-orange-600 rounded-full" />
              <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black text-orange-500">Projects</span>
            </div>
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
              LATEST <br /> <span className="text-orange-600">WORKS.</span>
            </h2>
          </m.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-white/5 backdrop-blur-3xl rounded-2xl md:rounded-[2.5rem] border border-white/10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setActiveIndex(0); setProgress(0); lastUpdateRef.current = Date.now(); }}
                className={`px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] uppercase tracking-widest font-black transition-all relative ${
                  filter === cat ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {filter === cat && (
                  <m.div layoutId="activeFilterProj" className="absolute inset-0 bg-orange-600 rounded-xl md:rounded-2xl" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative flex items-center h-[550px] md:h-[700px] z-10 w-full overflow-hidden"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => setIsHoveringCarousel(false)}
      >
        <m.div
          animate={{ x: carouselOffset }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center"
          style={{ gap: `${gap}px` }}
        >
          {filtered.map((project, idx) => (
            <ProjectCard
              key={`${project.id}-${filter}`}
              project={project}
              index={idx}
              isActive={idx === activeIndex}
              onFocus={setFocusProject}
            />
          ))}
        </m.div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 mt-12 md:mt-20 relative z-20">
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex flex-col">
            <span className="font-mono text-[8px] md:text-[10px] text-orange-500/50 uppercase tracking-widest mb-1 font-black">Sequential_ID</span>
            <div className="flex items-baseline gap-2 md:gap-4">
              <span className="text-white font-black text-3xl md:text-5xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
              <span className="text-white/20 font-black text-xl">/ {filtered.length.toString().padStart(2, '0')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setIsAutoPlaying(!isAutoPlaying); lastUpdateRef.current = Date.now(); }}
                className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl transition-all duration-300 flex items-center justify-center border ${
                  isAutoPlaying ? 'bg-orange-600 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                {isAutoPlaying ? (isHoveringCarousel ? 'Paused (Hover)' : 'Auto-Play') : 'Locked'}
              </span>
            </div>
            <div className="w-48 md:w-80 h-1 md:h-2 bg-white/5 rounded-full overflow-hidden relative">
              <m.div
                animate={{ width: `${progress}%` }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
                className="absolute inset-y-0 left-0 bg-orange-600"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => handleManualNav('prev')} className="p-4 md:p-6 rounded-xl md:rounded-[1.5rem] bg-white/5 border border-white/10 text-white hover:bg-orange-600/20 transition-all">
            <ArrowRight size={24} className="rotate-180" />
          </button>
          <button onClick={() => handleManualNav('next')} className="p-4 md:p-6 rounded-xl md:rounded-[1.5rem] bg-white/5 border border-white/10 text-white hover:bg-orange-600/20 transition-all">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Focus / Detail Modal */}
      <AnimatePresence>
        {focusProject && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-3xl">
            <m.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-fit max-h-[90vh] glass-card rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col md:flex-row"
            >
              <button onClick={() => setFocusProject(null)} className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full hover:bg-orange-600 transition-colors">
                <X size={24} />
              </button>

              {/* Image panel — gallery for hardware, single for others */}
              <div className="w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden">
                {focusProject.images && focusProject.images.length > 1 ? (
                  <ModalGallery images={focusProject.images} title={focusProject.title} />
                ) : (
                  <img src={focusProject.image} className="w-full h-full object-cover" alt={focusProject.title} />
                )}
              </div>

              {/* Details panel */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto text-white">
                <div className="mb-8">
                  <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md">{focusProject.category}</span>
                  {focusProject.images && focusProject.images.length > 1 && (
                    <span className="ml-2 px-3 py-1 bg-white/10 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-md">
                      {focusProject.images.length} Photos
                    </span>
                  )}
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mt-4 leading-none">{focusProject.title}</h3>
                </div>
                <div className="space-y-6 mb-12">
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">{focusProject.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {focusProject.tags.map(tag => (
                      <div key={tag} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 font-bold uppercase tracking-widest">
                        <Code2 size={14} className="text-orange-500" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href={focusProject.liveUrl} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  <a href={focusProject.githubUrl} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    <Github size={18} /> Repository
                  </a>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;