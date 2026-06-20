// ─── Azularc Project Estimator — Main Application ─────────────────────────────

// ─── Icon Library (inline SVGs) ──────────────────────────────────────────────
const Icons = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  estimates: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  plus:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  search:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  edit:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
  copy:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  pdf:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h1a1 1 0 1 1 0 2H9v-4h1a1 1 0 1 1 0 2"/><path d="M14 13v4"/><path d="M17 13h-2v4"/><path d="M17 15h-1.5"/></svg>`,
  excel:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M7 14l2 2 2-2"/><path d="M15 12l2 4"/><path d="M17 12l-2 4"/></svg>`,
  eye:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  back:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  check:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  close:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  dollar:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  clock:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  trending:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  folder:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  dots:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
  send:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  approved:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  info:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  settings:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  download:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  web:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  mobile:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  cloud:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  chart:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  design:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  executive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  warning:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};

function icon(name, cls = '') {
  const svg = Icons[name] || Icons.info;
  if (!cls) return svg;
  return svg.replace('<svg ', `<svg class="${cls}" `);
}

// ─── Toast Notifications ──────────────────────────────────────────────────────
const Toast = {
  show(msg, type = 'default', duration = 3000) {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    const iconName = type === 'success' ? 'check' : type === 'error' ? 'close' : 'info';
    el.innerHTML = `${icon(iconName)} <span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; el.style.transition = '.3s'; setTimeout(() => el.remove(), 300); }, duration);
  },
  success(msg) { this.show(msg, 'success'); },
  error(msg)   { this.show(msg, 'error'); },
  warn(msg)    { this.show(msg, 'warning'); },
};

// ─── Modal Helper ─────────────────────────────────────────────────────────────
const Modal = {
  _overlay: null,
  show(title, bodyHTML, footerHTML = '') {
    if (this._overlay) this._overlay.remove();
    const el = document.createElement('div');
    el.className = 'modal-overlay';
    el.id = 'modal-overlay';
    el.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          <button class="modal-close" id="modal-close-btn">${icon('close')}</button>
        </div>
        <div class="modal-body">${bodyHTML}</div>
        ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
      </div>`;
    document.body.appendChild(el);
    this._overlay = el;
    requestAnimationFrame(() => el.classList.add('open'));
    el.querySelector('#modal-close-btn').addEventListener('click', () => this.close());
    el.addEventListener('click', e => { if (e.target === el) this.close(); });
    return el;
  },
  close() {
    if (!this._overlay) return;
    this._overlay.classList.remove('open');
    setTimeout(() => { if (this._overlay) { this._overlay.remove(); this._overlay = null; } }, 250);
  },
};

// ─── Router ───────────────────────────────────────────────────────────────────
const Router = {
  routes: {},
  register(path, handler) { this.routes[path] = handler; },
  navigate(path) { window.location.hash = path; },
  init() {
    window.addEventListener('hashchange', () => this._dispatch());
    this._dispatch();
  },
  _dispatch() {
    const hash  = window.location.hash.slice(1) || '/';
    const parts = hash.split('/');
    const base  = '/' + (parts[1] || '');
    const param = parts[2] || null;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === base || (base === '/' && el.dataset.route === '/'));
    });

    const handler = this.routes[base];
    if (handler) {
      handler(param);
    } else {
      Views.notFound();
    }
  },
};

