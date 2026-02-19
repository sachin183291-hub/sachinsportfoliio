import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown } from 'lucide-react';
import { RESUME_URL } from '../constants';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-orange-600 text-white rounded-full transition-colors border border-white/10"
          >
            <X size={24} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl h-[85vh] flex flex-col items-center gap-6"
          >
            <div className="relative w-full flex-1 overflow-y-auto rounded-2xl border border-white/8 bg-white shadow-2xl custom-scrollbar">
              <img 
                src={RESUME_URL} 
                alt="Sachin S Resume" 
                className="w-full h-auto object-contain block mx-auto"
                style={{ minHeight: '100%' }}
              />
              
              <div className="sticky top-4 left-4 inline-block px-3 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg z-20">
                Official Resume
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 shrink-0">
              <a 
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="Sachin_Resume.jpg"
                className="flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-600/30 group"
              >
                <FileDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                Download PDF
              </a>
              <button 
                onClick={onClose}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Close Viewer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;