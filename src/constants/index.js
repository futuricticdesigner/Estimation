export const SERVICES = [
  { id: 'web',        name: 'Web Development',               rate: 63,  color: '#0160C9', bg: '#D0EEF8', icon: '🌐' },
  { id: 'mobile',     name: 'Mobile Development',            rate: 63,  color: '#7C3AED', bg: '#F3F0FF', icon: '📱' },
  { id: 'salesforce', name: 'Salesforce Development',        rate: 75,  color: '#1CA3DE', bg: '#E2F5FC', icon: '☁️' },
  { id: 'pm',         name: 'Project Management',            rate: 160, color: '#059669', bg: '#ECFDF5', icon: '📋' },
  { id: 'design',     name: 'Design, Branding & UX',         rate: 160, color: '#DB2777', bg: '#FDF2F8', icon: '🎨' },
  { id: 'senior',     name: 'Senior Management (Director+)', rate: 225, color: '#D97706', bg: '#FFFBEB', icon: '👔' },
];

export const STATUSES = {
  draft:    { label: 'Draft',       color: 'text-slate-600',  bg: 'bg-slate-100' },
  sent:     { label: 'Sent',        color: 'text-az-bright',  bg: 'bg-az-light'  },
  approved: { label: 'Approved',    color: 'text-emerald-600', bg: 'bg-emerald-50' },
  rejected: { label: 'Rejected',    color: 'text-red-600',    bg: 'bg-red-50'    },
  revision: { label: 'In Revision', color: 'text-amber-600',  bg: 'bg-amber-50'  },
};

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
