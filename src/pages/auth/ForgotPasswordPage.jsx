import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, KeyRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
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
  enter:  { opacity: 0, x: 30  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -30 },
};

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const toast    = useToast();
  const navigate = useNavigate();

  const [step, setStep]       = useState(1); // 1: email, 2: new password, 3: done
  const [email, setEmail]     = useState('');
  const [showPw, setShowPw]   = useState(false);
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
    if (!found) {
      setEmailError('No account found with that email address.');
      return;
    }
    setEmail(data.email);
    setStep(2);
  };

  const onResetPassword = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    const result = resetPassword({ email, newPassword: data.newPassword });
    if (result.ok) setStep(3);
    else toast.error(result.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-az-navy via-az-blue to-az-mid">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-az-bright/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg width="130" height="39" viewBox="0 0 199 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#lfp)">
              <path d="M20.459 55.9666C19.9395 56.3642 19.2972 56.8376 18.5321 57.3868C17.767 57.9359 17.0397 58.381 16.3597 58.7029C15.4151 59.1289 14.4328 59.4509 13.4127 59.6497C12.3925 59.858 11.278 59.9621 10.0689 59.9621C7.21639 59.9621 4.81722 59.0816 2.89033 57.3016C0.963444 55.531 0 53.2681 0 50.5129C0 48.3068 0.491168 46.5173 1.4735 45.116C2.45584 43.7242 3.84433 42.6259 5.64843 41.8116C7.43363 41.0068 9.64389 40.4387 12.2886 40.0978C14.9334 39.757 17.6726 39.5108 20.5063 39.3499V39.1889C20.5063 37.5225 19.8262 36.3768 18.4755 35.7425C17.1153 35.1081 15.1223 34.7862 12.4775 34.7862C10.8907 34.7862 9.1905 35.0702 7.38641 35.6289C5.58231 36.1875 4.28827 36.623 3.50429 36.9355H2.61641V29.6639C3.63653 29.3988 5.2895 29.0769 7.58476 28.7076C9.88003 28.3383 12.1753 28.1584 14.48 28.1584C19.9584 28.1584 23.9161 29.0011 26.353 30.6959C28.79 32.3813 30.0085 35.0418 30.0085 38.6492V59.1573H20.4496V55.9666H20.459ZM20.459 51.2798V45.0213C19.1555 45.1255 17.7482 45.277 16.2274 45.4569C14.7067 45.6462 13.5638 45.864 12.7704 46.1102C11.8069 46.4131 11.0702 46.8581 10.5601 47.4357C10.05 48.0133 9.79502 48.7802 9.79502 49.727C9.79502 50.3519 9.85169 50.8632 9.95559 51.2514C10.0595 51.6491 10.3334 52.0183 10.7585 52.3781C11.1646 52.7379 11.6558 53.003 12.232 53.164C12.7987 53.3344 13.696 53.4196 14.9051 53.4196C15.8685 53.4196 16.8414 53.2208 17.8332 52.8326C18.8249 52.4349 19.6939 51.9236 20.4401 51.2798H20.459Z" fill="white"/>
              <path d="M61.3769 59.1668H33.1348V52.9652L48.9655 36.0834H33.7771V29.0295H61.0841V35.1176L45.499 51.971H61.3769V59.1668Z" fill="white"/>
              <path d="M94.6065 59.1668H84.9438V55.8435C83.1586 57.1974 81.5339 58.2295 80.051 58.9396C78.5775 59.6497 76.8112 60 74.7615 60C71.4461 60 68.8958 59.0437 67.1012 57.1312C65.3065 55.2186 64.4092 52.3876 64.4092 48.6477V29.0295H74.072V43.9798C74.072 45.5042 74.1192 46.7635 74.2231 47.7766C74.3175 48.7802 74.5442 49.6229 74.9032 50.2857C75.2432 50.9484 75.7533 51.4313 76.4428 51.7343C77.1323 52.0373 78.0863 52.1888 79.3142 52.1888C80.136 52.1888 81.0428 52.0373 82.044 51.7343C83.0452 51.4313 84.0087 50.9863 84.9343 50.3898V29.0295H94.5971V59.1668H94.6065Z" fill="white"/>
              <path d="M109.53 59.1668H99.8672V17.4026H109.53V59.1668Z" fill="white"/>
              <path d="M188.126 59.9716C185.501 59.9716 183.111 59.6591 180.938 59.0342C178.775 58.4093 176.886 57.4436 175.281 56.137C173.694 54.8303 172.456 53.1829 171.587 51.204C170.709 49.2157 170.274 46.896 170.274 44.226C170.274 41.4139 170.747 38.99 171.682 36.9544C172.617 34.9187 173.93 33.2239 175.602 31.8794C177.226 30.6107 179.097 29.6828 181.222 29.0863C183.347 28.4993 185.548 28.1963 187.834 28.1963C189.883 28.1963 191.782 28.4235 193.51 28.8685C195.239 29.3135 196.854 29.9006 198.356 30.6107V38.848H196.986C196.618 38.5261 196.165 38.1474 195.636 37.7213C195.107 37.2952 194.464 36.8692 193.699 36.462C192.972 36.0738 192.169 35.7424 191.291 35.4773C190.422 35.2217 189.402 35.0891 188.24 35.0891C185.671 35.0891 183.697 35.9034 182.317 37.5414C180.938 39.1794 180.249 41.4044 180.249 44.207C180.249 47.0096 180.957 49.3009 182.374 50.8064C183.791 52.3118 185.803 53.0598 188.4 53.0598C189.619 53.0598 190.705 52.9178 191.678 52.6432C192.651 52.3686 193.454 52.0372 194.096 51.668C194.701 51.3082 195.239 50.9294 195.702 50.5412C196.165 50.1436 196.59 49.7649 196.986 49.3861H198.356V57.6235C196.835 58.343 195.258 58.9017 193.605 59.3277C191.952 59.7443 190.129 59.9621 188.126 59.9621V59.9716Z" fill="white"/>
              <path d="M193.511 25.9145C193.775 25.9808 194.021 26.0754 194.285 26.1512C188.684 10.8979 174.1 0 156.938 0C139.775 0 125.352 10.7748 119.685 25.8955C119.949 25.8577 120.195 25.8103 120.478 25.763C122.773 25.3937 125.069 25.2138 127.373 25.2138C127.723 25.2138 128.044 25.2233 128.384 25.2328C133.711 14.8461 144.489 7.72605 156.938 7.72605C169.387 7.72605 180.249 14.903 185.548 25.3464C186.304 25.2801 187.06 25.2328 187.825 25.2328C189.874 25.2328 191.773 25.4505 193.501 25.905L193.511 25.9145Z" fill="white"/>
            </g>
            <defs><clipPath id="lfp"><rect width="198.356" height="60" fill="white"/></clipPath></defs>
          </svg>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Step indicator */}
          {step < 3 && (
            <div className="flex">
              {[1, 2].map((s) => (
                <div key={s} className={`flex-1 h-1 transition-all duration-500 ${s <= step ? 'bg-az-mid' : 'bg-slate-100'}`} />
              ))}
            </div>
          )}

          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1 — Find account */}
              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-az-light flex items-center justify-center">
                      <KeyRound size={18} className="text-az-mid" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">Reset Password</h1>
                      <p className="text-slate-400 text-sm">Enter your account email to continue</p>
                    </div>
                  </div>

                  {emailError && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                      ⚠ {emailError}
                    </motion.div>
                  )}

                  <form onSubmit={submitEmail(onFindAccount)} className="space-y-4">
                    <Input
                      label="Work Email"
                      type="email"
                      placeholder="you@azularc.com"
                      required
                      icon={Mail}
                      {...regEmail('email')}
                    />
                    <Button type="submit" fullWidth loading={emailSub} icon={<ArrowLeft size={14} className="rotate-180" />}>
                      Find My Account
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Step 2 — Set new password */}
              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Lock size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">Set New Password</h1>
                      <p className="text-slate-400 text-sm truncate max-w-[240px]">{email}</p>
                    </div>
                  </div>

                  <div className="bg-az-lightest border border-az-light rounded-xl px-4 py-3 mb-5 text-sm text-az-blue">
                    Account found. Choose a new password below.
                  </div>

                  <form onSubmit={submitReset(onResetPassword)} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">New Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPw ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          className={`w-full pl-9 pr-10 py-2.5 text-sm border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright transition-all ${re.newPassword ? 'border-red-400' : 'border-slate-300'}`}
                          {...regReset('newPassword')}
                        />
                        <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      {re.newPassword && <p className="text-xs text-red-500 font-medium">{re.newPassword.message}</p>}
                      <p className="text-xs text-slate-400">Min 8 chars with uppercase, lowercase, and a number</p>
                    </div>
                    <Input
                      label="Confirm New Password"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Repeat your new password"
                      required
                      icon={Lock}
                      error={re.confirmPassword?.message}
                      {...regReset('confirmPassword')}
                    />
                    <Button type="submit" fullWidth loading={resetSub} variant="success" icon={<Lock size={14} />}>
                      Reset Password
                    </Button>
                    <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors">
                      ← Use a different email
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 3 — Success */}
              {step === 3 && (
                <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }} className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle size={32} className="text-emerald-500" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Password Reset!</h2>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Your password has been updated successfully.<br />Sign in with your new password.
                  </p>
                  <Button fullWidth onClick={() => navigate('/login')} icon={<ArrowLeft size={14} className="rotate-180" />}>
                    Go to Sign In
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {step < 3 && (
          <p className="text-center text-white/50 text-sm mt-5">
            Remember your password?{' '}
            <Link to="/login" className="text-white font-semibold hover:text-az-sky transition-colors">Sign in</Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
