import { X } from 'lucide-react';
import { SERVICES } from '@/constants';
import { formatCurrency } from '@/utils/formatting';

export default function LineItemsTable({ lineItems, onChange, onRemove }) {
  if (lineItems.length === 0) {
    return (
      <p className="text-sm text-slate-400 text-center py-8">
        Select services above to add line items
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-az-lightest">
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Service</th>
            <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wide w-28">Hours *</th>
            <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wide w-24">Rate</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Scope Notes</th>
            <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wide w-28">Subtotal</th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, idx) => {
            const svc = SERVICES.find((s) => s.id === item.serviceId);
            const subtotal = (item.hours || 0) * (svc?.rate || 0);
            return (
              <tr key={item.serviceId} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-800">{svc?.name || '—'}</p>
                  <p className="text-xs text-slate-400">{formatCurrency(svc?.rate || 0)}/hr</p>
                </td>
                <td className="px-2 py-3 text-center">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={item.hours || ''}
                    placeholder="0"
                    onChange={(e) => onChange(idx, 'hours', parseFloat(e.target.value) || 0)}
                    className="w-24 text-center px-2 py-1.5 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-az-bright focus:ring-2 focus:ring-az-bright/15 transition-all"
                  />
                </td>
                <td className="px-4 py-3 text-center text-slate-400 text-xs">{formatCurrency(svc?.rate || 0)}</td>
                <td className="px-2 py-3">
                  <input
                    type="text"
                    value={item.notes || ''}
                    placeholder="Brief scope description…"
                    onChange={(e) => onChange(idx, 'notes', e.target.value)}
                    className="w-full px-3 py-1.5 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-az-bright focus:ring-2 focus:ring-az-bright/15 transition-all"
                  />
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-800">{formatCurrency(subtotal)}</td>
                <td className="pr-3 py-3">
                  <button
                    type="button"
                    onClick={() => onRemove(item.serviceId)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <X size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
