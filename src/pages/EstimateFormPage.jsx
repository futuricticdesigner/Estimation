import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import WizardSteps from '@/components/estimates/WizardSteps';
import ServiceSelector from '@/components/estimates/ServiceSelector';
import LineItemsTable from '@/components/estimates/LineItemsTable';
import TotalsPanel from '@/components/estimates/TotalsPanel';
import Badge from '@/components/ui/Badge';
import { useEstimates } from '@/hooks/useEstimates';
import { useToast } from '@/hooks/useToast';
import { SERVICES, STATUSES } from '@/constants';
import { calcTotals } from '@/utils/calculations';
import { formatCurrency, formatDate, generateId, todayISO, addDays } from '@/utils/formatting';

const step1Schema = z.object({
  name:               z.string().min(1, 'Project name is required'),
  clientName:         z.string().min(1, 'Client name is required'),
  clientEmail:        z.string().email('Enter a valid email').or(z.literal('')),
  projectDescription: z.string().min(1, 'Project description is required'),
  status:             z.string(),
  validUntil:         z.string(),
  notes:              z.string().optional(),
  discount:           z.coerce.number().min(0).max(100).default(0),
});

const STATUS_OPTIONS = Object.entries(STATUSES).map(([v, s]) => ({ value: v, label: s.label }));
const today = todayISO();

const stepVariants = {
  enter: { opacity: 0, x: 20  },
  center:{ opacity: 1, x: 0   },
  exit:  { opacity: 0, x: -20 },
};

