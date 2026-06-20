import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:   'bg-az-mid text-white border-az-mid hover:bg-az-blue hover:border-az-blue',
  secondary: 'bg-white text-az-mid border-az-mid hover:bg-az-light',
  ghost:     'bg-transparent text-slate-600 border-slate-300 hover:bg-slate-50',
  danger:    'bg-white text-red-600 border-red-400 hover:bg-red-50',
  success:   'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700',
};
const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-sm gap-2',
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, className = '', icon, fullWidth = false, ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold border-[1.5px] rounded-lg
        transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      {...props}
    >
      {loading ? <Loader2 size={14} className="animate-spin shrink-0" /> : icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
