// ─── PDF Export ───────────────────────────────────────────────────────────────
// Uses jsPDF + jsPDF-AutoTable (loaded via CDN)

const PDFExport = {
  generate(estimate) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const { lines, subtotal, discountAmt, total, totalHours } = calcEstimateTotals(estimate);

    const PAGE_W  = 210;
    const PAGE_H  = 297;
    const MARGIN  = 18;
    const CONTENT = PAGE_W - MARGIN * 2;

    // ── Brand Colors (RGB) ───────────────────────────────────────────────────
    const NAVY   = [7, 30, 92];
    const BLUE   = [21, 71, 184];
    const BRIGHT = [27, 111, 232];
    const MUTED  = [100, 116, 139];
    const LIGHT  = [235, 242, 255];
    const BORDER = [226, 232, 240];
    const TEXT   = [13, 27, 62];
    const WHITE  = [255, 255, 255];

    // ── Header Band ──────────────────────────────────────────────────────────
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, PAGE_W, 52, 'F');

    // Decorative arc
    doc.setFillColor(...BLUE);
    doc.circle(PAGE_W - 10, -10, 55, 'F');

    doc.setFillColor(...BRIGHT);
    doc.circle(PAGE_W + 8, 60, 40, 'F');

    // Company Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...WHITE);
    doc.text('AZULARC', MARGIN, 22);

    // Tagline
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255, 0.6);
    doc.text('INNOVATIVE DIGITAL SOLUTIONS', MARGIN, 29);

    // Divider line
    doc.setDrawColor(...BRIGHT);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, 33, MARGIN + 50, 33);

    // Document Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...WHITE);
    doc.text('PROJECT ESTIMATE & PROPOSAL', MARGIN, 44);

    // Estimate ID (right side)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(200, 215, 255);
    doc.text(`Ref: ${estimate.id}`, PAGE_W - MARGIN, 18, { align: 'right' });
    doc.text(`Date: ${formatDate(estimate.createdAt)}`, PAGE_W - MARGIN, 25, { align: 'right' });
    doc.text(`Valid until: ${formatDate(estimate.validUntil)}`, PAGE_W - MARGIN, 32, { align: 'right' });

    let y = 64;

    // ── Project Info Block ────────────────────────────────────────────────────
    // Left column: Project details
    doc.setFillColor(...LIGHT);
    doc.roundedRect(MARGIN, y, CONTENT * 0.58, 38, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...BRIGHT);
    doc.text('PROJECT', MARGIN + 8, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...TEXT);
    const projectName = doc.splitTextToSize(estimate.name || 'Untitled Project', CONTENT * 0.55);
    doc.text(projectName, MARGIN + 8, y + 16);

    if (estimate.projectDescription) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      const desc = doc.splitTextToSize(estimate.projectDescription, CONTENT * 0.54);
      doc.text(desc.slice(0, 2), MARGIN + 8, y + 30);
    }

    // Right column: Client details
    const rightX = MARGIN + CONTENT * 0.62;
    const rightW = CONTENT * 0.38;
    doc.setFillColor(...NAVY);
    doc.roundedRect(rightX, y, rightW, 38, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 180, 255);
    doc.text('PREPARED FOR', rightX + 8, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...WHITE);
    const clientName = doc.splitTextToSize(estimate.clientName || 'Client Name', rightW - 12);
    doc.text(clientName, rightX + 8, y + 16);

    if (estimate.clientEmail) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(180, 200, 240);
      doc.text(estimate.clientEmail, rightX + 8, y + 28);
    }

    y += 50;

    // ── Overview Stats Row ────────────────────────────────────────────────────
    const statW = (CONTENT - 8) / 3;
    const stats = [
      { label: 'TOTAL HOURS',    value: `${totalHours} hrs`,        color: BRIGHT },
      { label: 'TOTAL SERVICES', value: `${lines.length} services`, color: [5, 150, 105] },
      { label: 'PROJECT TOTAL',  value: formatCurrency(total),       color: NAVY },
    ];

    stats.forEach((s, i) => {
      const sx = MARGIN + i * (statW + 4);
      doc.setFillColor(250, 252, 255);
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.3);
      doc.roundedRect(sx, y, statW, 20, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...s.color);
      doc.text(s.label, sx + 6, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...TEXT);
      doc.text(s.value, sx + 6, y + 16);
    });

    y += 30;

    // ── Services Table ────────────────────────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text('SCOPE OF WORK & COST BREAKDOWN', MARGIN, y);

    y += 5;

    const tableRows = lines.map(line => {
      const svc = SERVICES.find(s => s.id === line.serviceId);
      return [
        svc ? svc.name : 'Service',
        line.notes || '—',
        `${line.hours || 0} hrs`,
        formatCurrency(svc ? svc.rate : 0) + '/hr',
        formatCurrency(line.subtotal),
      ];
    });

    doc.autoTable({
      startY: y,
      head: [['SERVICE', 'SCOPE / NOTES', 'HOURS', 'RATE', 'SUBTOTAL']],
      body: tableRows,
      margin: { left: MARGIN, right: MARGIN },
      styles: {
        fontSize: 9,
        cellPadding: { top: 5, bottom: 5, left: 6, right: 6 },
        textColor: [51, 65, 85],
        valign: 'middle',
      },
      headStyles: {
        fillColor: NAVY,
        textColor: WHITE,
        fontSize: 7.5,
        fontStyle: 'bold',
        cellPadding: { top: 6, bottom: 6, left: 6, right: 6 },
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: TEXT, cellWidth: 42 },
        1: { textColor: MUTED, cellWidth: 'auto' },
        2: { halign: 'center', cellWidth: 22 },
        3: { halign: 'center', cellWidth: 28, textColor: MUTED },
        4: { halign: 'right',  cellWidth: 30, fontStyle: 'bold', textColor: TEXT },
      },
      alternateRowStyles: { fillColor: [248, 250, 255] },
      tableLineColor: BORDER,
      tableLineWidth: 0.2,
    });

    y = doc.lastAutoTable.finalY + 10;

    // ── Totals Block ──────────────────────────────────────────────────────────
    const totalsX = MARGIN + CONTENT - 80;
    const totalsW = 80;

    if (estimate.discount > 0) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      doc.setTextColor(...MUTED);
      doc.text('Subtotal', totalsX, y);
      doc.setTextColor(...TEXT);
      doc.setFont('helvetica', 'bold');
      doc.text(formatCurrency(subtotal), totalsX + totalsW, y, { align: 'right' });
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(5, 150, 105);
      doc.text(`Discount (${estimate.discount}%)`, totalsX, y);
      doc.text(`−${formatCurrency(discountAmt)}`, totalsX + totalsW, y, { align: 'right' });
      y += 3;

      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.3);
      doc.line(totalsX, y, totalsX + totalsW, y);
      y += 5;
    }

    // Total box
    doc.setFillColor(...NAVY);
    doc.roundedRect(totalsX - 4, y - 4, totalsW + 4, 14, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...WHITE);
    doc.text('TOTAL INVESTMENT', totalsX, y + 6);
    doc.setFontSize(12);
    doc.text(formatCurrency(total), totalsX + totalsW, y + 6, { align: 'right' });

    y += 24;

    // ── Notes Section ─────────────────────────────────────────────────────────
    if (estimate.notes && estimate.notes.trim()) {
      if (y > PAGE_H - 60) { doc.addPage(); y = 20; }

      doc.setFillColor(255, 251, 235);
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.3);
      doc.roundedRect(MARGIN, y, CONTENT, 8 + doc.splitTextToSize(estimate.notes, CONTENT - 20).length * 5, 2, 2, 'FD');

      // Left accent bar
      doc.setFillColor(217, 119, 6);
      doc.rect(MARGIN, y, 3, 8 + doc.splitTextToSize(estimate.notes, CONTENT - 20).length * 5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(217, 119, 6);
      doc.text('NOTES & ASSUMPTIONS', MARGIN + 8, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      const noteLines = doc.splitTextToSize(estimate.notes, CONTENT - 20);
      doc.text(noteLines, MARGIN + 8, y + 12);

      y += 12 + noteLines.length * 5 + 10;
    }

    // ── Signature Section ─────────────────────────────────────────────────────
    if (y > PAGE_H - 60) { doc.addPage(); y = 20; }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text('ACCEPTANCE', MARGIN, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text('By signing below, you agree to the terms outlined in this estimate. Work commences upon receipt of signed proposal and initial deposit.', MARGIN, y, { maxWidth: CONTENT });

    y += 14;

    const sigW = (CONTENT - 10) / 2;
    // Left signature box
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y + 14, MARGIN + sigW, y + 14);
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text('Client Signature', MARGIN, y + 18);
    doc.text('Date', MARGIN + sigW - 20, y + 18);

    // Right signature box
    const sig2X = MARGIN + sigW + 10;
    doc.line(sig2X, y + 14, sig2X + sigW, y + 14);
    doc.text('Authorized by (Azularc)', sig2X, y + 18);
    doc.text('Date', sig2X + sigW - 20, y + 18);

    y += 30;

    // ── Footer ────────────────────────────────────────────────────────────────
    const footerY = PAGE_H - 14;
    doc.setFillColor(...NAVY);
    doc.rect(0, footerY - 6, PAGE_W, 20, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 180, 255);
    doc.text('www.azularc.com  ·  info@azularc.com', MARGIN, footerY + 2);
    doc.text(`Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, PAGE_W - MARGIN, footerY + 2, { align: 'right' });

    // ── Save ──────────────────────────────────────────────────────────────────
    const filename = `Azularc-Estimate-${estimate.id}-${(estimate.clientName || 'Client').replace(/\s+/g, '-')}.pdf`;
    doc.save(filename);
    return filename;
  },
};
