import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, DollarSign, TrendingUp, CheckCircle, Plus, Download, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { useEstimates } from '@/hooks/useEstimates';
import { useAuth } from '@/hooks/useAuth';
import { calcTotals } from '@/utils/calculations';
import { formatCurrency, formatDate } from '@/utils/formatting';
import { exportAllExcel } from '@/utils/excel';
import { SERVICES, STATUSES } from '@/constants';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item      = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

function StatCard({ label, value, sub, icon: Icon, accent, bg }) {
  return (
    <motion.div variants={item}>
      <Card hover>
        <div className="p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-black text-slate-800 mt-1 leading-none">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={19} style={{ color: accent }} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { estimates } = useEstimates();
  const { session }   = useAuth();
  const navigate      = useNavigate();

  const total     = estimates.reduce((s, e) => s + calcTotals(e).total, 0);
  const approved  = estimates.filter((e) => e.status === 'approved');
  const pipeline  = estimates.filter((e) => ['sent', 'draft', 'revision'].includes(e.status));
  const pipeVal   = pipeline.reduce((s, e) => s + calcTotals(e).total, 0);
  const recent    = estimates.slice(0, 5);

  return (
    <Layout
      title="Dashboard"
      subtitle={`Welcome back, ${session?.name?.split(' ')[0] || 'there'}`}
      topbarActions={
        <Button size="sm" variant="ghost" icon={<Download size={14} />} onClick={() => exportAllExcel(estimates)}>
          Export All
        </Button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Estimates" value={estimates.length} sub="All time" icon={FolderOpen} accent="#0D85D8" bg="#D0EEF8" />
          <StatCard label="Pipeline Value"  value={formatCurrency(pipeVal)} sub={`${pipeline.length} active`} icon={DollarSign} accent="#7C3AED" bg="#F3F0FF" />
          <StatCard label="Total Portfolio" value={formatCurrency(total)} sub="Across all estimates" icon={TrendingUp} accent="#059669" bg="#ECFDF5" />
          <StatCard label="Approved"        value={approved.length} sub={formatCurrency(approved.reduce((s, e) => s + calcTotals(e).total, 0))} icon={CheckCircle} accent="#D97706" bg="#FFFBEB" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Estimates */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle sub="5 most recent estimates">Recent Estimates</CardTitle>
                <Button size="sm" variant="ghost" icon={<ArrowRight size={13} />} onClick={() => navigate('/estimates')}>
                  View All
                </Button>
              </CardHeader>
              {recent.length === 0 ? (
                <EmptyState icon={FolderOpen} title="No estimates yet" description="Create your first estimate to get started." action={() => navigate('/estimates/new')} actionLabel="New Estimate" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-az-lightest">
                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wide">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wide hidden md:table-cell">Client</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase tracking-wide">Total</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((e) => {
                        const { total } = calcTotals(e);
                        return (
                          <tr key={e.id} onClick={() => navigate(`/estimates/${e.id}`)} className="border-t border-slate-100 cursor-pointer hover:bg-az-lightest transition-colors">
                            <td className="px-4 py-3">
                              <p className="font-semibold text-slate-800 truncate max-w-[160px]">{e.name || 'Untitled'}</p>
                              <p className="text-xs text-az-mid font-mono">{e.id}</p>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell text-slate-500">{e.clientName || '—'}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-800">{formatCurrency(total)}</td>
                            <td className="px-4 py-3 text-center"><Badge status={e.status} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Right column */}
          <div className="space-y-4">
            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardBody className="space-y-2">
                  <Button fullWidth icon={<Plus size={15} />} onClick={() => navigate('/estimates/new')}>New Estimate</Button>
                  <Button fullWidth variant="secondary" icon={<FolderOpen size={15} />} onClick={() => navigate('/estimates')}>All Estimates</Button>
                  <Button fullWidth variant="ghost" icon={<Download size={15} />} onClick={() => exportAllExcel(estimates)}>Export All to Excel</Button>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Status Overview</CardTitle></CardHeader>
                <CardBody className="grid grid-cols-2 gap-2 !p-4">
                  {Object.entries(STATUSES).map(([key, s]) => {
                    const count = estimates.filter((e) => e.status === key).length;
                    return (
                      <button key={key} onClick={() => navigate(`/estimates?status=${key}`)}
                        className={`text-center p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.03] ${s.bg}`}>
                        <p className={`text-xl font-black ${s.color}`}>{count}</p>
                        <p className={`text-xs font-semibold mt-0.5 ${s.color}`}>{s.label}</p>
                      </button>
                    );
                  })}
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader><CardTitle>Service Rates</CardTitle></CardHeader>
                <div>
                  {SERVICES.map((s) => (
                    <div key={s.id} className="flex justify-between items-center px-5 py-2.5 border-t border-slate-100 first:border-0">
                      <span className="text-xs text-slate-500">{s.name}</span>
                      <span className="text-xs font-bold text-az-mid">{formatCurrency(s.rate)}<span className="font-normal text-slate-400">/hr</span></span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