// ─── Top Bar Update ───────────────────────────────────────────────────────────
function setTopBar(title, subtitle = '', actionsHTML = '') {
  document.getElementById('topbar-title').textContent  = title;
  document.getElementById('topbar-subtitle').textContent = subtitle;
  document.getElementById('topbar-actions').innerHTML  = actionsHTML;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function statusBadge(status) {
  const s = STATUSES[status] || { label: 'Draft', color: '#64748B', bg: '#F1F5F9' };
  return `<span class="badge" style="color:${s.color};background:${s.bg}">${s.label}</span>`;
}

// ─── Service Icon Color ───────────────────────────────────────────────────────
function serviceStyle(svc) {
  return `background:${svc.color}18;color:${svc.color}`;
}

// ─── Views ────────────────────────────────────────────────────────────────────
const Views = {

  // ── Dashboard ───────────────────────────────────────────────────────────────
  dashboard() {
    setTopBar('Dashboard', 'Welcome back, Sales Team',
      `<button class="btn btn-primary" onclick="Router.navigate('/new')">${icon('plus')} New Estimate</button>`);

    const estimates = State.getAll();
    const total = estimates.reduce((s, e) => s + calcEstimateTotals(e).total, 0);
    const approved = estimates.filter(e => e.status === 'approved');
    const pipeline = estimates.filter(e => ['sent', 'draft', 'revision'].includes(e.status));
    const pipelineVal = pipeline.reduce((s, e) => s + calcEstimateTotals(e).total, 0);
    const recent = estimates.slice(0, 5);

    render(`
      <div class="fade-in">
        <div class="stats-grid">
          ${statCard('Total Estimates', estimates.length, 'All time', 'folder', '#1B6FE8', '#EBF2FF')}
          ${statCard('Pipeline Value', formatCurrency(pipelineVal), `${pipeline.length} active estimates`, 'dollar', '#7C3AED', '#F3F0FF')}
          ${statCard('Total Portfolio', formatCurrency(total), 'Across all estimates', 'trending', '#059669', '#ECFDF5')}
          ${statCard('Approved', approved.length, formatCurrency(approved.reduce((s,e)=>s+calcEstimateTotals(e).total,0)), 'approved', '#D97706', '#FFFBEB')}
        </div>

        <div style="display:grid;grid-template-columns:1fr 340px;gap:20px">
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Recent Estimates</div>
                <div class="card-subtitle">Your 5 most recently created estimates</div>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/estimates')">${icon('folder')} View All</button>
            </div>
            <div class="table-wrap">
              ${recent.length === 0
                ? emptyState('estimates', 'No estimates yet', 'Create your first estimate to get started.', "Router.navigate('/new')", 'Create Estimate')
                : `<table class="data-table">
                    <thead><tr>
                      <th>Project</th><th>Client</th><th>Total</th><th>Status</th><th>Created</th><th></th>
                    </tr></thead>
                    <tbody>
                      ${recent.map(e => {
                        const { total } = calcEstimateTotals(e);
                        return `<tr onclick="Router.navigate('/estimate/${e.id}')">
                          <td><div class="cell-primary">${escHtml(e.name || 'Untitled')}</div><div class="cell-mono">${e.id}</div></td>
                          <td>${escHtml(e.clientName || '—')}</td>
                          <td class="cell-amount">${formatCurrency(total)}</td>
                          <td>${statusBadge(e.status)}</td>
                          <td class="cell-muted">${formatDate(e.createdAt)}</td>
                          <td class="cell-actions" onclick="event.stopPropagation()">
                            <button class="btn btn-ghost btn-icon" title="Edit" onclick="Router.navigate('/edit/${e.id}')">${icon('edit')}</button>
                          </td>
                        </tr>`;
                      }).join('')}
                    </tbody>
                  </table>`
              }
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card">
              <div class="card-header"><div class="card-title">Quick Actions</div></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
                <button class="btn btn-primary btn-lg w-full" onclick="Router.navigate('/new')" style="justify-content:center">${icon('plus')} New Estimate</button>
                <button class="btn btn-secondary btn-lg w-full" onclick="Router.navigate('/estimates')" style="justify-content:center">${icon('folder')} All Estimates</button>
                <button class="btn btn-ghost btn-lg w-full" onclick="ExcelExport.exportAll(State.getAll());Toast.success('Exported all estimates to Excel')" style="justify-content:center">${icon('excel')} Export All to Excel</button>
              </div>
            </div>

            <div class="card">
              <div class="card-header"><div class="card-title">Service Rates</div></div>
              <div class="card-body" style="padding:0">
                <table style="width:100%;border-collapse:collapse;font-size:13px">
                  ${SERVICES.map(s => `
                    <tr style="border-bottom:1px solid var(--border)">
                      <td style="padding:10px 16px;color:var(--text-mid)">${s.name}</td>
                      <td style="padding:10px 16px;text-align:right;font-weight:700;color:var(--az-mid)">${formatCurrency(s.rate)}<span style="font-size:11px;font-weight:400;color:var(--text-muted)">/hr</span></td>
                    </tr>`).join('')}
                </table>
              </div>
            </div>
          </div>
        </div>

        ${estimates.length > 0 ? `
        <div class="card mt-6">
          <div class="card-header">
            <div class="card-title">Estimates by Status</div>
          </div>
          <div class="card-body" style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;text-align:center">
            ${Object.entries(STATUSES).map(([key, s]) => {
              const count = estimates.filter(e => e.status === key).length;
              return `<div style="padding:16px;background:${s.bg};border-radius:var(--radius);cursor:pointer" onclick="Router.navigate('/estimates?status=${key}')">
                <div style="font-size:24px;font-weight:800;color:${s.color}">${count}</div>
                <div style="font-size:12px;color:${s.color};font-weight:600;margin-top:4px">${s.label}</div>
              </div>`;
            }).join('')}
          </div>
        </div>` : ''}
      </div>
    `);
  },

  // ── Estimates List ──────────────────────────────────────────────────────────
  estimatesList(filterStatus = null) {
    const searchParam = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const initStatus  = filterStatus || searchParam.get('status') || 'all';

    setTopBar('All Estimates', 'View, manage, and export project estimates',
      `<button class="btn btn-ghost btn-sm" onclick="ExcelExport.exportAll(State.getAll());Toast.success('Exported to Excel')">${icon('excel')} Export All</button>
       <button class="btn btn-primary" onclick="Router.navigate('/new')">${icon('plus')} New Estimate</button>`);

    const renderList = (statusFilter, searchTerm) => {
      let estimates = State.getAll();
      if (statusFilter && statusFilter !== 'all') {
        estimates = estimates.filter(e => e.status === statusFilter);
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        estimates = estimates.filter(e =>
          (e.name || '').toLowerCase().includes(q) ||
          (e.clientName || '').toLowerCase().includes(q) ||
          (e.id || '').toLowerCase().includes(q)
        );
      }

      const tbody = document.getElementById('estimates-tbody');
      const emptyEl = document.getElementById('estimates-empty');
      if (!tbody) return;

      if (estimates.length === 0) {
        tbody.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
      } else {
        if (emptyEl) emptyEl.style.display = 'none';
        tbody.innerHTML = estimates.map(e => {
          const { total, totalHours } = calcEstimateTotals(e);
          return `<tr onclick="Router.navigate('/estimate/${e.id}')">
            <td><div class="cell-primary">${escHtml(e.name || 'Untitled')}</div><div class="cell-mono">${e.id}</div></td>
            <td><div style="font-weight:500">${escHtml(e.clientName || '—')}</div><div class="cell-muted">${escHtml(e.clientEmail || '')}</div></td>
            <td class="cell-muted">${totalHours} hrs</td>
            <td class="cell-amount">${formatCurrency(total)}</td>
            <td>${statusBadge(e.status)}</td>
            <td class="cell-muted">${formatDate(e.createdAt)}</td>
            <td class="cell-muted">${formatDate(e.validUntil)}</td>
            <td class="cell-actions" onclick="event.stopPropagation()">
              <button class="btn btn-ghost btn-icon" title="View" onclick="Router.navigate('/estimate/${e.id}')">${icon('eye')}</button>
              <button class="btn btn-ghost btn-icon" title="Edit" onclick="Router.navigate('/edit/${e.id}')">${icon('edit')}</button>
              <div class="dropdown">
                <button class="btn btn-ghost btn-icon" title="More" onclick="toggleDropdown(this)">${icon('dots')}</button>
                <div class="dropdown-menu">
                  <button class="dropdown-item" onclick="closeDropdowns();Router.navigate('/edit/${e.id}')">${icon('edit')} Edit</button>
                  <button class="dropdown-item" onclick="closeDropdowns();duplicateEstimate('${e.id}')">${icon('copy')} Duplicate</button>
                  <button class="dropdown-item" onclick="closeDropdowns();PDFExport.generate(State.get('${e.id}'));Toast.success('PDF downloaded')">${icon('pdf')} Export PDF</button>
                  <button class="dropdown-item" onclick="closeDropdowns();ExcelExport.exportEstimate(State.get('${e.id}'));Toast.success('Excel exported')">${icon('excel')} Export Excel</button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item danger" onclick="closeDropdowns();confirmDelete('${e.id}')">${icon('trash')} Delete</button>
                </div>
              </div>
            </td>
          </tr>`;
        }).join('');
      }
    };

    render(`
      <div class="fade-in">
        <div class="filter-bar">
          <div class="search-box">
            ${icon('search')}
            <input id="estimates-search" type="text" placeholder="Search by project, client, ID…" />
          </div>
          <div class="filter-chips">
            <button class="filter-chip ${initStatus === 'all' ? 'active' : ''}" data-filter="all" onclick="filterEstimates(this,'all')">All</button>
            ${Object.entries(STATUSES).map(([k, s]) =>
              `<button class="filter-chip ${initStatus === k ? 'active' : ''}" data-filter="${k}" onclick="filterEstimates(this,'${k}')">${s.label}</button>`
            ).join('')}
          </div>
        </div>

        <div class="card">
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr>
                <th>Project</th><th>Client</th><th>Hours</th><th>Total</th><th>Status</th><th>Created</th><th>Valid Until</th><th style="text-align:right">Actions</th>
              </tr></thead>
              <tbody id="estimates-tbody"></tbody>
            </table>
            <div id="estimates-empty" style="display:none">
              ${emptyState('folder', 'No estimates found', 'Try adjusting your search or filters, or create a new estimate.', "Router.navigate('/new')", 'New Estimate')}
            </div>
          </div>
        </div>
      </div>
    `);

    renderList(initStatus, '');

    const searchInput = document.getElementById('estimates-search');
    if (searchInput) {
      let debounce;
      searchInput.addEventListener('input', e => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          const activeFilter = document.querySelector('.filter-chip.active');
          renderList(activeFilter ? activeFilter.dataset.filter : 'all', e.target.value);
        }, 250);
      });
    }

    window._currentFilter = initStatus;
    window._currentSearch = '';
  },

  // ── New / Edit Estimate ─────────────────────────────────────────────────────
  estimateForm(estimateId = null) {
    const isEdit = !!estimateId;
    const existing = isEdit ? State.get(estimateId) : null;

    if (isEdit && !existing) {
      Toast.error('Estimate not found');
      Router.navigate('/estimates');
      return;
    }

    setTopBar(
      isEdit ? 'Edit Estimate' : 'New Estimate',
      isEdit ? `Editing ${existing.id}` : 'Create a new project estimate',
      `<button class="btn btn-ghost" onclick="Router.navigate('${isEdit ? '/estimate/' + estimateId : '/estimates'}')">${icon('back')} ${isEdit ? 'Back' : 'Cancel'}</button>`
    );

    const today = todayISO();
    const draft = existing ? JSON.parse(JSON.stringify(existing)) : {
      id: generateId(),
      name: '', clientName: '', clientEmail: '',
      projectDescription: '', status: 'draft',
      validUntil: addDays(today, 30), discount: 0,
      notes: '', lineItems: [],
    };

    // Track step
    let currentStep = 1;
    const TOTAL_STEPS = 3;

    const renderWizard = () => {
      const stepsHTML = [
        { label: 'Project Info' },
        { label: 'Services & Hours' },
        { label: 'Review & Save' },
      ].map((s, i) => {
        const step = i + 1;
        const cls = step < currentStep ? 'done' : step === currentStep ? 'active' : '';
        return `<div class="wizard-step ${cls}">
          <div class="step-circle">${step < currentStep ? icon('check', 'icon-inline') : step}</div>
          <span class="step-label">${s.label}</span>
        </div>`;
      }).join('');

      return `<div class="wizard-steps"><div class="wizard-track"></div>${stepsHTML}</div>`;
    };

    const renderStep1 = () => `
      <div class="fade-in">
        <div class="card">
          <div class="card-header">
            <div><div class="card-title">Project Information</div><div class="card-subtitle">Enter the project and client details</div></div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Project Name <span class="required">*</span></label>
              <input class="form-control" id="f-name" type="text" placeholder="e.g. E-Commerce Platform Redesign" value="${escHtml(draft.name)}" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Client / Company Name <span class="required">*</span></label>
                <input class="form-control" id="f-client" type="text" placeholder="e.g. Acme Corp" value="${escHtml(draft.clientName)}" />
              </div>
              <div class="form-group">
                <label class="form-label">Client Email</label>
                <input class="form-control" id="f-email" type="email" placeholder="pm@client.com" value="${escHtml(draft.clientEmail)}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Project Description <span class="required">*</span></label>
              <textarea class="form-control" id="f-desc" rows="4" placeholder="Briefly describe the project scope, goals, and deliverables…">${escHtml(draft.projectDescription)}</textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Status</label>
                <select class="form-control" id="f-status">
                  ${Object.entries(STATUSES).map(([k, s]) => `<option value="${k}" ${draft.status === k ? 'selected' : ''}>${s.label}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Valid Until</label>
                <input class="form-control" id="f-valid" type="date" value="${draft.validUntil || addDays(today, 30)}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Notes & Assumptions</label>
              <textarea class="form-control" id="f-notes" rows="3" placeholder="Any assumptions, exclusions, or important notes for the client…">${escHtml(draft.notes)}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;

    const renderStep2 = () => {
      const selectedIds = new Set(draft.lineItems.map(li => li.serviceId));
      return `
        <div class="fade-in">
          <div class="card" style="margin-bottom:20px">
            <div class="card-header">
              <div><div class="card-title">Select Services</div><div class="card-subtitle">Choose which services are required for this project</div></div>
            </div>
            <div class="card-body">
              <div class="service-grid">
                ${SERVICES.map(s => `
                  <div class="service-chip ${selectedIds.has(s.id) ? 'selected' : ''}" onclick="toggleService('${s.id}')" id="chip-${s.id}">
                    <div class="service-chip-icon" style="${serviceStyle(s)}">${icon(s.icon)}</div>
                    <div>
                      <div class="service-chip-name">${s.name}</div>
                      <div class="service-chip-rate">${formatCurrency(s.rate)}/hr</div>
                    </div>
                    <div class="chip-check"></div>
                  </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div><div class="card-title">Hours & Scope</div><div class="card-subtitle">Enter estimated hours and scope notes for each selected service</div></div>
            </div>
            <div id="line-items-area">
              ${renderLineItemsTable()}
            </div>
          </div>

          <div class="form-group mt-4">
            <label class="form-label">Discount (%)</label>
            <input class="form-control" id="f-discount" type="number" min="0" max="100" step="0.5" placeholder="0" value="${draft.discount || 0}" style="max-width:180px" oninput="refreshTotals()" />
            <div class="form-hint">Applied as a percentage off the subtotal</div>
          </div>

          <div class="totals-panel mt-4" id="totals-panel">
            ${renderTotalsHTML()}
          </div>
        </div>
      `;
    };

    const renderLineItemsTable = () => {
      if (draft.lineItems.length === 0) {
        return `<div style="padding:32px;text-align:center;color:var(--text-muted)">
          ${icon('info')}
          <p style="margin-top:10px;font-size:13.5px">Select services above to add line items</p>
        </div>`;
      }
      return `
        <div class="table-wrap">
          <table class="line-items-table">
            <thead><tr>
              <th style="width:30%">Service</th>
              <th style="width:14%;text-align:center">Hours <span class="required">*</span></th>
              <th style="width:14%;text-align:center">Rate</th>
              <th>Scope / Notes</th>
              <th style="width:13%;text-align:right">Subtotal</th>
              <th style="width:5%"></th>
            </tr></thead>
            <tbody>
              ${draft.lineItems.map((li, idx) => {
                const svc = SERVICES.find(s => s.id === li.serviceId);
                const sub = (li.hours || 0) * (svc ? svc.rate : 0);
                return `<tr>
                  <td>
                    <div class="service-name">${svc ? svc.name : '—'}</div>
                    <div class="service-rate">${formatCurrency(svc ? svc.rate : 0)}/hr</div>
                  </td>
                  <td style="text-align:center">
                    <input class="li-hours-input" type="number" min="0" step="0.5" value="${li.hours || ''}" placeholder="0"
                      onchange="updateLineItem(${idx},'hours',this.value)"
                      oninput="updateLineItem(${idx},'hours',this.value)" />
                  </td>
                  <td style="text-align:center;color:var(--text-muted);font-size:13px">${formatCurrency(svc ? svc.rate : 0)}</td>
                  <td>
                    <input class="li-notes-input" type="text" value="${escHtml(li.notes || '')}" placeholder="Brief scope description…"
                      oninput="updateLineItem(${idx},'notes',this.value)" />
                  </td>
                  <td class="li-subtotal" id="li-sub-${idx}">${formatCurrency(sub)}</td>
                  <td>
                    <button class="li-remove-btn" onclick="removeLineItem('${li.serviceId}')" title="Remove">${icon('close')}</button>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    };

    const renderTotalsHTML = () => {
      const disc = parseFloat(document.getElementById('f-discount')?.value || draft.discount || 0);
      draft.discount = disc;
      const { subtotal, discountAmt, total, totalHours } = calcEstimateTotals(draft);
      return `
        <div class="totals-row"><span>Total Hours</span><span><strong>${totalHours} hrs</strong></span></div>
        <div class="totals-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        ${disc > 0 ? `<div class="totals-row discount"><span>Discount (${disc}%)</span><span>−${formatCurrency(discountAmt)}</span></div>` : ''}
        <hr class="totals-divider">
        <div class="totals-total"><span>Total Investment</span><span>${formatCurrency(total)}</span></div>
      `;
    };

    const renderStep3 = () => {
      const { lines, subtotal, discountAmt, total, totalHours } = calcEstimateTotals(draft);
      return `
        <div class="fade-in">
          <div class="detail-header">
            <div class="detail-id">${draft.id}</div>
            <div class="detail-name">${escHtml(draft.name || 'Untitled Project')}</div>
            <div class="detail-client">${escHtml(draft.clientName || '')}${draft.clientEmail ? ' · ' + escHtml(draft.clientEmail) : ''}</div>
            <div class="detail-meta">
              <div class="detail-meta-item">Hours<strong>${totalHours} hrs</strong></div>
              <div class="detail-meta-item">Services<strong>${lines.length}</strong></div>
              <div class="detail-meta-item">Status<strong>${(STATUSES[draft.status] || {}).label || 'Draft'}</strong></div>
              <div class="detail-meta-item">Valid Until<strong>${formatDate(draft.validUntil)}</strong></div>
              <div class="detail-meta-item">Total<strong>${formatCurrency(total)}</strong></div>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><div class="card-title">Cost Breakdown</div></div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Service</th><th>Notes</th><th style="text-align:center">Hours</th><th style="text-align:center">Rate</th><th style="text-align:right">Subtotal</th></tr></thead>
                <tbody>
                  ${lines.map(l => {
                    const svc = SERVICES.find(s => s.id === l.serviceId);
                    return `<tr>
                      <td class="cell-primary">${svc ? svc.name : '—'}</td>
                      <td class="cell-muted">${escHtml(l.notes || '—')}</td>
                      <td style="text-align:center">${l.hours}</td>
                      <td style="text-align:center;color:var(--text-muted)">${formatCurrency(l.rate)}</td>
                      <td class="cell-amount" style="text-align:right">${formatCurrency(l.subtotal)}</td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
            <div style="padding:16px 24px;border-top:1px solid var(--border)">
              <div style="margin-left:auto;max-width:280px">
                <div class="totals-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
                ${draft.discount > 0 ? `<div class="totals-row discount"><span>Discount (${draft.discount}%)</span><span>−${formatCurrency(discountAmt)}</span></div>` : ''}
                <hr class="totals-divider">
                <div class="totals-total"><span>Total</span><span>${formatCurrency(total)}</span></div>
              </div>
            </div>
          </div>

          ${draft.notes ? `
          <div class="card mt-4" style="border-left:4px solid var(--warning)">
            <div class="card-body">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--warning);margin-bottom:6px">Notes & Assumptions</div>
              <p style="font-size:13.5px;color:var(--text-mid)">${escHtml(draft.notes)}</p>
            </div>
          </div>` : ''}
        </div>
      `;
    };

    // Collect form values from step 1
    const collectStep1 = () => {
      draft.name               = document.getElementById('f-name')?.value.trim() || '';
      draft.clientName         = document.getElementById('f-client')?.value.trim() || '';
      draft.clientEmail        = document.getElementById('f-email')?.value.trim() || '';
      draft.projectDescription = document.getElementById('f-desc')?.value.trim() || '';
      draft.status             = document.getElementById('f-status')?.value || 'draft';
      draft.validUntil         = document.getElementById('f-valid')?.value || '';
      draft.notes              = document.getElementById('f-notes')?.value.trim() || '';
    };

    const validateStep1 = () => {
      if (!draft.name)               { Toast.error('Project name is required'); return false; }
      if (!draft.clientName)         { Toast.error('Client name is required'); return false; }
      if (!draft.projectDescription) { Toast.error('Project description is required'); return false; }
      return true;
    };

    const collectStep2 = () => {
      draft.discount = parseFloat(document.getElementById('f-discount')?.value || 0);
    };

    const validateStep2 = () => {
      if (draft.lineItems.length === 0) { Toast.error('Please select at least one service'); return false; }
      const missingHours = draft.lineItems.some(li => !li.hours || li.hours <= 0);
      if (missingHours) { Toast.error('Please enter hours for all selected services'); return false; }
      return true;
    };

    const renderCurrentStep = () => {
      const stepContent = document.getElementById('step-content');
      const wizardEl    = document.getElementById('wizard-container');
      if (!stepContent || !wizardEl) return;
      wizardEl.innerHTML = renderWizard();
      stepContent.innerHTML = currentStep === 1 ? renderStep1() : currentStep === 2 ? renderStep2() : renderStep3();
      updateNavButtons();
    };

    const updateNavButtons = () => {
      const prevBtn = document.getElementById('btn-prev');
      const nextBtn = document.getElementById('btn-next');
      const saveBtn = document.getElementById('btn-save');
      if (!prevBtn || !nextBtn) return;
      prevBtn.style.display  = currentStep === 1 ? 'none' : '';
      nextBtn.style.display  = currentStep === TOTAL_STEPS ? 'none' : '';
      saveBtn.style.display  = currentStep === TOTAL_STEPS ? '' : 'none';
    };

    render(`
      <div class="fade-in">
        <div id="wizard-container">${renderWizard()}</div>
        <div id="step-content"></div>
        <div style="display:flex;justify-content:space-between;margin-top:24px">
          <button id="btn-prev" class="btn btn-ghost" onclick="wizardPrev()">${icon('back')} Previous</button>
          <div style="display:flex;gap:10px">
            <button id="btn-next" class="btn btn-primary" onclick="wizardNext()">Next Step ${icon('chevron')}</button>
            <button id="btn-save" class="btn btn-success" style="display:none" onclick="saveEstimate()">${icon('check')} ${isEdit ? 'Save Changes' : 'Create Estimate'}</button>
          </div>
        </div>
      </div>
    `);

    // Expose to global scope for inline handlers
    window._wizardDraft = draft;
    window._currentStep = currentStep;

    window.wizardNext = () => {
      if (currentStep === 1) { collectStep1(); if (!validateStep1()) return; }
      if (currentStep === 2) { collectStep2(); if (!validateStep2()) return; }
      if (currentStep < TOTAL_STEPS) { currentStep++; window._currentStep = currentStep; renderCurrentStep(); }
    };

    window.wizardPrev = () => {
      if (currentStep > 1) { currentStep--; window._currentStep = currentStep; renderCurrentStep(); }
    };

    window.toggleService = (serviceId) => {
      const idx = draft.lineItems.findIndex(li => li.serviceId === serviceId);
      if (idx === -1) {
        draft.lineItems.push({ serviceId, hours: 0, notes: '' });
      } else {
        draft.lineItems.splice(idx, 1);
      }
      const chip = document.getElementById('chip-' + serviceId);
      if (chip) chip.classList.toggle('selected', idx === -1);
      const liArea = document.getElementById('line-items-area');
      if (liArea) liArea.innerHTML = renderLineItemsTable();
      const totalsPanel = document.getElementById('totals-panel');
      if (totalsPanel) totalsPanel.innerHTML = renderTotalsHTML();
    };

    window.updateLineItem = (idx, field, value) => {
      if (!draft.lineItems[idx]) return;
      draft.lineItems[idx][field] = field === 'hours' ? parseFloat(value) || 0 : value;
      if (field === 'hours') {
        const svc = SERVICES.find(s => s.id === draft.lineItems[idx].serviceId);
        const sub = (draft.lineItems[idx].hours || 0) * (svc ? svc.rate : 0);
        const subEl = document.getElementById(`li-sub-${idx}`);
        if (subEl) subEl.textContent = formatCurrency(sub);
        refreshTotals();
      }
    };

    window.removeLineItem = (serviceId) => {
      draft.lineItems = draft.lineItems.filter(li => li.serviceId !== serviceId);
      const chip = document.getElementById('chip-' + serviceId);
      if (chip) chip.classList.remove('selected');
      const liArea = document.getElementById('line-items-area');
      if (liArea) liArea.innerHTML = renderLineItemsTable();
      refreshTotals();
    };

    window.refreshTotals = () => {
      const disc = parseFloat(document.getElementById('f-discount')?.value || 0);
      draft.discount = disc;
      const totalsPanel = document.getElementById('totals-panel');
      if (totalsPanel) totalsPanel.innerHTML = renderTotalsHTML();
    };

    window.saveEstimate = () => {
      // Values already collected into `draft` during step transitions — validate from draft directly
      if (!validateStep1() || !validateStep2()) return;
      State.save(draft);
      Toast.success(isEdit ? 'Estimate updated successfully' : 'Estimate created successfully');
      Router.navigate('/estimate/' + draft.id);
    };

    // Render first step
    const stepContent = document.getElementById('step-content');
    if (stepContent) stepContent.innerHTML = renderStep1();
    updateNavButtons();
  },

  // ── Estimate Detail ─────────────────────────────────────────────────────────
  estimateDetail(id) {
    const estimate = State.get(id);
    if (!estimate) { Toast.error('Estimate not found'); Router.navigate('/estimates'); return; }

    const { lines, subtotal, discountAmt, total, totalHours } = calcEstimateTotals(estimate);

    setTopBar(estimate.name || 'Estimate', estimate.id, `
      <button class="btn btn-ghost" onclick="Router.navigate('/estimates')">${icon('back')} All Estimates</button>
      <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/edit/${id}')">${icon('edit')} Edit</button>
      <div class="dropdown">
        <button class="btn btn-secondary" onclick="toggleDropdown(this)">${icon('download')} Export ${icon('chevron')}</button>
        <div class="dropdown-menu">
          <button class="dropdown-item" onclick="closeDropdowns();PDFExport.generate(State.get('${id}'));Toast.success('PDF downloaded')">${icon('pdf')} Download PDF</button>
          <button class="dropdown-item" onclick="closeDropdowns();ExcelExport.exportEstimate(State.get('${id}'));Toast.success('Excel exported')">${icon('excel')} Export to Excel</button>
        </div>
      </div>
      <button class="btn btn-primary" onclick="Router.navigate('/edit/${id}')">${icon('edit')} Edit Estimate</button>
    `);

    render(`
      <div class="fade-in">
        <div class="detail-header">
          <div class="detail-id">${estimate.id}</div>
          <div class="detail-name">${escHtml(estimate.name || 'Untitled Project')}</div>
          <div class="detail-client">${escHtml(estimate.clientName || '')}${estimate.clientEmail ? ' · ' + escHtml(estimate.clientEmail) : ''}</div>
          <div class="detail-meta">
            <div class="detail-meta-item">Total Hours<strong>${totalHours} hrs</strong></div>
            <div class="detail-meta-item">Services<strong>${lines.length}</strong></div>
            <div class="detail-meta-item">Status<strong>${(STATUSES[estimate.status] || {}).label || 'Draft'}</strong></div>
            <div class="detail-meta-item">Created<strong>${formatDate(estimate.createdAt)}</strong></div>
            <div class="detail-meta-item">Valid Until<strong>${formatDate(estimate.validUntil)}</strong></div>
            <div class="detail-meta-item">Total Investment<strong style="font-size:18px">${formatCurrency(total)}</strong></div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start">
          <div>
            <div class="card mb-4">
              <div class="card-header">
                <div class="card-title">Cost Breakdown</div>
                <div>${statusBadge(estimate.status)}</div>
              </div>
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>Service</th><th>Scope / Notes</th><th style="text-align:center">Hours</th><th style="text-align:center">Rate</th><th style="text-align:right">Subtotal</th></tr></thead>
                  <tbody>
                    ${lines.map(l => {
                      const svc = SERVICES.find(s => s.id === l.serviceId);
                      return `<tr>
                        <td>
                          <div style="display:flex;align-items:center;gap:8px">
                            <div style="width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;${svc ? serviceStyle(svc) : ''}">
                              ${svc ? icon(svc.icon) : ''}
                            </div>
                            <span class="cell-primary">${svc ? svc.name : '—'}</span>
                          </div>
                        </td>
                        <td class="cell-muted">${escHtml(l.notes || '—')}</td>
                        <td style="text-align:center;font-weight:600">${l.hours}</td>
                        <td style="text-align:center;color:var(--text-muted)">${formatCurrency(l.rate)}/hr</td>
                        <td class="cell-amount" style="text-align:right">${formatCurrency(l.subtotal)}</td>
                      </tr>`;
                    }).join('')}
                  </tbody>
                </table>
              </div>
              <div style="padding:16px 24px;border-top:1px solid var(--border)">
                <div style="margin-left:auto;max-width:280px">
                  <div class="totals-row"><span style="color:var(--text-muted)">Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
                  ${estimate.discount > 0 ? `<div class="totals-row discount"><span>Discount (${estimate.discount}%)</span><span>−${formatCurrency(discountAmt)}</span></div>` : ''}
                  <hr class="totals-divider">
                  <div class="totals-total"><span>Total Investment</span><span>${formatCurrency(total)}</span></div>
                </div>
              </div>
            </div>

            ${estimate.projectDescription ? `
            <div class="card mb-4">
              <div class="card-header"><div class="card-title">Project Description</div></div>
              <div class="card-body"><p style="font-size:14px;line-height:1.7;color:var(--text-mid)">${escHtml(estimate.projectDescription)}</p></div>
            </div>` : ''}

            ${estimate.notes ? `
            <div class="card" style="border-left:4px solid var(--warning)">
              <div class="card-body">
                <div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--warning);margin-bottom:8px">${icon('warning', 'icon-inline')} Notes & Assumptions</div>
                <p style="font-size:13.5px;color:var(--text-mid);line-height:1.7">${escHtml(estimate.notes)}</p>
              </div>
            </div>` : ''}
          </div>

          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card">
              <div class="card-header"><div class="card-title">Actions</div></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary w-full" style="justify-content:center" onclick="PDFExport.generate(State.get('${id}'));Toast.success('PDF downloaded')">${icon('pdf')} Download PDF Proposal</button>
                <button class="btn btn-secondary w-full" style="justify-content:center" onclick="ExcelExport.exportEstimate(State.get('${id}'));Toast.success('Excel exported')">${icon('excel')} Export to Excel</button>
                <button class="btn btn-ghost w-full" style="justify-content:center" onclick="Router.navigate('/edit/${id}')">${icon('edit')} Edit Estimate</button>
                <button class="btn btn-ghost w-full" style="justify-content:center" onclick="duplicateEstimate('${id}')">${icon('copy')} Duplicate</button>
              </div>
            </div>

            <div class="card">
              <div class="card-header"><div class="card-title">Update Status</div></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:6px">
                ${Object.entries(STATUSES).map(([k, s]) => `
                  <button class="btn w-full ${estimate.status === k ? 'btn-primary' : 'btn-ghost'}" style="justify-content:start;border-color:${estimate.status===k?'':s.color+'44'};color:${estimate.status===k?'#fff':s.color}"
                    onclick="State.setStatus('${id}','${k}');Toast.success('Status updated to ${s.label}');Views.estimateDetail('${id}')">
                    ${estimate.status === k ? icon('check') : ''}
                    ${s.label}
                  </button>`).join('')}
              </div>
            </div>

            <div class="card">
              <div class="card-header"><div class="card-title">Summary</div></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
                ${[
                  ['Total Hours', totalHours + ' hrs'],
                  ['Services', lines.length],
                  ['Subtotal', formatCurrency(subtotal)],
                  ...(estimate.discount > 0 ? [['Discount', `${estimate.discount}%`]] : []),
                  ['Total', formatCurrency(total)],
                ].map(([l, v]) => `<div style="display:flex;justify-content:space-between;font-size:13.5px">
                  <span style="color:var(--text-muted)">${l}</span>
                  <span style="font-weight:600">${v}</span>
                </div>`).join('<hr style="border:none;border-top:1px solid var(--border)">')}
              </div>
            </div>

            <div class="card" style="border-color:var(--danger-bg)">
              <div class="card-body">
                <button class="btn btn-danger w-full" style="justify-content:center" onclick="confirmDelete('${id}')">${icon('trash')} Delete Estimate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  },

  notFound() {
    setTopBar('Not Found', '');
    render(`<div class="empty-state">${icon('info')}<h3>Page not found</h3><p>The page you're looking for doesn't exist.</p>
      <button class="btn btn-primary" onclick="Router.navigate('/')">Go to Dashboard</button></div>`);
  },
};

// ─── Utility Renderers ────────────────────────────────────────────────────────
function render(html) {
  const el = document.getElementById('page-content');
  if (el) el.innerHTML = html;
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function statCard(label, value, sub, iconName, iconColor, iconBg) {
  return `
    <div class="stat-card" style="--stat-accent:${iconColor};--stat-bg:${iconBg}">
      <div class="stat-icon">${icon(iconName)}</div>
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
      <div class="stat-sub">${sub}</div>
    </div>`;
}

function emptyState(iconName, title, desc, action, actionLabel) {
  return `<div class="empty-state">
    ${icon(iconName)}
    <h3>${title}</h3>
    <p>${desc}</p>
    ${action ? `<button class="btn btn-primary" onclick="${action}">${icon('plus')} ${actionLabel}</button>` : ''}
  </div>`;
}

// ─── Global Actions ───────────────────────────────────────────────────────────
window.duplicateEstimate = (id) => {
  const copy = State.duplicate(id);
  if (copy) { Toast.success('Estimate duplicated'); Router.navigate('/estimate/' + copy.id); }
};

window.confirmDelete = (id) => {
  const e = State.get(id);
  if (!e) return;
  Modal.show(
    'Delete Estimate',
    `<p style="color:var(--text-mid);font-size:14px;line-height:1.6">Are you sure you want to delete <strong>"${escHtml(e.name || 'this estimate')}"</strong>? This action cannot be undone.</p>`,
    `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button>
     <button class="btn btn-danger" onclick="Modal.close();State.delete('${id}');Toast.success('Estimate deleted');Router.navigate('/estimates')">Delete</button>`
  );
};

window.toggleDropdown = (btn) => {
  closeDropdowns();
  const menu = btn.nextElementSibling;
  if (menu) { menu.classList.toggle('open'); }
  setTimeout(() => document.addEventListener('click', closeDropdowns, { once: true }), 10);
};

window.closeDropdowns = () => {
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
};

window.filterEstimates = (chip, status) => {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  window._currentFilter = status;
  const search = document.getElementById('estimates-search');
  // Trigger re-render of list without full page reload
  Views.estimatesList(status);
  if (search) { document.getElementById('estimates-search').value = window._currentSearch || ''; }
};

// ─── Bootstrap ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  State.seed();

  Router.register('/',          () => Views.dashboard());
  Router.register('/estimates', () => Views.estimatesList());
  Router.register('/new',       () => Views.estimateForm(null));
  Router.register('/edit',      (id) => Views.estimateForm(id));
  Router.register('/estimate',  (id) => Views.estimateDetail(id));

  Router.init();
});
