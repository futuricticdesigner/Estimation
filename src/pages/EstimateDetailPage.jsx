import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Download, Copy, Trash2, FileDown, TableIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useEstimates } from '@/hooks/useEstimates';
import { useToast } from '@/hooks/useToast';
import { calcTotals } from '@/utils/calculations';
import { formatCurrency, formatDate } from '@/utils/formatting';
import { exportPDF } from '@/utils/pdf';
import { exportEstimateExcel } from '@/utils/excel';
import { SERVICES, STATUSES } from '@/constants';

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function EstimateDetailPage() {
  const { id }  = useParams();
  const { getEstimate, deleteEstimate, duplicate, setStatus } = useEstimates();
  const toast   = useToast();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const estimate = getEstimate(id);
  if (!estimate) {
    return (
      <Layout title="Not Found">
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-semibold">Estimate not found</p>
          <Button className="mt-4" onClick={() => navigate('/estimates')}>Back to Estimates</Button>
        </div>
      </Layout>
    );
  }

  const { lines, subtotal, discountAmt, total, totalHours } = calcTotals(estimate);

  const handleDuplicate = () => {
    const copy = duplicate(id);
    if (copy) { toast.success('Estimate duplicated'); navigate(`/estimates/${copy.id}`); }
  };

  const handleDelete = () => {
    deleteEstimate(id);
    toast.success('Estimate deleted');
    navigate('/estimates');
  };

  return (
    <Layout
      title={estimate.name || 'Estimate'}
      subtitle={estimate.id}
      topbarActions={
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" icon={<ArrowLeft size={14} />} onClick={() => navigate('/estimates')}>Back</Button>
          <Button size="sm" variant="ghost" icon={<Pencil size={14} />} onClick={() => navigate(`/estimates/${id}/edit`)}>Edit</Button>
          <Button size="sm" variant="secondary" icon={<Download size={14} />} onClick={() => { exportPDF(estimate); toast.success('PDF downloaded'); }}>PDF</Button>
        </div>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
        {/* Hero header */}
        <motion.div variants={item} className="rounded-2xl bg-gradient-to-br from-az-navy via-az-blue to-az-mid p-7 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 right-16 w-32 h-32 rounded-full bg-white/3 pointer-events-none" />
          <div className="relative">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <p className="text-xs font-bold tracking-[1.5px] text-white/40 uppercase mb-1">{estimate.id}</p>
                <h1 className="text-2xl font-black leading-tight">{estimate.name || 'Untitled Project'}</h1>
                <p className="text-white/70 mt-1">{estimate.clientName}{estimate.clientEmail ? ` · ${estimate.clientEmail}` : ''}</p>
              </div>
              <Badge status={estimate.status} className="self-start" />
            </div>
            <div className="flex flex-wrap gap-6">
              {[['Total Hours', `${totalHours} hrs`], ['Services', lines.length], ['Created', formatDate(estimate.createdAt)], ['Valid Until', formatDate(estimate.validUntil)], ['Total Investment', formatCurrency(total)]].map(([l, v]) => (
                <div key={l}>
                  <p className="text-white/40 text-xs">{l}</p>
                  <p className="font-bold text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle sub="Detailed cost breakdown by service">Cost Breakdown</CardTitle></CardHeader>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-az-lightest">
                        {['Service', 'Scope / Notes', 'Hours', 'Rate', 'Subtotal'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((l) => {
                        const svc = SERVICES.find((s) => s.id === l.serviceId);
                        return (
                          <tr key={l.serviceId} className="border-t border-slate-100">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: svc?.bg, color: svc?.color }}>
                                  {svc?.icon}
                                </div>
                                <span className="font-semibold text-slate-800">{svc?.name || '—'}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-400 text-xs max-w-[180px]">{l.notes || '—'}</td>
                            <td className="px-4 py-3 font-semibold text-slate-700">{l.hours}</td>
                            <td className="px-4 py-3 text-slate-400 text-xs">{formatCurrency(l.rate)}/hr</td>
                            <td className="px-4 py-3 font-bold text-slate-800 text-right">{formatCurrency(l.subtotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-5 border-t border-slate-100">
                  <div className="ml-auto max-w-xs space-y-1.5">
                    <div className="flex justify-between text-sm text-slate-400"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                    {estimate.discount > 0 && <div className="flex justify-between text-sm text-emerald-600"><span>Discount ({estimate.discount}%)</span><span>−{formatCurrency(discountAmt)}</span></div>}
                    <hr className="border-slate-200" />
                    <div className="flex justify-between font-bold text-base text-slate-800"><span>Total Investment</span><span>{formatCurrency(total)}</span></div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {estimate.projectDescription && (
              <motion.div variants={item}>
                <Card>
                  <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                  <CardBody><p className="text-sm text-slate-600 leading-relaxed">{estimate.projectDescription}</p></CardBody>
                </Card>
              </motion.div>
            )}

            {estimate.notes && (
              <motion.div variants={item}>
                <Card className="border-l-4 border-amber-400">
                  <CardBody>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Notes & Assumptions</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{estimate.notes}</p>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar actions */}
          <div className="space-y-4">
            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                <CardBody className="space-y-2">
                  <Button fullWidth icon={<FileDown size={15} />} onClick={() => { exportPDF(estimate); toast.success('PDF downloaded'); }}>Download PDF</Button>
                  <Button fullWidth variant="secondary" icon={<TableIcon size={15} />} onClick={() => { exportEstimateExcel(estimate); toast.success('Excel exported'); }}>Export to Excel</Button>
                  <Button fullWidth variant="ghost" icon={<Pencil size={15} />} onClick={() => navigate(`/estimates/${id}/edit`)}>Edit Estimate</Button>
                  <Button fullWidth variant="ghost" icon={<Copy size={15} />} onClick={handleDuplicate}>Duplicate</Button>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
                <CardBody className="space-y-1.5">
                  {Object.entries(STATUSES).map(([key, s]) => (
                    <button key={key} onClick={() => { setStatus(id, key); toast.success(`Status updated to ${s.label}`); }}
                      className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all border-[1.5px] ${estimate.status === key ? `${s.bg} ${s.color} border-current` : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                      {estimate.status === key && <span className="text-current">✓</span>} {s.label}
                    </button>
                  ))}
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
                <CardBody className="space-y-2">
                  {[['Total Hours', `${totalHours} hrs`], ['Services', lines.length], ['Subtotal', formatCurrency(subtotal)], ...(estimate.discount > 0 ? [['Discount', `${estimate.discount}%`]] : []), ['Total', formatCurrency(total)]].map(([l, v], i, arr) => (
                    <div key={l}>
                      <div className="flex justify-between text-sm"><span className="text-slate-400">{l}</span><span className="font-semibold">{v}</span></div>
                      {i < arr.length - 1 && <hr className="border-slate-100 mt-2" />}
                    </div>
                  ))}
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardBody>
                  <Button fullWidth variant="danger" icon={<Trash2 size={15} />} onClick={() => setDeleteOpen(true)}>Delete Estimate</Button>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Estimate"
        footer={<><Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button><Button variant="danger" onClick={handleDelete}>Delete</Button></>}>
        <p className="text-sm text-slate-600">Are you sure you want to delete <strong>"{estimate.name}"</strong>? This cannot be undone.</p>
      </Modal>
    </Layout>
  );
}
