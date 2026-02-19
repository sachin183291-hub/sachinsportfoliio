
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import { Certificate } from '../types';
import { X, Bookmark, Scale, Shield, ChevronRight, RotateCw, ZoomIn } from 'lucide-react';

// Cast motion to any to bypass missing prop types in some environments
const m = motion as any;

const CertificateFolder: React.FC<{
  cert: Certificate;
  index: number;
  isOpen: boolean;
  onClick: (id: string) => void;
  rotation: number;
}> = ({ cert, index, isOpen, onClick, rotation }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), { stiffness: 150, damping: 20 });
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !cardRef.current || isOpen) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <m.div
      layout
      animate={{ 
        scale: isOpen ? 1.05 : 1,
        y: isOpen ? -10 : 0,
        rotateZ: isOpen ? 0 : rotation,
        zIndex: isOpen ? 100 : index,
      }}
      onClick={() => onClick(cert.id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
      className="relative cursor-pointer perspective-1000"
    >
      <m.div
        ref={cardRef}
        style={{ 
          rotateX: isOpen ? 0 : rotateX,
          rotateY: isOpen ? 0 : rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-44 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80"
      >
        <div className="absolute inset-0 bg-[#3a2a1f] rounded-tr-[2rem] md:rounded-tr-[3rem] rounded-bl-xl shadow-2xl border-l-[6px] md:border-l-[10px] border-[#2a1d15] overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        </div>
        
        <m.div 
          animate={isOpen ? { opacity: 1, y: -15, scale: 0.98 } : { opacity: 0, y: 5, scale: 0.9 }} 
          className="absolute inset-2 bottom-8 bg-slate-50 rounded shadow-xl flex flex-col p-3 md:p-5 border border-slate-300"
        >
          <div className="w-full h-16 md:h-24 bg-slate-200 rounded mb-2 md:mb-4 overflow-hidden">
            <img src={cert.image} className="w-full h-full object-cover grayscale contrast-125" alt="" />
          </div>
          <h4 className="text-[9px] md:text-[11px] font-black text-slate-900 uppercase leading-tight">{cert.title}</h4>
          <p className="text-[7px] md:text-[8px] font-bold text-slate-600 uppercase mt-1">{cert.issuer}</p>
        </m.div>

        <m.div 
          animate={isOpen ? { rotateY: -130 } : { rotateY: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
          className="absolute inset-0 bg-[#4e3b31] rounded-tr-[2rem] md:rounded-tr-[3rem] rounded-bl-xl shadow-[-5px_0_20px_rgba(0,0,0,0.3)] border-l-2 border-white/5 origin-left [transform-style:preserve-3d] [backface-visibility:hidden] z-30"
        >
          <div className="p-4 md:p-6 h-full flex flex-col">
            <div className="flex-1">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/20 flex items-center justify-center border border-white/5 mb-4">
                 <Scale className="text-orange-500/50" size={14} />
              </div>
              <h3 className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Dossier</h3>
              <p className="text-[10px] md:text-sm font-black text-white leading-tight uppercase tracking-tighter group-hover:text-orange-400">{cert.title}</p>
            </div>
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
};

const Certificates: React.FC = () => {
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalRotation, setModalRotation] = useState(0);
  // Updated the categories filter array to include all certificate types used in constants.tsx
  const categories = ['All', 'Hackathon', 'Technical', 'Soft Skill', 'Internship'];

  const filteredCerts = useMemo(() => {
    return activeFilter === 'All' ? CERTIFICATES : CERTIFICATES.filter(c => c.category === activeFilter);
  }, [activeFilter]);

  const handleFolderClick = (id: string) => {
    setOpenFolderId(openFolderId === id ? null : id);
    setModalRotation(0); // Reset rotation when opening a new one
  };

  const handleRotate = () => {
    setModalRotation(prev => (prev + 90) % 360);
  };

  const currentCert = CERTIFICATES.find(c => c.id === openFolderId);

  return (
    <section id="certificates" className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 md:mb-20 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.6em] font-black text-orange-400 block mb-4">Academic Credentials</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-super-tighter uppercase leading-none text-white">
            THE <span className="text-orange-600">ARCHIVE.</span>
          </h2>
        </m.div>

        <div className="flex justify-center mb-12 md:mb-20">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setOpenFolderId(null); }}
                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl border transition-all text-[8px] md:text-[9px] font-black uppercase tracking-widest ${
                  activeFilter === cat 
                    ? 'bg-orange-600 border-orange-500 text-white shadow-xl' 
                    : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          <m.div 
            className="relative w-full min-h-[450px] md:min-h-[600px] bg-[#1a1310] rounded-[2.5rem] md:rounded-[100px] border-[4px] md:border-[12px] border-[#2d221c] shadow-2xl p-4 md:p-12"
          >
            <div className="relative h-full w-full bg-[#0c0c0c] rounded-[2rem] md:rounded-[70px] shadow-inner p-4 md:p-16">
              <m.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-12 md:gap-y-16 justify-items-center">
                <AnimatePresence mode="popLayout">
                  {filteredCerts.map((cert, i) => (
                    <CertificateFolder 
                      key={cert.id} 
                      cert={cert} 
                      index={i} 
                      isOpen={openFolderId === cert.id} 
                      onClick={handleFolderClick}
                      rotation={(Math.random() * 6) - 3}
                    />
                  ))}
                </AnimatePresence>
              </m.div>
            </div>
          </m.div>
        </div>
      </div>

      <AnimatePresence>
        {openFolderId && currentCert && (
          <m.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
             <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 md:gap-16 items-center py-8">
                <div className="flex flex-col items-center gap-6 order-2 lg:order-1">
                  <m.div 
                    animate={{ rotate: modalRotation }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="bg-white p-4 md:p-10 rounded shadow-2xl border-[6px] md:border-[12px] border-white"
                  >
                    <img src={currentCert.image} className="w-full h-auto rounded-sm contrast-110 shadow-lg" alt={currentCert.title} />
                  </m.div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={handleRotate}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-orange-600 text-white rounded-full transition-all border border-white/10 font-bold text-[10px] uppercase tracking-widest"
                    >
                      <RotateCw size={14} /> Rotate
                    </button>
                    <button 
                      onClick={() => window.open(currentCert.image, '_blank')}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-orange-600 text-white rounded-full transition-all border border-white/10 font-bold text-[10px] uppercase tracking-widest"
                    >
                      <ZoomIn size={14} /> Full Screen
                    </button>
                  </div>
                </div>
                
                <div className="text-white order-1 lg:order-2">
                  <div className="inline-block px-3 py-1 bg-orange-600 rounded-md text-[8px] font-black uppercase tracking-widest mb-6">Verified Credential</div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">{currentCert.title}</h3>
                  <p className="text-lg font-bold text-orange-500 uppercase tracking-widest mb-8">{currentCert.issuer} — {currentCert.date}</p>
                  
                  <div className="space-y-4 mb-10 text-slate-400 font-medium">
                    <p>This certificate represents a verified milestone in the academic and professional career of Sachin S.</p>
                  </div>

                  <button onClick={() => setOpenFolderId(null)} className="w-full md:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-orange-600/20">
                    Close Dossier
                  </button>
                </div>
             </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
