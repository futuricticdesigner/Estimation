import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, KeyRound, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { PASSWORD_REGEX } from '@/constants';
import { authUtils } from '@/utils/auth';

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
});

const resetSchema = z.object({
  newPassword:     z.string().regex(PASSWORD_REGEX, 'Min 8 chars with uppercase, lowercase, and a number'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const slideVariants = {
  enter:  { opacity: 0, x: 32  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -32 },
};

/* Full azularc wordmark — all 8 paths */
const AzularcLogo = () => (
  <svg width="148" height="44" viewBox="0 0 199 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#lfp)">
      <path d="M20.459 55.9666C19.9395 56.3642 19.2972 56.8376 18.5321 57.3868C17.767 57.9359 17.0397 58.381 16.3597 58.7029C15.4151 59.1289 14.4328 59.4509 13.4127 59.6497C12.3925 59.858 11.278 59.9621 10.0689 59.9621C7.21639 59.9621 4.81722 59.0816 2.89033 57.3016C0.963444 55.531 0 53.2681 0 50.5129C0 48.3068 0.491168 46.5173 1.4735 45.116C2.45584 43.7242 3.84433 42.6259 5.64843 41.8116C7.43363 41.0068 9.64389 40.4387 12.2886 40.0978C14.9334 39.757 17.6726 39.5108 20.5063 39.3499V39.1889C20.5063 37.5225 19.8262 36.3768 18.4755 35.7425C17.1153 35.1081 15.1223 34.7862 12.4775 34.7862C10.8907 34.7862 9.1905 35.0702 7.38641 35.6289C5.58231 36.1875 4.28827 36.623 3.50429 36.9355H2.61641V29.6639C3.63653 29.3988 5.2895 29.0769 7.58476 28.7076C9.88003 28.3383 12.1753 28.1584 14.48 28.1584C19.9584 28.1584 23.9161 29.0011 26.353 30.6959C28.79 32.3813 30.0085 35.0418 30.0085 38.6492V59.1573H20.4496V55.9666H20.459ZM20.459 51.2798V45.0213C19.1555 45.1255 17.7482 45.277 16.2274 45.4569C14.7067 45.6462 13.5638 45.864 12.7704 46.1102C11.8069 46.4131 11.0702 46.8581 10.5601 47.4357C10.05 48.0133 9.79502 48.7802 9.79502 49.727C9.79502 50.3519 9.85169 50.8632 9.95559 51.2514C10.0595 51.6491 10.3334 52.0183 10.7585 52.3781C11.1646 52.7379 11.6558 53.003 12.232 53.164C12.7987 53.3344 13.696 53.4196 14.9051 53.4196C15.8685 53.4196 16.8414 53.2208 17.8332 52.8326C18.8249 52.4349 19.6939 51.9236 20.4401 51.2798H20.459Z" fill="white"/>
      <path d="M61.3769 59.1668H33.1348V52.9652L48.9655 36.0834H33.7771V29.0295H61.0841V35.1176L45.499 51.971H61.3769V59.1668Z" fill="white"/>
      <path d="M94.6065 59.1668H84.9438V55.8435C83.1586 57.1974 81.5339 58.2295 80.051 58.9396C78.5775 59.6497 76.8112 60 74.7615 60C71.4461 60 68.8958 59.0437 67.1012 57.1312C65.3065 55.2186 64.4092 52.3876 64.4092 48.6477V29.0295H74.072V43.9798C74.072 45.5042 74.1192 46.7635 74.2231 47.7766C74.3175 48.7802 74.5442 49.6229 74.9032 50.2857C75.2432 50.9484 75.7533 51.4313 76.4428 51.7343C77.1323 52.0373 78.0863 52.1888 79.3142 52.1888C80.136 52.1888 81.0428 52.0373 82.044 51.7343C83.0452 51.4313 84.0087 50.9863 84.9343 50.3898V29.0295H94.5971V59.1668H94.6065Z" fill="white"/>
      <path d="M109.53 59.1668H99.8672V17.4026H109.53V59.1668Z" fill="white"/>
      <path d="M133.343 55.9666C132.823 56.3642 132.181 56.8376 131.416 57.3868C130.651 57.9359 129.924 58.381 129.243 58.7029C128.299 59.1289 127.317 59.4509 126.296 59.6497C125.276 59.858 124.162 59.9621 122.953 59.9621C120.1 59.9621 117.701 59.0816 115.774 57.3016C113.847 55.531 112.884 53.2681 112.884 50.5129C112.884 48.3068 113.375 46.5173 114.357 45.116C115.34 43.7242 116.728 42.6259 118.532 41.8116C120.317 41.0068 122.528 40.4387 125.172 40.0978C127.808 39.757 130.556 39.5108 133.39 39.3499V39.1889C133.39 37.5225 132.71 36.3768 131.359 35.7425C129.999 35.1081 128.006 34.7862 125.361 34.7862C123.774 34.7862 122.074 35.0702 120.27 35.6289C118.466 36.1875 117.172 36.623 116.388 36.9355H115.5V29.6639C116.52 29.3988 118.173 29.0769 120.469 28.7076C122.764 28.3383 125.059 28.1584 127.364 28.1584C132.842 28.1584 136.8 29.0011 139.237 30.6959C141.674 32.3813 142.892 35.0418 142.892 38.6492V59.1573H133.333V55.9666H133.343ZM133.343 51.2798V45.0213C132.039 45.1255 130.632 45.277 129.111 45.4569C127.59 45.6462 126.438 45.864 125.654 46.1102C124.691 46.4131 123.954 46.8581 123.444 47.4357C122.934 48.0133 122.679 48.7802 122.679 49.727C122.679 50.3519 122.735 50.8632 122.839 51.2514C122.943 51.6491 123.217 52.0183 123.642 52.3781C124.058 52.7379 124.54 53.003 125.116 53.164C125.682 53.3344 126.58 53.4196 127.789 53.4196C128.752 53.4196 129.725 53.2208 130.717 52.8326C131.709 52.4349 132.578 51.9236 133.324 51.2798H133.343Z" fill="white"/>
      <path d="M169.793 38.2325H168.933C168.527 38.0905 167.866 37.9769 166.959 37.9106C166.052 37.8443 165.297 37.8065 164.692 37.8065C163.323 37.8065 162.104 37.9012 161.056 38.081C160.007 38.2609 158.874 38.5639 157.665 38.99V59.1762H148.002V29.0294H157.665V33.4606C159.781 31.6332 161.632 30.4213 163.2 29.8248C164.768 29.2188 166.213 28.9253 167.526 28.9253C167.866 28.9253 168.244 28.9253 168.678 28.9537C169.103 28.9726 169.481 29.001 169.802 29.0389V38.242L169.793 38.2325Z" fill="white"/>
      <path d="M188.126 59.9716C185.501 59.9716 183.111 59.6591 180.938 59.0342C178.775 58.4093 176.886 57.4436 175.281 56.137C173.694 54.8303 172.456 53.1829 171.587 51.204C170.709 49.2157 170.274 46.896 170.274 44.226C170.274 41.4139 170.747 38.99 171.682 36.9544C172.617 34.9187 173.93 33.2239 175.602 31.8794C177.226 30.6107 179.097 29.6828 181.222 29.0863C183.347 28.4993 185.548 28.1963 187.834 28.1963C189.883 28.1963 191.782 28.4235 193.51 28.8685C195.239 29.3135 196.854 29.9006 198.356 30.6107V38.848H196.986C196.618 38.5261 196.165 38.1474 195.636 37.7213C195.107 37.2952 194.464 36.8692 193.699 36.462C192.972 36.0738 192.169 35.7424 191.291 35.4773C190.422 35.2217 189.402 35.0891 188.24 35.0891C185.671 35.0891 183.697 35.9034 182.317 37.5414C180.938 39.1794 180.249 41.4044 180.249 44.207C180.249 47.0096 180.957 49.3009 182.374 50.8064C183.791 52.3118 185.803 53.0598 188.4 53.0598C189.619 53.0598 190.705 52.9178 191.678 52.6432C192.651 52.3686 193.454 52.0372 194.096 51.668C194.701 51.3082 195.239 50.9294 195.702 50.5412C196.165 50.1436 196.59 49.7649 196.986 49.3861H198.356V57.6235C196.835 58.343 195.258 58.9017 193.605 59.3277C191.952 59.7443 190.129 59.9621 188.126 59.9621V59.9716Z" fill="white"/>
      <path d="M193.511 25.9145C193.775 25.9808 194.021 26.0754 194.285 26.1512C188.684 10.8979 174.1 0 156.938 0C139.775 0 125.352 10.7748 119.685 25.8955C119.949 25.8577 120.195 25.8103 120.478 25.763C122.773 25.3937 125.069 25.2138 127.373 25.2138C127.723 25.2138 128.044 25.2233 128.384 25.2328C133.711 14.8461 144.489 7.72605 156.938 7.72605C169.387 7.72605 180.249 14.903 185.548 25.3464C186.304 25.2801 187.06 25.2328 187.825 25.2328C189.874 25.2328 191.773 25.4505 193.501 25.905L193.511 25.9145Z" fill="#3ACBE8"/>
    </g>
    <defs><clipPath id="lfp"><rect width="198.356" height="60" fill="white"/></clipPath></defs>
  </svg>
);

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const toast    = useToast();
  const navigate = useNavigate();

  const [step, setStep]           = useState(1);
  const [email, setEmail]         = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [emailError, setEmailError] = useState('');

  const { register: regEmail, handleSubmit: submitEmail, formState: { isSubmitting: emailSub } } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const { register: regReset, handleSubmit: submitReset, formState: { errors: re, isSubmitting: resetSub } } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const onFindAccount = async (data) => {
    setEmailError('');
    await new Promise((r) => setTimeout(r, 500));
    const found = authUtils.findByEmail(data.email);
    if (!found) { setEmailError('No account found with that email address.'); return; }
    setEmail(data.email);
    setStep(2);
  };

  const onResetPassword = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    const result = resetPassword({ email, newPassword: data.newPassword });
    if (result.ok) setStep(3);
    else toast.error(result.error);
  };

  const fieldCls = (hasErr) =>
    `w-full pl-10 pr-4 py-3 text-sm border-[1.5px] rounded-xl focus:outline-none focus:ring-2 focus:ring-az-bright/25 focus:border-az-bright transition-all bg-slate-50 focus:bg-white ${hasErr ? 'border-red-400 bg-red-50' : 'border-slate-200'}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg,#0041C7 0%,#0160C9 45%,#0D85D8 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-az-sky/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-az-bright/10 blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <AzularcLogo />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-az-navy/30 overflow-hidden">

          {/* Step progress bar */}
          {step < 3 && (
            <div className="flex h-1">
              {[1, 2].map((s) => (
                <motion.div
                  key={s}
                  className="flex-1 origin-left"
                  animate={{ backgroundColor: s <= step ? '#0D85D8' : '#f1f5f9' }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
          )}

          <div className="p-8">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Find account ── */}
              {step === 1 && (
                <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
                  {/* Step badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(135deg,#0041C7,#0D85D8)' }}>
                      <KeyRound size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-az-mid uppercase tracking-widest">Step 1 of 2</p>
                      <h1 className="text-xl font-black text-slate-800 leading-tight">Reset Password</h1>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Enter the email address linked to your Azularc account and we'll help you set a new password.
                  </p>

                  {emailError && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 mb-5">
                      <span>⚠</span> {emailError}
                    </motion.div>
                  )}

                  <form onSubmit={submitEmail(onFindAccount)} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" placeholder="you@azularc.com"
                          className={fieldCls(false)} {...regEmail('email')} />
                      </div>
                    </div>

                    <motion.button type="submit" disabled={emailSub}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg,#0041C7,#0D85D8)' }}>
                      {emailSub
                        ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                        : <ArrowRight size={15} />}
                      {emailSub ? 'Searching…' : 'Find My Account'}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 2: Set new password ── */}
              {step === 2 && (
                <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest">Step 2 of 2</p>
                      <h1 className="text-xl font-black text-slate-800 leading-tight">Set New Password</h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-2xl px-4 py-3 mb-5">
                    <CheckCircle size={15} className="shrink-0" />
                    <span>Account found: <strong className="font-semibold">{email}</strong></span>
                  </div>

                  <form onSubmit={submitReset(onResetPassword)} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type={showPw ? 'text' : 'password'} placeholder="Create a strong password"
                          className={`${fieldCls(!!re.newPassword)} pr-11`} {...regReset('newPassword')} />
                        <button type="button" onClick={() => setShowPw(v => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      {re.newPassword
                        ? <p className="text-xs text-red-500 font-medium">{re.newPassword.message}</p>
                        : <p className="text-xs text-slate-400">Min 8 chars · uppercase · lowercase · number</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type={showPw ? 'text' : 'password'} placeholder="Repeat your new password"
                          className={`${fieldCls(!!re.confirmPassword)} pr-11`} {...regReset('confirmPassword')} />
                      </div>
                      {re.confirmPassword && <p className="text-xs text-red-500 font-medium">{re.confirmPassword.message}</p>}
                    </div>

                    <motion.button type="submit" disabled={resetSub}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-bold tracking-wide disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}>
                      {resetSub
                        ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                        : <ShieldCheck size={15} />}
                      {resetSub ? 'Updating…' : 'Update Password'}
                    </motion.button>

                    <button type="button" onClick={() => setStep(1)}
                      className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors pt-1">
                      ← Use a different email
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 3: Success ── */}
              {step === 3 && (
                <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}
                  className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={38} className="text-emerald-500" />
                  </motion.div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">All done!</h2>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Your password has been updated successfully.<br />Sign in with your new password below.
                  </p>
                  <motion.button onClick={() => navigate('/login')}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg,#0041C7,#0D85D8)' }}>
                    <ArrowRight size={15} /> Go to Sign In
                  </motion.button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {step < 3 && (
          <p className="text-center text-white/50 text-sm mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-white font-bold hover:text-az-sky transition-colors">
              Sign in
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
