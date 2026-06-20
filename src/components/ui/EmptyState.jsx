import { FolderOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ icon: Icon = FolderOpen, title, description, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-az-light flex items-center justify-center mb-4">
        <Icon size={26} className="text-az-bright" />
      </div>
      <h3 className="text-base font-bold text-slate-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs mb-5">{description}</p>
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  );
}
