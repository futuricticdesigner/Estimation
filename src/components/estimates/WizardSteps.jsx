import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = ['Project Info', 'Services & Hours', 'Review & Save'];

export default function WizardSteps({ current }) {
  return (
    <div className="relative flex justify-between items-start mb-8">
      {/* Track line */}
      <div className="absolute top-[17px] left-[18px] right-[18px] h-0.5 bg-slate-200" />
      <motion.div
        className="absolute top-[17px] left-[18px] h-0.5 bg-az-bright origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (current - 1) / (STEPS.length - 1) }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ right: '18px' }}
      />

      {STEPS.map((label, i) => {
        const step  = i + 1;
        const done  = step < current;
        const active = step === current;
        return (
          <div key={label} className="relative z-10 flex flex-col items-center gap-2">
            <motion.div
              animate={{
                background: done || active ? '#0D85D8' : '#fff',
                borderColor: done || active ? '#0D85D8' : '#CBD5E1',
                color: done || active ? '#fff' : '#94A3B8',
              }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold shadow-sm"
            >
              {done ? <Check size={15} strokeWidth={2.5} /> : step}
            </motion.div>
            <span className={`text-xs font-semibold whitespace-nowrap ${active ? 'text-az-mid' : done ? 'text-az-blue' : 'text-slate-400'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