export default function EstimateFormPage() {
  const { id }           = useParams();
  const { getEstimate, saveEstimate } = useEstimates();
  const toast    = useToast();
  const navigate = useNavigate();
  const isEdit   = !!id;
  const existing = isEdit ? getEstimate(id) : null;

  const [step, setStep]         = useState(1);
  const [lineItems, setLineItems] = useState(existing?.lineItems || []);
  const [formData, setFormData] = useState(null);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name:               existing?.name || '',
      clientName:         existing?.clientName || '',
      clientEmail:        existing?.clientEmail || '',
      projectDescription: existing?.projectDescription || '',
      status:             existing?.status || 'draft',
      validUntil:         existing?.validUntil || addDays(today, 30),
      notes:              existing?.notes || '',
      discount:           existing?.discount || 0,
    },
  });

  const selectedIds = new Set(lineItems.map((l) => l.serviceId));

  const handleToggleService = useCallback((serviceId) => {
    setLineItems((prev) => {
      const exists = prev.find((l) => l.serviceId === serviceId);
      return exists ? prev.filter((l) => l.serviceId !== serviceId) : [...prev, { serviceId, hours: 0, notes: '' }];
    });
  }, []);

  const handleLineChange = useCallback((idx, field, value) => {
    setLineItems((prev) => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  }, []);

  const handleRemoveLine = useCallback((serviceId) => {
    setLineItems((prev) => prev.filter((l) => l.serviceId !== serviceId));
  }, []);

  const draftEstimate = { ...(formData || getValues()), lineItems };

  // Step 1 → 2
  const goToStep2 = handleSubmit((data) => {
    setFormData(data);
    setStep(2);
  });

  // Step 2 → 3
  const goToStep3 = () => {
    if (lineItems.length === 0)      { toast.error('Select at least one service'); return; }
    if (lineItems.some((l) => !l.hours || l.hours <= 0)) { toast.error('Enter hours for all selected services'); return; }
    setStep(3);
  };

  // Save
  const handleSave = () => {
    const data = formData || getValues();
    const estimate = {
      id: existing?.id || generateId(),
      ...data,
      lineItems,
      createdAt: existing?.createdAt,
    };
    saveEstimate(estimate);
    toast.success(isEdit ? 'Estimate updated!' : 'Estimate created!');
    navigate(`/estimates/${estimate.id}`);
  };

  const { lines, subtotal, discountAmt, total, totalHours } = calcTotals(draftEstimate);

  return (
    <Layout
      title={isEdit ? 'Edit Estimate' : 'New Estimate'}
      subtitle={isEdit ? `Editing ${existing?.id}` : 'Create a new project estimate'}
      topbarActions={
        <Button size="sm" variant="ghost" icon={<ArrowLeft size={14} />} onClick={() => navigate(isEdit ? `/estimates/${id}` : '/estimates')}>
          {isEdit ? 'Back' : 'Cancel'}
        </Button>
      }
    >
      <div className="max-w-3xl mx-auto">
        <WizardSteps current={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader><CardTitle sub="Enter the project and client details">Project Information</CardTitle></CardHeader>
                <CardBody className="space-y-5">
                  <Input label="Project Name" placeholder="e.g. E-Commerce Platform Redesign" required error={errors.name?.message} {...register('name')} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Client / Company Name" placeholder="Acme Corp" required error={errors.clientName?.message} {...register('clientName')} />
                    <Input label="Client Email" type="email" placeholder="pm@client.com" error={errors.clientEmail?.message} {...register('clientEmail')} />
                  </div>
                  <Textarea label="Project Description" placeholder="Describe the project scope, goals, and deliverables…" required rows={4} error={errors.projectDescription?.message} {...register('projectDescription')} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select label="Status" options={STATUS_OPTIONS} {...register('status')} />
                    <Input label="Valid Until" type="date" {...register('validUntil')} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Discount (%)" type="number" min="0" max="100" step="0.5" placeholder="0" hint="Applied as a percentage off subtotal" {...register('discount')} />
                  </div>
                  <Textarea label="Notes & Assumptions" placeholder="Assumptions, exclusions, or important notes for the client…" rows={3} {...register('notes')} />
                </CardBody>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-5">
              <Card>
                <CardHeader><CardTitle sub="Choose services required for this project">Select Services</CardTitle></CardHeader>
                <CardBody>
                  <ServiceSelector selectedIds={selectedIds} onToggle={handleToggleService} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader><CardTitle sub="Enter estimated hours and scope for each service">Hours & Scope</CardTitle></CardHeader>
                <LineItemsTable lineItems={lineItems} onChange={handleLineChange} onRemove={handleRemoveLine} />
              </Card>
              <TotalsPanel estimate={draftEstimate} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-5">
              {/* Summary header */}
              <div className="rounded-2xl bg-gradient-to-br from-az-navy to-az-blue p-6 text-white relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                <div className="relative">
                  <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-1">{(formData || getValues()).id || 'New Estimate'}</p>
                  <h2 className="text-xl font-bold">{(formData || getValues()).name || 'Untitled Project'}</h2>
                  <p className="text-white/70 text-sm mt-1">{(formData || getValues()).clientName}</p>
                  <div className="flex flex-wrap gap-5 mt-4">
                    {[['Hours', `${totalHours} hrs`], ['Services', lines.length], ['Status', STATUSES[(formData || getValues()).status]?.label || 'Draft'], ['Total', formatCurrency(total)]].map(([l, v]) => (
                      <div key={l}><p className="text-white/50 text-xs">{l}</p><p className="font-bold">{v}</p></div>
                    ))}
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader><CardTitle>Cost Breakdown</CardTitle></CardHeader>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-az-lightest">
                        {['Service', 'Notes', 'Hours', 'Rate', 'Subtotal'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((l) => {
                        const svc = SERVICES.find((s) => s.id === l.serviceId);
                        return (
                          <tr key={l.serviceId} className="border-t border-slate-100">
                            <td className="px-4 py-3 font-semibold text-slate-800">{svc?.name || '—'}</td>
                            <td className="px-4 py-3 text-slate-400 text-xs">{l.notes || '—'}</td>
                            <td className="px-4 py-3 text-slate-600">{l.hours}</td>
                            <td className="px-4 py-3 text-slate-400 text-xs">{formatCurrency(l.rate)}/hr</td>
                            <td className="px-4 py-3 font-bold text-slate-800 text-right">{formatCurrency(l.subtotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-5 border-t border-slate-100">
                  <div className="ml-auto max-w-xs space-y-1">
                    <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                    {(formData || getValues()).discount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-600"><span>Discount ({(formData || getValues()).discount}%)</span><span>−{formatCurrency(discountAmt)}</span></div>
                    )}
                    <hr className="border-slate-200 my-2" />
                    <div className="flex justify-between font-bold text-slate-800"><span>Total</span><span>{formatCurrency(total)}</span></div>
                  </div>
                </div>
              </Card>

              {(formData || getValues()).notes && (
                <Card className="border-l-4 border-amber-400">
                  <CardBody>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Notes & Assumptions</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{(formData || getValues()).notes}</p>
                  </CardBody>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="ghost" icon={<ArrowLeft size={15} />} onClick={() => setStep((s) => s - 1)} className={step === 1 ? 'invisible' : ''}>
            Previous
          </Button>
          <div className="flex gap-3">
            {step < 3 && (
              <Button icon={<ArrowRight size={15} />} onClick={step === 1 ? goToStep2 : goToStep3}>
                Next Step
              </Button>
            )}
            {step === 3 && (
              <Button variant="success" icon={<Save size={15} />} onClick={handleSave}>
                {isEdit ? 'Save Changes' : 'Create Estimate'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
