import * as XLSX from 'xlsx';
import { calcTotals } from './calculations';
import { formatCurrency, formatDate } from './formatting';
import { SERVICES, STATUSES } from '@/constants';

export const exportEstimateExcel = (estimate) => {
  const { lines, subtotal, discountAmt, total, totalHours } = calcTotals(estimate);
  const wb = XLSX.utils.book_new();

  const rows = [
    ['AZULARC — PROJECT ESTIMATE', '', '', '', ''],
    [`Ref: ${estimate.id}`, '', 'Date:', formatDate(estimate.createdAt), ''],
    ['Project:', estimate.name || '', 'Valid Until:', formatDate(estimate.validUntil), ''],
    ['Client:', estimate.clientName || '', 'Status:', STATUSES[estimate.status]?.label || '', ''],
    ['', '', '', '', ''],
    ['SERVICE', 'SCOPE / NOTES', 'HOURS', 'RATE ($/hr)', 'SUBTOTAL ($)'],
    ...lines.map((l) => {
      const svc = SERVICES.find((s) => s.id === l.serviceId);
      return [svc?.name || '—', l.notes || '', l.hours || 0, svc?.rate || 0, l.subtotal || 0];
    }),
    ['', '', '', '', ''],
    ['', '', `${totalHours} hrs total`, 'Subtotal:', subtotal],
    ...(estimate.discount > 0 ? [['', '', '', `Discount (${estimate.discount}%):`, -discountAmt]] : []),
    ['', '', '', 'TOTAL:', total],
    ['', '', '', '', ''],
    ['Notes:', estimate.notes || '', '', '', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 36 }, { wch: 42 }, { wch: 14 }, { wch: 18 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, ws, 'Proposal');
  XLSX.writeFile(wb, `Azularc-Estimate-${estimate.id}.xlsx`);
};

export const exportAllExcel = (estimates) => {
  const wb = XLSX.utils.book_new();
  const rows = [
    ['AZULARC — ALL ESTIMATES', '', '', '', '', '', ''],
    [`Generated: ${new Date().toLocaleString()}`, '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['Estimate ID', 'Project', 'Client', 'Services', 'Hours', 'Total ($)', 'Status', 'Created'],
    ...estimates.map((e) => {
      const { totalHours, total, lines } = calcTotals(e);
      return [e.id, e.name || '', e.clientName || '', lines.length, totalHours, total, STATUSES[e.status]?.label || 'Draft', formatDate(e.createdAt)];
    }),
  ];
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 22 }, { wch: 36 }, { wch: 28 }, { wch: 12 }, { wch: 12 }, { wch: 16 }, { wch: 14 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, ws, 'All Estimates');
  XLSX.writeFile(wb, `Azularc-All-Estimates-${new Date().toISOString().slice(0, 10)}.xlsx`);
};
