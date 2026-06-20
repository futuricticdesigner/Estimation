import { createContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContext = createContext(null);

const ICONS = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
const STYLES = {
  success: 'bg-emerald-600',
  error:   'bg-red-600',
  warning: 'bg-amber-500',
  info:    'bg-az-navy',
};

function Toast({ id, message, type, onClose }) {
  const Icon = ICONS[type] || Info;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0,  scale: 1   }}
      exit={{    opacity: 0, x: 60, scale: 0.9  }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium min-w-[260px] max-w-sm ${STYLES[type] || STYLES.info}`}
    >
      <Icon size={17} className="shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={() => onClose(id)} className="opacity-70 hover:opacity-100 transition-opacity">
        <X size={15} />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), duration);
    return id;
  }, []);

  const remove = useCallback((id) => setToasts((p) => p.filter((t) => t.id !== id)), []);

  const toast = {
    success: (msg) => add(msg, 'success'),
    error:   (msg) => add(msg, 'error'),
    warn:    (msg) => add(msg, 'warning'),
    info:    (msg) => add(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <Toast {...t} onClose={remove} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
