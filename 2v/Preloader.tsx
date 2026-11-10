import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from './logo.png';
import { Sparkles, Leaf, Zap } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 350);
          return 100;
        }
        // Organic acceleration curve
        const step = prev < 50 ? 5 : prev < 85 ? 4 : 2;
        return Math.min(prev + step, 100);
      });
    }, 28);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050c0a] text-white overflow-hidden pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1], // cinematic curve
            },
          }}
        >
          {/* Subtle Ambient Aurora Radial in background */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Logo with gentle pulse & glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl animate-pulse" />
              <img
                src={logoImg}
                alt="Hermit Sustainability"
                className="relative w-20 h-20 rounded-2xl object-cover shadow-2xl border border-emerald-500/30"
              />
            </motion.div>

            {/* Brand Title with Masked Reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl font-black tracking-tight font-display text-white flex items-center justify-center gap-2"
              >
                <span>HERMIT</span>
                <span className="text-emerald-400">ENERGY</span>
              </motion.h2>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.25em] text-emerald-200/80 font-medium mb-8 flex items-center gap-1.5"
            >
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>Clean Energy Ecosystem</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-64 space-y-2">
              <div className="w-full h-1 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-900/40">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-emerald-300/70">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>Loading Assets</span>
                </span>
                <span className="font-bold text-white">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
