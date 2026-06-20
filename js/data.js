// ─── Services & Rates ────────────────────────────────────────────────────────
const SERVICES = [
  { id: 'web',        name: 'Web Development',                 rate: 63,  icon: 'web',       color: '#1B6FE8' },
  { id: 'mobile',     name: 'Mobile Development',              rate: 63,  icon: 'mobile',    color: '#7C3AED' },
  { id: 'salesforce', name: 'Salesforce Development',          rate: 75,  icon: 'cloud',     color: '#0EA5E9' },
  { id: 'pm',         name: 'Project Management',              rate: 160, icon: 'chart',     color: '#059669' },
  { id: 'design',     name: 'Design, Branding & UX',           rate: 160, icon: 'design',    color: '#DB2777' },
  { id: 'senior',     name: 'Senior Management (Director+)',   rate: 225, icon: 'executive', color: '#D97706' },
];

// ─── Status Definitions ───────────────────────────────────────────────────────
const STATUSES = {
  draft:    { label: 'Draft',    color: '#64748B', bg: '#F1F5F9' },
  sent:     { label: 'Sent',     color: '#1B6FE8', bg: '#EFF6FF' },
  approved: { label: 'Approved', color: '#059669', bg: '#F0FDF4' },
  rejected: { label: 'Rejected', color: '#DC2626', bg: '#FEF2F2' },
  revision: { label: 'In Revision', color: '#D97706', bg: '#FFFBEB' },
};

// ─── Storage ──────────────────────────────────────────────────────────────────
const Storage = {
  KEY: 'azularc_estimates_v2',

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  },

  save(estimates) {
    localStorage.setItem(this.KEY, JSON.stringify(estimates));
  },
};

// ─── ID Generator ─────────────────────────────────────────────────────────────
function generateId() {
  return 'EST-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase();
}

// ─── Estimate Calculations ────────────────────────────────────────────────────
function calcLineItem(item) {
  const svc = SERVICES.find(s => s.id === item.serviceId);
  if (!svc) return { ...item, rate: 0, subtotal: 0 };
  const subtotal = (item.hours || 0) * svc.rate;
  return { ...item, rate: svc.rate, subtotal };
}

function calcEstimateTotals(estimate) {
  const lines = (estimate.lineItems || []).map(calcLineItem);
  const subtotal = lines.reduce((sum, l) => sum + l.subtotal, 0);
  const discountAmt = subtotal * ((estimate.discount || 0) / 100);
  const total = subtotal - discountAmt;
  const totalHours = lines.reduce((sum, l) => sum + (l.hours || 0), 0);
  return { lines, subtotal, discountAmt, total, totalHours };
}

// ─── Date Helpers ─────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(iso, n) {
  const d = new Date(iso);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n || 0);
}

// ─── State Management ─────────────────────────────────────────────────────────
const State = {
  estimates: Storage.load(),
  draftEstimate: null, // estimate being created/edited

  getAll()          { return [...this.estimates]; },
  get(id)           { return this.estimates.find(e => e.id === id) || null; },

  save(estimate) {
    const idx = this.estimates.findIndex(e => e.id === estimate.id);
    if (idx === -1) {
      this.estimates.unshift({ ...estimate, createdAt: new Date().toISOString() });
    } else {
      this.estimates[idx] = { ...estimate, updatedAt: new Date().toISOString() };
    }
    Storage.save(this.estimates);
    return estimate;
  },

  delete(id) {
    this.estimates = this.estimates.filter(e => e.id !== id);
    Storage.save(this.estimates);
  },

  setStatus(id, status) {
    const e = this.get(id);
    if (e) this.save({ ...e, status });
  },

  duplicate(id) {
    const e = this.get(id);
    if (!e) return null;
    const copy = {
      ...e,
      id: generateId(),
      name: e.name + ' (Copy)',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    this.save(copy);
    return copy;
  },

  // Seed sample data if empty
  seed() {
    if (this.estimates.length > 0) return;
    const today = todayISO();
    const samples = [
      {
        id: generateId(),
        name: 'E-Commerce Platform Redesign',
        clientName: 'Horizon Retail Co.',
        clientEmail: 'pm@horizonretail.com',
        projectDescription: 'Complete redesign of the client\'s e-commerce platform including new UI/UX, mobile app, and Salesforce CRM integration.',
        status: 'sent',
        validUntil: addDays(today, 30),
        discount: 5,
        notes: 'Assumes client provides all brand assets by kick-off. Mobile scope covers iOS and Android.',
        lineItems: [
          { serviceId: 'web',        hours: 320, notes: 'Frontend + backend API' },
          { serviceId: 'mobile',     hours: 280, notes: 'iOS and Android apps' },
          { serviceId: 'salesforce', hours: 80,  notes: 'CRM integration' },
          { serviceId: 'design',     hours: 120, notes: 'UX audit, wireframes, visual design' },
          { serviceId: 'pm',         hours: 60,  notes: 'Sprint planning, client coordination' },
        ],
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
      {
        id: generateId(),
        name: 'Internal Analytics Dashboard',
        clientName: 'NovaTech Solutions',
        clientEmail: 'cto@novatech.io',
        projectDescription: 'Build a real-time analytics dashboard integrating multiple data sources with role-based access control.',
        status: 'approved',
        validUntil: addDays(today, 15),
        discount: 0,
        notes: 'Client will handle infrastructure setup. Estimates are for development only.',
        lineItems: [
          { serviceId: 'web',    hours: 200, notes: 'React dashboard + REST API' },
          { serviceId: 'design', hours: 60,  notes: 'Dashboard UX and component design' },
          { serviceId: 'pm',     hours: 30,  notes: 'Project oversight' },
          { serviceId: 'senior', hours: 10,  notes: 'Architecture review' },
        ],
        createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
      },
      {
        id: generateId(),
        name: 'Mobile App MVP — HealthTrack',
        clientName: 'Wellpath Digital',
        clientEmail: 'founder@wellpath.co',
        projectDescription: 'Cross-platform health tracking mobile app with wearable integrations and AI-powered recommendations.',
        status: 'draft',
        validUntil: addDays(today, 45),
        discount: 0,
        notes: 'Phase 1 scope only. Phase 2 (AI features) will be estimated separately.',
        lineItems: [
          { serviceId: 'mobile', hours: 400, notes: 'React Native — iOS & Android' },
          { serviceId: 'design', hours: 100, notes: 'Brand identity + app design' },
          { serviceId: 'pm',     hours: 40,  notes: 'Agile delivery management' },
          { serviceId: 'senior', hours: 15,  notes: 'Tech architecture & strategy' },
        ],
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ];
    samples.forEach(s => this.estimates.push(s));
    Storage.save(this.estimates);
  },
};
