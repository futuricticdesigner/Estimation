import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SERVICES } from '@/constants';
import { formatCurrency } from '@/utils/formatting';

export default function ServiceSelector({ selectedIds, onToggle }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {SERVICES.map((svc) => {
        const selected = selectedIds.has(svc.id);
        return (
          <motion.button
            key={svc.id}
            type="button"
            onClick={() => onToggle(svc.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`flex items-center gap-3 p-4 rounded-xl border-[1.5px] text-left transition-all duration-150 ${
              selected ? 'border-az-bright bg-az-light shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base" style={{ background: svc.bg, color: svc.color }}>
              <span className="text-lg">{svc.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{svc.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatCurrency(svc.rate)}/hr</p>
            </div>
            <motion.div
              animate={{ background: selected ? '#0D85D8' : '#fff', borderColor: selected ? '#0D85D8' : '#CBD5E1' }}
              className="w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0"
            >
              {selected && <Check size={11} className="text-white" strokeWidth={3} />}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
