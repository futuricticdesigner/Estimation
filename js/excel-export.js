// ─── Excel Export ─────────────────────────────────────────────────────────────
// Uses SheetJS (XLSX) loaded via CDN

const ExcelExport = {

  // Export a single estimate to a well-formatted XLSX workbook
  exportEstimate(estimate) {
    const { lines, subtotal, discountAmt, total, totalHours } = calcEstimateTotals(estimate);
    const wb = XLSX.utils.book_new();

    // ── Proposal Sheet ───────────────────────────────────────────────────────
    const proposalData = [
      ['AZULARC', '', '', '', ''],
      ['Innovative Digital Solutions', '', '', '', ''],
      ['', '', '', '', ''],
      ['PROJECT ESTIMATE & PROPOSAL', '', '', '', ''],
      ['', '', '', '', ''],
      ['Estimate ID:',      estimate.id,                      '', 'Date:',        formatDate(estimate.createdAt)],
      ['Project:',          estimate.name || '',              '', 'Valid Until:',  formatDate(estimate.validUntil)],
      ['Client:',           estimate.clientName || '',        '', 'Status:',       (STATUSES[estimate.status] || {}).label || estimate.status],
      ['Contact:',          estimate.clientEmail || '',       '', '', ''],
      ['', '', '', '', ''],
      ['PROJECT DESCRIPTION', '', '', '', ''],
      [estimate.projectDescription || '', '', '', '', ''],
      ['', '', '', '', ''],
      ['─────────────────────────────────────────────────────────────────────', '', '', '', ''],
      ['', '', '', '', ''],
      ['SERVICE',           'SCOPE / NOTES',  'HOURS',  'RATE ($/hr)',  'SUBTOTAL ($)'],
    ];

    lines.forEach(line => {
      const svc = SERVICES.find(s => s.id === line.serviceId);
      proposalData.push([
        svc ? svc.name : '',
        line.notes || '',
        line.hours || 0,
        svc ? svc.rate : 0,
        line.subtotal || 0,
      ]);
    });

    proposalData.push(['', '', '', '', '']);
    proposalData.push(['', '', 'TOTALS', '', '']);
    proposalData.push(['', '', `${totalHours} hrs`, 'Subtotal:', subtotal]);

    if (estimate.discount > 0) {
      proposalData.push(['', '', '', `Discount (${estimate.discount}%):`, -discountAmt]);
    }

    proposalData.push(['', '', '', 'TOTAL:', total]);
    proposalData.push(['', '', '', '', '']);

    if (estimate.notes) {
      proposalData.push(['NOTES & ASSUMPTIONS', '', '', '', '']);
      proposalData.push([estimate.notes, '', '', '', '']);
      proposalData.push(['', '', '', '', '']);
    }

    proposalData.push(['Generated:', new Date().toLocaleString(), '', 'www.azularc.com', '']);

    const ws = XLSX.utils.aoa_to_sheet(proposalData);

    // Column widths
    ws['!cols'] = [
      { wch: 36 },
      { wch: 42 },
      { wch: 14 },
      { wch: 16 },
      { wch: 16 },
    ];

    // Merge cells for headers
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },   // Company name
      { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },   // Tagline
      { s: { r: 3, c: 0 }, e: { r: 3, c: 4 } },   // Document title
      { s: { r: 10, c: 0 }, e: { r: 10, c: 4 } }, // Project description heading
      { s: { r: 11, c: 0 }, e: { r: 11, c: 4 } }, // Project description
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Proposal');

    // ── Summary Sheet ────────────────────────────────────────────────────────
    const summaryData = [
      ['Service Breakdown Summary', '', ''],
      ['Estimate:', estimate.id, ''],
      ['Client:', estimate.clientName, ''],
      ['Date:', formatDate(estimate.createdAt), ''],
      ['', '', ''],
      ['Service', 'Hours', 'Total ($)'],
    ];

    lines.forEach(line => {
      const svc = SERVICES.find(s => s.id === line.serviceId);
      summaryData.push([svc ? svc.name : '', line.hours || 0, line.subtotal || 0]);
    });

    summaryData.push(['', '', '']);
    summaryData.push(['Total Hours', totalHours, '']);
    summaryData.push(['Subtotal', '', subtotal]);
    if (estimate.discount > 0) {
      summaryData.push([`Discount (${estimate.discount}%)`, '', -discountAmt]);
    }
    summaryData.push(['TOTAL INVESTMENT', '', total]);

    const ws2 = XLSX.utils.aoa_to_sheet(summaryData);
    ws2['!cols'] = [{ wch: 36 }, { wch: 14 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Summary');

    const filename = `Azularc-Estimate-${estimate.id}.xlsx`;
    XLSX.writeFile(wb, filename);
    return filename;
  },

  // Export all estimates to a multi-sheet workbook
  exportAll(estimates) {
    const wb = XLSX.utils.book_new();

    // ── All Estimates Sheet ──────────────────────────────────────────────────
    const allData = [
      ['AZULARC — All Estimates', '', '', '', '', '', ''],
      [`Generated: ${new Date().toLocaleString()}`, '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['Estimate ID', 'Project Name', 'Client', 'Services', 'Total Hours', 'Total ($)', 'Status', 'Created'],
    ];

    estimates.forEach(est => {
      const { totalHours, total, lines } = calcEstimateTotals(est);
      allData.push([
        est.id,
        est.name || '',
        est.clientName || '',
        lines.length,
        totalHours,
        total,
        (STATUSES[est.status] || {}).label || est.status || 'Draft',
        formatDate(est.createdAt),
      ]);
    });

    // Totals row
    allData.push(['', '', '', '', '', '', '']);
    const grandTotal = estimates.reduce((sum, e) => sum + calcEstimateTotals(e).total, 0);
    const grandHours = estimates.reduce((sum, e) => sum + calcEstimateTotals(e).totalHours, 0);
    allData.push(['TOTALS', '', `${estimates.length} estimates`, '', grandHours, grandTotal, '', '']);

    const ws = XLSX.utils.aoa_to_sheet(allData);
    ws['!cols'] = [
      { wch: 20 }, { wch: 36 }, { wch: 28 },
      { wch: 12 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 16 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'All Estimates');

    // ── Service Rate Sheet ────────────────────────────────────────────────────
    const ratesData = [
      ['AZULARC — Service Rates', ''],
      ['', ''],
      ['Service', 'Hourly Rate (USD)'],
      ...SERVICES.map(s => [s.name, s.rate]),
      ['', ''],
      ['Note: Rates are in USD per hour and subject to change without notice.', ''],
    ];
    const wsRates = XLSX.utils.aoa_to_sheet(ratesData);
    wsRates['!cols'] = [{ wch: 38 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsRates, 'Rates');

    const filename = `Azularc-All-Estimates-${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, filename);
    return filename;
  },
};
