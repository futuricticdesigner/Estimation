import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { calcTotals } from './calculations';
import { formatCurrency, formatDate } from './formatting';
import { SERVICES } from '@/constants';

export const exportPDF = (estimate) => {
  const doc  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const { lines, subtotal, discountAmt, total, totalHours } = calcTotals(estimate);
  const W = 210, MARGIN = 18, CONTENT = W - MARGIN * 2;
  const NAVY = [7, 30, 92], BLUE = [21, 71, 184], BRIGHT = [27, 111, 232];
  const MUTED = [100, 116, 139], LIGHT = [235, 242, 255], BORDER = [226, 232, 240];
  const TEXT = [13, 27, 62], WHITE = [255, 255, 255];

  // Header
  doc.setFillColor(...NAVY); doc.rect(0, 0, W, 52, 'F');
  doc.setFillColor(...BLUE); doc.circle(W - 10, -10, 55, 'F');
  doc.setFillColor(...BRIGHT); doc.circle(W + 8, 60, 40, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(22); doc.setTextColor(...WHITE);
  doc.text('AZULARC', MARGIN, 22);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(200, 215, 255);
  doc.text('INNOVATIVE DIGITAL SOLUTIONS', MARGIN, 29);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.setTextColor(...WHITE);
  doc.text('PROJECT ESTIMATE & PROPOSAL', MARGIN, 44);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(200, 215, 255);
  doc.text(`Ref: ${estimate.id}`, W - MARGIN, 18, { align: 'right' });
  doc.text(`Date: ${formatDate(estimate.createdAt)}`, W - MARGIN, 25, { align: 'right' });
  doc.text(`Valid until: ${formatDate(estimate.validUntil)}`, W - MARGIN, 32, { align: 'right' });

  let y = 64;

  // Project / Client blocks
  doc.setFillColor(...LIGHT); doc.roundedRect(MARGIN, y, CONTENT * 0.58, 38, 2, 2, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...BRIGHT);
  doc.text('PROJECT', MARGIN + 8, y + 8);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.setTextColor(...TEXT);
  doc.text(doc.splitTextToSize(estimate.name || 'Untitled', CONTENT * 0.55), MARGIN + 8, y + 16);
  if (estimate.projectDescription) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(...MUTED);
    doc.text(doc.splitTextToSize(estimate.projectDescription, CONTENT * 0.54).slice(0, 2), MARGIN + 8, y + 30);
  }

  const rx = MARGIN + CONTENT * 0.62, rw = CONTENT * 0.38;
  doc.setFillColor(...NAVY); doc.roundedRect(rx, y, rw, 38, 2, 2, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(150, 180, 255);
  doc.text('PREPARED FOR', rx + 8, y + 8);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...WHITE);
  doc.text(doc.splitTextToSize(estimate.clientName || 'Client', rw - 12), rx + 8, y + 16);
  if (estimate.clientEmail) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(180, 200, 240);
    doc.text(estimate.clientEmail, rx + 8, y + 28);
  }
  y += 50;

  // Stats row
  const sw = (CONTENT - 8) / 3;
  [['TOTAL HOURS', `${totalHours} hrs`, BRIGHT], ['SERVICES', `${lines.length}`, [5, 150, 105]], ['TOTAL', formatCurrency(total), NAVY]].forEach(([label, value, color], i) => {
    const sx = MARGIN + i * (sw + 4);
    doc.setFillColor(250, 252, 255); doc.setDrawColor(...BORDER); doc.setLineWidth(0.3);
    doc.roundedRect(sx, y, sw, 20, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...color);
    doc.text(label, sx + 6, y + 7);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(...TEXT);
    doc.text(value, sx + 6, y + 16);
  });
  y += 30;

  // Table
  autoTable(doc, {
    startY: y,
    head: [['SERVICE', 'SCOPE / NOTES', 'HOURS', 'RATE', 'SUBTOTAL']],
    body: lines.map((l) => {
      const svc = SERVICES.find((s) => s.id === l.serviceId);
      return [svc?.name || '—', l.notes || '—', `${l.hours} hrs`, `${formatCurrency(svc?.rate || 0)}/hr`, formatCurrency(l.subtotal)];
    }),
    margin: { left: MARGIN, right: MARGIN },
    styles: { fontSize: 9, cellPadding: { top: 5, bottom: 5, left: 6, right: 6 }, textColor: [51, 65, 85] },
    headStyles: { fillColor: NAVY, textColor: WHITE, fontSize: 7.5, fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: TEXT, cellWidth: 42 },
      1: { textColor: MUTED },
      2: { halign: 'center', cellWidth: 22 },
      3: { halign: 'center', cellWidth: 28, textColor: MUTED },
      4: { halign: 'right', cellWidth: 30, fontStyle: 'bold', textColor: TEXT },
    },
    alternateRowStyles: { fillColor: [248, 250, 255] },
  });

  y = doc.lastAutoTable.finalY + 10;
  const tx = MARGIN + CONTENT - 80;

  if (estimate.discount > 0) {
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED); doc.text('Subtotal', tx, y);
    doc.setFont('helvetica', 'bold'); doc.setTextColor(...TEXT);
    doc.text(formatCurrency(subtotal), tx + 80, y, { align: 'right' });
    y += 7;
    doc.setFont('helvetica', 'normal'); doc.setTextColor(5, 150, 105);
    doc.text(`Discount (${estimate.discount}%)`, tx, y);
    doc.text(`−${formatCurrency(discountAmt)}`, tx + 80, y, { align: 'right' });
    y += 3; doc.setDrawColor(...BORDER); doc.setLineWidth(0.3); doc.line(tx, y, tx + 80, y); y += 5;
  }

  doc.setFillColor(...NAVY); doc.roundedRect(tx - 4, y - 4, 84, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...WHITE);
  doc.text('TOTAL INVESTMENT', tx, y + 6);
  doc.setFontSize(12); doc.text(formatCurrency(total), tx + 80, y + 6, { align: 'right' });

  if (estimate.notes?.trim()) {
    y += 24;
    const noteLines = doc.splitTextToSize(estimate.notes, CONTENT - 20);
    doc.setFillColor(255, 251, 235); doc.setDrawColor(217, 119, 6); doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CONTENT, 14 + noteLines.length * 5, 2, 2, 'FD');
    doc.setFillColor(217, 119, 6); doc.rect(MARGIN, y, 3, 14 + noteLines.length * 5, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(217, 119, 6);
    doc.text('NOTES & ASSUMPTIONS', MARGIN + 8, y + 6);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(...MUTED);
    doc.text(noteLines, MARGIN + 8, y + 12);
  }

  // Footer
  const fy = 297 - 14;
  doc.setFillColor(...NAVY); doc.rect(0, fy - 6, W, 20, 'F');
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(150, 180, 255);
  doc.text('www.azularc.com · info@azularc.com', MARGIN, fy + 2);
  doc.text(`Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, W - MARGIN, fy + 2, { align: 'right' });

  doc.save(`Azularc-Estimate-${estimate.id}.pdf`);
};
