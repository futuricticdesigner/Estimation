import { SERVICES } from '@/constants';

export const calcLineItem = (item) => {
  const svc = SERVICES.find((s) => s.id === item.serviceId);
  if (!svc) return { ...item, rate: 0, subtotal: 0 };
  return { ...item, rate: svc.rate, subtotal: (item.hours || 0) * svc.rate };
};

export const calcTotals = (estimate) => {
  const lines = (estimate.lineItems || []).map(calcLineItem);
  const subtotal = lines.reduce((s, l) => s + l.subtotal, 0);
  const discountAmt = subtotal * ((estimate.discount || 0) / 100);
  const total = subtotal - discountAmt;
  const totalHours = lines.reduce((s, l) => s + (l.hours || 0), 0);
  return { lines, subtotal, discountAmt, total, totalHours };
};
