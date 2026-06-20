import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const schema = z.object({
  email:    z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const AzularcLogo = () => (
  <svg width="160" height="48" viewBox="0 0 199 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#lp)">
      <path d="M20.459 55.9666C19.9395 56.3642 19.2972 56.8376 18.5321 57.3868C17.767 57.9359 17.0397 58.381 16.3597 58.7029C15.4151 59.1289 14.4328 59.4509 13.4127 59.6497C12.3925 59.858 11.278 59.9621 10.0689 59.9621C7.21639 59.9621 4.81722 59.0816 2.89033 57.3016C0.963444 55.531 0 53.2681 0 50.5129C0 48.3068 0.491168 46.5173 1.4735 45.116C2.45584 43.7242 3.84433 42.6259 5.64843 41.8116C7.43363 41.0068 9.64389 40.4387 12.2886 40.0978C14.9334 39.757 17.6726 39.5108 20.5063 39.3499V39.1889C20.5063 37.5225 19.8262 36.3768 18.4755 35.7425C17.1153 35.1081 15.1223 34.7862 12.4775 34.7862C10.8907 34.7862 9.1905 35.0702 7.38641 35.6289C5.58231 36.1875 4.28827 36.623 3.50429 36.9355H2.61641V29.6639C3.63653 29.3988 5.2895 29.0769 7.58476 28.7076C9.88003 28.3383 12.1753 28.1584 14.48 28.1584C19.9584 28.1584 23.9161 29.0011 26.353 30.6959C28.79 32.3813 30.0085 35.0418 30.0085 38.6492V59.1573H20.4496V55.9666H20.459ZM20.459 51.2798V45.0213C19.1555 45.1255 17.7482 45.277 16.2274 45.4569C14.7067 45.6462 13.5638 45.864 12.7704 46.1102C11.8069 46.4131 11.0702 46.8581 10.5601 47.4357C10.05 48.0133 9.79502 48.7802 9.79502 49.727C9.79502 50.3519 9.85169 50.8632 9.95559 51.2514C10.0595 51.6491 10.3334 52.0183 10.7585 52.3781C11.1646 52.7379 11.6558 53.003 12.232 53.164C12.7987 53.3344 13.696 53.4196 14.9051 53.4196C15.8685 53.4196 16.8414 53.2208 17.8332 52.8326C18.8249 52.4349 19.6939 51.9236 20.4401 51.2798H20.459Z" fill="white"/>
      <path d="M61.3769 59.1668H33.1348V52.9652L48.9655 36.0834H33.7771V29.0295H61.0841V35.1176L45.499 51.971H61.3769V59.1668Z" fill="white"/>
      <path d="M94.6065 59.1668H84.9438V55.8435C83.1586 57.1974 81.5339 58.2295 80.051 58.9396C78.5775 59.6497 76.8112 60 74.7615 60C71.4461 60 68.8958 59.0437 67.1012 57.1312C65.3065 55.2186 64.4092 52.3876 64.4092 48.6477V29.0295H74.072V43.9798C74.072 45.5042 74.1192 46.7635 74.2231 47.7766C74.3175 48.7802 74.5442 49.6229 74.9032 50.2857C75.2432 50.9484 75.7533 51.4313 76.4428 51.7343C77.1323 52.0373 78.0863 52.1888 79.3142 52.1888C80.136 52.1888 81.0428 52.0373 82.044 51.7343C83.0452 51.4313 84.0087 50.9863 84.9343 50.3898V29.0295H94.5971V59.1668H94.6065Z" fill="white"/>
      <path d="M109.53 59.1668H99.8672V17.4026H109.53V59.1668Z" fill="white"/>
      <path d="M133.343 55.9666C132.823 56.3642 132.181 56.8376 131.416 57.3868C130.651 57.9359 129.924 58.381 129.243 58.7029C128.299 59.1289 127.317 59.4509 126.296 59.6497C125.276 59.858 124.162 59.9621 122.953 59.9621C120.1 59.9621 117.701 59.0816 115.774 57.3016C113.847 55.531 112.884 53.2681 112.884 50.5129C112.884 48.3068 113.375 46.5173 114.357 45.116C115.34 43.7242 116.728 42.6259 118.532 41.8116C120.317 41.0068 122.528 40.4387 125.172 40.0978C127.808 39.757 130.556 39.5108 133.39 39.3499V39.1889C133.39 37.5225 132.71 36.3768 131.359 35.7425C129.999 35.1081 128.006 34.7862 125.361 34.7862C123.774 34.7862 122.074 35.0702 120.27 35.6289C118.466 36.1875 117.172 36.623 116.388 36.9355H115.5V29.6639C116.52 29.3988 118.173 29.0769 120.469 28.7076C122.764 28.3383 125.059 28.1584 127.364 28.1584C132.842 28.1584 136.8 29.0011 139.237 30.6959C141.674 32.3813 142.892 35.0418 142.892 38.6492V59.1573H133.333V55.9666H133.343ZM133.343 51.2798V45.0213C132.039 45.1255 130.632 45.277 129.111 45.4569C127.59 45.6462 126.438 45.864 125.654 46.1102C124.691 46.4131 123.954 46.8581 123.444 47.4357C122.934 48.0133 122.679 48.7802 122.679 49.727C122.679 50.3519 122.735 50.8632 122.839 51.2514C122.943 51.6491 123.217 52.0183 123.642 52.3781C124.058 52.7379 124.54 53.003 125.116 53.164C125.682 53.3344 126.58 53.4196 127.789 53.4196C128.752 53.4196 129.725 53.2208 130.717 52.8326C131.709 52.4349 132.578 51.9236 133.324 51.2798H133.343Z" fill="white"/>
      <path d="M169.793 38.2325H168.933C168.527 38.0905 167.866 37.9769 166.959 37.9106C166.052 37.8443 165.297 37.8065 164.692 37.8065C163.323 37.8065 162.104 37.9012 161.056 38.081C160.007 38.2609 158.874 38.5639 157.665 38.99V59.1762H148.002V29.0294H157.665V33.4606C159.781 31.6332 161.632 30.4213 163.2 29.8248C164.768 29.2188 166.213 28.9253 167.526 28.9253C167.866 28.9253 168.244 28.9253 168.678 28.9537C169.103 28.9726 169.481 29.001 169.802 29.0389V38.242L169.793 38.2325Z" fill="white"/>
      <path d="M188.126 59.9716C185.501 59.9716 183.111 59.6591 180.938 59.0342C178.775 58.4093 176.886 57.4436 175.281 56.137C173.694 54.8303 172.456 53.1829 171.587 51.204C170.709 49.2157 170.274 46.896 170.274 44.226C170.274 41.4139 170.747 38.99 171.682 36.9544C172.617 34.9187 173.93 33.2239 175.602 31.8794C177.226 30.6107 179.097 29.6828 181.222 29.0863C183.347 28.4993 185.548 28.1963 187.834 28.1963C189.883 28.1963 191.782 28.4235 193.51 28.8685C195.239 29.3135 196.854 29.9006 198.356 30.6107V38.848H196.986C196.618 38.5261 196.165 38.1474 195.636 37.7213C195.107 37.2952 194.464 36.8692 193.699 36.462C192.972 36.0738 192.169 35.7424 191.291 35.4773C190.422 35.2217 189.402 35.0891 188.24 35.0891C185.671 35.0891 183.697 35.9034 182.317 37.5414C180.938 39.1794 180.249 41.4044 180.249 44.207C180.249 47.0096 180.957 49.3009 182.374 50.8064C183.791 52.3118 185.803 53.0598 188.4 53.0598C189.619 53.0598 190.705 52.9178 191.678 52.6432C192.651 52.3686 193.454 52.0372 194.096 51.668C194.701 51.3082 195.239 50.9294 195.702 50.5412C196.165 50.1436 196.59 49.7649 196.986 49.3861H198.356V57.6235C196.835 58.343 195.258 58.9017 193.605 59.3277C191.952 59.7443 190.129 59.9621 188.126 59.9621V59.9716Z" fill="white"/>
      <path d="M193.511 25.9145C193.775 25.9808 194.021 26.0754 194.285 26.1512C188.684 10.8979 174.1 0 156.938 0C139.775 0 125.352 10.7748 119.685 25.8955C119.949 25.8577 120.195 25.8103 120.478 25.763C122.773 25.3937 125.069 25.2138 127.373 25.2138C127.723 25.2138 128.044 25.2233 128.384 25.2328C133.711 14.8461 144.489 7.72605 156.938 7.72605C169.387 7.72605 180.249 14.903 185.548 25.3464C186.304 25.2801 187.06 25.2328 187.825 25.2328C189.874 25.2328 191.773 25.4505 193.501 25.905L193.511 25.9145Z" fill="white"/>
    </g>
    <defs><clipPath id="lp"><rect width="198.356" height="60" fill="white"/></clipPath></defs>
  </svg>
);

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const toast   = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from     = location.state?.from?.pathname || '/';
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async (data) => {
    setAuthError('');
    await new Promise((r) => setTimeout(r, 400)); // simulate network
    const result = login(data);
    if (result.ok) {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-az-navy p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-az-blue/40" />
          <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full bg-az-bright/20" />
        </div>
        <AzularcLogo />
        <div className="relative">
          <h2 className="text-3xl font-bold text-white leading-snug mb-4">
            Estimates that win<br />projects.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Create professional proposals, calculate costs instantly, and export client-ready PDFs — all in one place.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[['6 Services', 'Configurable rates'],['PDF & Excel','One-click export'],['Live Totals','Instant calculation'],['History','Never lose an estimate']].map(([title, sub]) => (
              <div key={title} className="bg-white/8 rounded-xl p-4">
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-white/50 text-xs mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-white/30 text-xs">© {new Date().getFullYear()} Azularc. Internal use only.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-az-lightest">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8 flex justify-center">
            <div className="bg-az-navy rounded-2xl px-6 py-4">
              <AzularcLogo />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-800">Sign in</h1>
              <p className="text-slate-400 text-sm mt-1">Access your project estimator</p>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5"
              >
                <span>⚠</span> {authError}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email address"
                type="email"
                placeholder="you@azularc.com"
                required
                icon={Mail}
                error={errors.email?.message}
                {...register('email')}
              />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Password <span className="text-red-500">*</span></label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-az-mid hover:text-az-blue transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`w-full pl-9 pr-10 py-2.5 text-sm border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-az-bright/20 focus:border-az-bright transition-all ${errors.password ? 'border-red-400' : 'border-slate-300'}`}
                    {...register('password')}
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
              </div>

              <Button type="submit" fullWidth loading={isSubmitting} icon={<LogIn size={15} />} className="mt-2">
                Sign In
              </Button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-az-mid font-semibold hover:text-az-blue transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
