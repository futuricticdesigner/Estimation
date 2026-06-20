import { createContext, useState, useCallback } from 'react';
import { storage } from '@/utils/storage';
import { generateId, todayISO, addDays } from '@/utils/formatting';

export const EstimatesContext = createContext(null);

const seed = () => {
  const existing = storage.getEstimates();
  if (existing.length > 0) return existing;
  const today = todayISO();
  const samples = [
    {
      id: generateId(), name: 'E-Commerce Platform Redesign', clientName: 'Horizon Retail Co.',
      clientEmail: 'pm@horizonretail.com', projectDescription: 'Complete redesign of the e-commerce platform with mobile app and Salesforce CRM integration.',
      status: 'sent', validUntil: addDays(today, 30), discount: 5, notes: 'Assumes client provides brand assets by kick-off.',
      lineItems: [{ serviceId: 'web', hours: 320, notes: 'Frontend + backend API' }, { serviceId: 'mobile', hours: 280, notes: 'iOS and Android apps' }, { serviceId: 'salesforce', hours: 80, notes: 'CRM integration' }, { serviceId: 'design', hours: 120, notes: 'UX audit and visual design' }, { serviceId: 'pm', hours: 60, notes: 'Sprint planning' }],
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      id: generateId(), name: 'Internal Analytics Dashboard', clientName: 'NovaTech Solutions',
      clientEmail: 'cto@novatech.io', projectDescription: 'Real-time analytics dashboard with role-based access control.',
      status: 'approved', validUntil: addDays(today, 15), discount: 0, notes: 'Client handles infrastructure.',
      lineItems: [{ serviceId: 'web', hours: 200, notes: 'React dashboard + REST API' }, { serviceId: 'design', hours: 60, notes: 'Component design system' }, { serviceId: 'pm', hours: 30, notes: 'Project oversight' }, { serviceId: 'senior', hours: 10, notes: 'Architecture review' }],
      createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    },
    {
      id: generateId(), name: 'Mobile App MVP — HealthTrack', clientName: 'Wellpath Digital',
      clientEmail: 'founder@wellpath.co', projectDescription: 'Cross-platform health tracking app with wearable integrations.',
      status: 'draft', validUntil: addDays(today, 45), discount: 0, notes: 'Phase 1 scope only.',
      lineItems: [{ serviceId: 'mobile', hours: 400, notes: 'React Native iOS & Android' }, { serviceId: 'design', hours: 100, notes: 'Brand identity + app design' }, { serviceId: 'pm', hours: 40, notes: 'Agile delivery' }, { serviceId: 'senior', hours: 15, notes: 'Tech architecture' }],
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ];
  storage.setEstimates(samples);
  return samples;
};

export function EstimatesProvider({ children }) {
  const [estimates, setEstimates] = useState(() => seed());

  const persist = useCallback((list) => {
    setEstimates(list);
    storage.setEstimates(list);
  }, []);

  const saveEstimate = useCallback((estimate) => {
    setEstimates((prev) => {
      const idx = prev.findIndex((e) => e.id === estimate.id);
      const next = idx === -1
        ? [{ ...estimate, createdAt: estimate.createdAt || new Date().toISOString() }, ...prev]
        : prev.map((e, i) => i === idx ? { ...estimate, updatedAt: new Date().toISOString() } : e);
      storage.setEstimates(next);
      return next;
    });
  }, []);

  const deleteEstimate = useCallback((id) => {
    setEstimates((prev) => { const next = prev.filter((e) => e.id !== id); storage.setEstimates(next); return next; });
  }, []);

  const setStatus = useCallback((id, status) => {
    setEstimates((prev) => {
      const next = prev.map((e) => e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e);
      storage.setEstimates(next);
      return next;
    });
  }, []);

  const duplicate = useCallback((id) => {
    const orig = estimates.find((e) => e.id === id);
    if (!orig) return null;
    const copy = { ...orig, id: generateId(), name: orig.name + ' (Copy)', status: 'draft', createdAt: new Date().toISOString(), updatedAt: undefined };
    setEstimates((prev) => { const next = [copy, ...prev]; storage.setEstimates(next); return next; });
    return copy;
  }, [estimates]);

  const getEstimate = useCallback((id) => estimates.find((e) => e.id === id) || null, [estimates]);

  return (
    <EstimatesContext.Provider value={{ estimates, saveEstimate, deleteEstimate, setStatus, duplicate, getEstimate }}>
      {children}
    </EstimatesContext.Provider>
  );
}
