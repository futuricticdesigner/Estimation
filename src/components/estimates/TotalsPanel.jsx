import { formatCurrency } from '@/utils/formatting';
import { calcTotals } from '@/utils/calculations';

export default function TotalsPanel({ estimate }) {
  const { subtotal, discountAmt, total, totalHours } = calcTotals(estimate);
  return (
    <div className="bg-az-lightest rounded-xl border border-slate-200 p-5">
      <div className="flex justify-between text-sm text-slate-500 py-1">
        <span>Total Hours</span>
        <span className="font-semibold text-slate-700">{totalHours} hrs</span>
      </div>
      <div className="flex justify-between text-sm text-slate-500 py-1">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      {estimate.discount > 0 && (
        <div className="flex justify-between text-sm text-emerald-600 py-1">
          <span>Discount ({estimate.discount}%)</span>
          <span>−{formatCurrency(discountAmt)}</span>
        </div>
      )}
      <hr className="my-3 border-slate-200" />
      <div className="flex justify-between text-lg font-bold text-slate-800">
        <span>Total Investment</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
