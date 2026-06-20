import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Save, Shield, BarChart3 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useEstimates } from '@/hooks/useEstimates';
import { formatDate } from '@/utils/formatting';
import { PASSWORD_REGEX } from '@/constants';

const profileSchema = z.object({
  name:  z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword:     z.string().regex(PASSWORD_REGEX, 'Min 8 chars with uppercase, lowercase, and a number'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item      = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } };

function AvatarCircle({ name, size = 'lg' }) {
  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  const sizeClass = size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sizeClass} rounded-2xl bg-gradient-to-br from-az-mid to-az-sky flex items-center justify-center text-white font-black shrink-0 shadow-lg`}>
      {initials}
    </div>
  );
}

export default function ProfilePage() {
  const { session, updateProfile, changePassword } = useAuth();
  const toast     = useToast();
  const { estimates } = useEstimates();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew    ] = useState(false);

  const { register: regProfile, handleSubmit: submitProfile, formState: { errors: pe, isSubmitting: pSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: session?.name || '', email: session?.email || '' },
  });

  const { register: regPw, handleSubmit: submitPw, reset: resetPw, formState: { errors: we, isSubmitting: wSubmitting } } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const myEstimates = estimates; // all estimates belong to the logged-in user in this single-user demo
  const approvedCount = myEstimates.filter((e) => e.status === 'approved').length;
  const totalRevenue  = myEstimates.filter((e) => e.status === 'approved')
    .reduce((s, e) => s + (e.lineItems?.reduce((ls, l) => {
      const svc = [63, 63, 75, 160, 160, 225];
      return ls;
    }, 0) || 0), 0);

  const onSaveProfile = async (data) => {
    await new Promise((r) => setTimeout(r, 350));
    const result = updateProfile(data);
    if (result.ok) toast.success('Profile updated successfully');
    else toast.error(result.error);
  };

  const onChangePassword = async (data) => {
    await new Promise((r) => setTimeout(r, 350));
    const result = changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
    if (result.ok) { toast.success('Password changed successfully'); resetPw(); }
    else toast.error(result.error);
  };

  return (
    <Layout title="My Profile" subtitle="Manage your account details and security">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-5">

        {/* Profile hero */}
        <motion.div variants={item}>
          <Card>
            <div className="p-6 bg-gradient-to-r from-az-navy to-az-blue rounded-t-xl relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
              <div className="flex items-center gap-4 relative">
                <AvatarCircle name={session?.name} />
                <div>
                  <h2 className="text-xl font-bold text-white">{session?.name || 'User'}</h2>
                  <p className="text-white/60 text-sm mt-0.5">{session?.email}</p>
                  <p className="text-white/40 text-xs mt-1">Azularc Sales Team</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-slate-100">
              {[
                { label: 'Total Estimates', value: myEstimates.length },
                { label: 'Approved',        value: approvedCount },
                { label: 'Member Since',    value: session?.createdAt ? formatDate(session.createdAt) : 'Today' },
              ].map(({ label, value }) => (
                <div key={label} className="py-4 px-5 text-center">
                  <p className="text-lg font-black text-az-mid">{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Personal Info */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle sub="Update your name and email address">
                <span className="flex items-center gap-2"><User size={16} className="text-az-mid" /> Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={submitProfile(onSaveProfile)} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  icon={User}
                  error={pe.name?.message}
                  {...regProfile('name')}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@azularc.com"
                  required
                  icon={Mail}
                  error={pe.email?.message}
                  {...regProfile('email')}
                />
                <div className="flex justify-end pt-1">
                  <Button type="submit" loading={pSubmitting} icon={<Save size={14} />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Change Password */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle sub="Use a strong password you don't use elsewhere">
                <span className="flex items-center gap-2"><Shield size={16} className="text-az-mid" /> Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={submitPw(onChangePassword)} className="space-y-4">
                {/* Current password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Current Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright transition-all ${we.currentPassword ? 'border-red-400' : 'border-slate-300'}`}
                      {...regPw('currentPassword')}
                    />
                    <button type="button" onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {we.currentPassword && <p className="text-xs text-red-500 font-medium">{we.currentPassword.message}</p>}
                </div>

                {/* New password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">New Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNew ? 'text' : 'password'}
                      placeholder="Create a new strong password"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright transition-all ${we.newPassword ? 'border-red-400' : 'border-slate-300'}`}
                      {...regPw('newPassword')}
                    />
                    <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {we.newPassword && <p className="text-xs text-red-500 font-medium">{we.newPassword.message}</p>}
                  <p className="text-xs text-slate-400">Min 8 characters with uppercase, lowercase, and a number</p>
                </div>

                <Input
                  label="Confirm New Password"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Repeat your new password"
                  required
                  icon={Lock}
                  error={we.confirmPassword?.message}
                  {...regPw('confirmPassword')}
                />

                <div className="flex justify-end pt-1">
                  <Button type="submit" variant="secondary" loading={wSubmitting} icon={<Shield size={14} />}>
                    Update Password
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Account stats */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle sub="Your activity on the platform">
                <span className="flex items-center gap-2"><BarChart3 size={16} className="text-az-mid" /> Activity Summary</span>
              </CardTitle>
            </CardHeader>
            <div>
              {[
                ['Total Estimates Created', myEstimates.length],
                ['Drafts',    myEstimates.filter((e) => e.status === 'draft').length],
                ['Sent to Clients', myEstimates.filter((e) => e.status === 'sent').length],
                ['Approved', myEstimates.filter((e) => e.status === 'approved').length],
                ['Rejected', myEstimates.filter((e) => e.status === 'rejected').length],
                ['In Revision', myEstimates.filter((e) => e.status === 'revision').length],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center px-5 py-3 border-t border-slate-100 first:border-0">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-bold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </Layout>
  );
}
