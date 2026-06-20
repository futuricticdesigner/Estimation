import { Menu, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function Topbar({ title, subtitle, onMenuClick, actions }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-4 px-4 lg:px-7 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-slate-800 leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-slate-400 truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <Button size="sm" icon={<Plus size={14} />} onClick={() => navigate('/estimates/new')} className="hidden sm:inline-flex">
            New Estimate
          </Button>
        </div>
      </div>
    </header>
  );
}
