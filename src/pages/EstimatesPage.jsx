import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Download, Eye, Pencil, Copy, Trash2, MoreHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import { useEstimates } from '@/hooks/useEstimates';
import { useToast } from '@/hooks/useToast';
import { calcTotals } from '@/utils/calculations';
import { formatCurrency, formatDate } from '@/utils/formatting';
import { exportEstimateExcel, exportAllExcel } from '@/utils/excel';
import { exportPDF } from '@/utils/pdf';
import { STATUSES } from '@/constants';

function ActionMenu({ estimateId, onView, onEdit, onDuplicate, onDelete, onPDF, onExcel }) {
  const [open, setOpen] = useState(false);
  const wrap = (fn) => () => { setOpen(false); fn(); };
  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
        <MoreHorizontal size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-8 z-20 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 min-w-[170px]"
            >
              {[
                { icon: Eye,      label: 'View',       fn: onView    },
                { icon: Pencil,   label: 'Edit',       fn: onEdit    },
                { icon: Copy,     label: 'Duplicate',  fn: onDuplicate },
                { icon: Download, label: 'Export PDF', fn: onPDF     },
                { icon: Download, label: 'Export Excel',fn: onExcel  },
              ].map(({ icon: Icon, label, fn }) => (
                <button key={label} onClick={(e) => { e.stopPropagation(); wrap(fn)(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-slate-600 hover:bg-az-lightest hover:text-az-mid transition-colors">
                  <Icon size={14} /> {label}
                </button>
              ))}
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button onClick={(e) => { e.stopPropagation(); wrap(onDelete)(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EstimatesPage() {
  const { estimates, deleteEstimate, duplicate } = useEstimates();
  const toast    = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState(searchParams.get('status') || 'all');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    let list = estimates;
    if (filter !== 'all') list = list.filter((e) => e.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) => [e.name, e.clientName, e.id].some((v) => v?.toLowerCase().includes(q)));
    }
    return list;
  }, [estimates, filter, search]);

  const handleDuplicate = (e) => {
    const copy = duplicate(e.id);
    if (copy) { toast.success('Estimate duplicated'); navigate(`/estimates/${copy.id}`); }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteEstimate(deleteTarget.id);
    toast.success('Estimate deleted');
    setDeleteTarget(null);
  };

  return (
    <Layout
      title="All Estimates"
      subtitle="View, manage, and export project estimates"
      topbarActions={
        <Button size="sm" variant="ghost" icon={<Download size={14} />} onClick={() => { exportAllExcel(estimates); toast.success('Exported to Excel'); }}>
          Export All
        </Button>
      }
    >
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search project, client, ID…"
            className="w-full pl-9 pr-3 py-2 text-sm border-[1.5px] border-slate-200 rounded-lg bg-white focus:outline-none focus:border-az-bright focus:ring-2 focus:ring-az-bright/15 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {['all', ...Object.keys(STATUSES)].map((key) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border-[1.5px] transition-all ${filter === key ? 'bg-az-light border-az-bright text-az-mid' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
              {key === 'all' ? 'All' : STATUSES[key].label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No estimates found" description="Try adjusting your search or filters." action={() => navigate('/estimates/new')} actionLabel="New Estimate" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-az-lightest">
                  {['Project', 'Client', 'Hours', 'Total', 'Status', 'Created', 'Valid Until', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap last:w-10">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((e) => {
                    const { total, totalHours } = calcTotals(e);
                    return (
                      <motion.tr
                        key={e.id}
                        layout
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => navigate(`/estimates/${e.id}`)}
                        className="border-t border-slate-100 cursor-pointer hover:bg-az-lightest transition-colors"
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-800 truncate max-w-[180px]">{e.name || 'Untitled'}</p>
                          <p className="text-xs text-az-mid font-mono">{e.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-slate-600 font-medium truncate max-w-[140px]">{e.clientName || '—'}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[140px]">{e.clientEmail || ''}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{totalHours} hrs</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{formatCurrency(total)}</td>
                        <td className="px-4 py-3"><Badge status={e.status} /></td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(e.createdAt)}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(e.validUntil)}</td>
                        <td className="px-3 py-3" onClick={(ev) => ev.stopPropagation()}>
                          <ActionMenu
                            estimateId={e.id}
                            onView={() => navigate(`/estimates/${e.id}`)}
                            onEdit={() => navigate(`/estimates/${e.id}/edit`)}
                            onDuplicate={() => handleDuplicate(e)}
                            onDelete={() => setDeleteTarget(e)}
                            onPDF={() => { exportPDF(e); toast.success('PDF downloaded'); }}
                            onExcel={() => { exportEstimateExcel(e); toast.success('Excel exported'); }}
                          />
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Estimate"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-800">"{deleteTarget?.name || 'this estimate'}"</strong>? This action cannot be undone.
        </p>
      </Modal>
    </Layout>
  );
}
