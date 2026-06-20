import { STATUSES } from '@/constants';

export default function Badge({ status, className = '' }) {
  const s = STATUSES[status] || STATUSES.draft;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.color} ${s.bg} ${className}`}>
      {s.label}
    </span>
  );
}
