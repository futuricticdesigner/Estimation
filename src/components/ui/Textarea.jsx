import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ label, error, hint, required, rows = 3, className = '', ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-3 py-2.5 text-sm border-[1.5px] rounded-lg bg-white text-slate-800
          placeholder:text-slate-400 resize-vertical transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright
          ${error ? 'border-red-400' : 'border-slate-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {!error && hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
});

export default Textarea;
