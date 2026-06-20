import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(function Input({ label, error, hint, required, icon: Icon, className = '', ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2.5 text-sm border-[1.5px] rounded-lg bg-white text-slate-800
            placeholder:text-slate-400 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-slate-300'}
            ${Icon ? 'pl-9' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1 text-xs text-red-500 font-medium"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
        {!error && hint && (
          <p key="hint" className="text-xs text-slate-400">{hint}</p>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Input;
