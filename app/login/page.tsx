'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  Heart
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 600);
      } else {
        setError(data.error || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setUsername('minhdauk_db_user');
    setPassword('rWFz3Nf6NZzJA9fa');
    setError('');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 relative z-10 transition-all">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#988767] to-[#C99A5B] text-white shadow-md shadow-[#988767]/20 mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#988767] mb-1">
          <Heart className="w-3.5 h-3.5 fill-current text-[#988767]" />
          <span>Hệ Thống Quản Trị</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Đăng Nhập
        </h1>
        <p className="text-sm text-gray-500 mt-1.5">
          Quản lý danh sách khách mời và thiệp cưới
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-3 text-red-700 animate-fadeIn">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
          <div className="text-sm">
            <span className="font-semibold block mb-0.5">Đăng nhập thất bại</span>
            {error}
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3 text-emerald-800 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <div className="text-sm font-medium">
            Đăng nhập thành công! Đang chuyển hướng...
          </div>
        </div>
      )}

      {/* Standard Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Username */}
        <div>
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Tên đăng nhập
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#988767]/50 focus:border-[#988767] focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#988767]/50 focus:border-[#988767] focus:bg-white transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember me & Helper */}
        <div className="flex items-center justify-between text-sm pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#988767] focus:ring-[#988767] border-gray-300 accent-[#988767]"
            />
            <span className="text-gray-600 text-sm">Ghi nhớ đăng nhập</span>
          </label>

          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="text-xs text-[#988767] hover:text-[#7A6A4E] font-medium hover:underline transition-colors"
          >
            Điền tài khoản mẫu
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#988767] to-[#B39363] hover:from-[#88785A] hover:to-[#A38354] text-white font-semibold text-sm shadow-md shadow-[#988767]/25 hover:shadow-lg hover:shadow-[#988767]/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang kiểm tra...</span>
            </>
          ) : (
            <>
              <span>Đăng Nhập</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer hint */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          Khu vực quản trị nội bộ dành cho cô dâu & chú rể
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-4">
        <div className="w-9 h-9 border-3 border-[#988767] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FAF1E3] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F3ECE1] rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Card Content with Suspense Boundary for useSearchParams */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
