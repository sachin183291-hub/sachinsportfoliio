import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileDown, FileText, Maximize2, ShieldCheck, Eye } from 'lucide-react';
import { RESUME_URL } from '../constants';

// Cast motion to any to bypass missing prop types in some environments
const m = motion as any;

interface ResumeProps {
  onOpenResume: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onOpenResume }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="resume-section" className="py-32 relative overflow-hidden bg-white/50 dark:bg-[#080808]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-orange-500"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-black text-orange-500">Credentials</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-super-tighter uppercase leading-none text-slate-900 dark:text-white mb-8">
              DIGITAL <br /> <span className="text-orange-600">DOSSIER.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-md">
              My resume outlines my journey from Electronics and Communication Engineering to specialized Fullstack Development and IoT innovation. 
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Academic Record</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">MKCE Verified Portfolio</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Comprehensive Skillset</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Fullstack, Prompt Eng, IoT</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <m.button 
                onClick={onOpenResume}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 px-8 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-orange-600/30 transition-all group"
              >
                <Eye size={20} className="group-hover:scale-110 transition-transform" />
                View Document
              </m.button>
              
              <m.a 
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="Sachin_Resume.jpg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 px-8 py-5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all group"
              >
                <FileDown size={20} className="group-hover:translate-y-1 transition-transform" />
                Download PDF
              </m.a>
            </div>
          </m.div>

          <div className="relative flex justify-center perspective-1000">
            <m.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={onOpenResume}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-md aspect-[1/1.4] glass-card rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden group cursor-zoom-in"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
              
              <div className="absolute inset-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img 
                  src={RESUME_URL} 
                  alt="Resume Preview"
                  className="w-full h-full object-cover grayscale brightness-110 contrast-105 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <div className="p-4 bg-orange-600 text-white rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                  <Maximize2 size={24} />
                </div>
              </div>

              <div className="absolute top-8 left-8 z-40 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-md border border-slate-200 dark:border-white/10">
                <span className="text-[8px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Confidential_Draft</span>
              </div>
            </m.div>

            <div className="absolute -z-10 -top-12 -right-12 w-48 h-48 bg-orange-600/10 blur-[80px] rounded-full" />
            <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;