import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Select = forwardRef(function Select({ label, error, required, options = [], className = '', ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full px-3 py-2.5 text-sm border-[1.5px] rounded-lg bg-white text-slate-800 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright
          ${error ? 'border-red-400' : 'border-slate-300'}
          ${className}
        `}
        {...props}
      >
        {options.map(({ value, label: lbl }) => (
          <option key={value} value={value}>{lbl}</option>
        ))}
      </select>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs text-red-500 font-medium"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Select;
