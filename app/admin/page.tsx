'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  User, 
  Trash2, 
  Plus, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Search,
  X,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [names, setNames] = useState('');
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addError, setAddError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Custom in-app confirmation modal state (replaces native browser confirm/alert)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchGuests();
  }, []);

  // Keyboard accessibility: Escape to dismiss confirm modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && confirmModal?.isOpen) {
        setConfirmModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmModal]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const fetchGuests = async () => {
    try {
      const res = await fetch('/api/guests');
      const data = await res.json();
      if (data.success) {
        setGuests(data.guests);
        setError('');
      } else {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message || 'Không thể kết nối đến máy chủ.');
    }
  };

  const handleAddGuests = async () => {
    if (!names.trim()) return;
    
    setLoading(true);
    setAddError('');
    
    const nameList = names.split('\n').map(n => n.trim()).filter(n => n);
    
    try {
      const res = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: nameList }),
      });
      const data = await res.json();
      
      if (data.success) {
        setNames('');
        showToast(`Đã thêm thành công ${nameList.length} khách mời!`, 'success');
        fetchGuests();
      } else {
        setAddError(data.error || 'Có lỗi xảy ra khi thêm khách mời.');
      }
    } catch (err: any) {
      setAddError(err.message || 'Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  // Custom confirmation dialog before deleting one guest
  const confirmDeleteGuest = (id: string, name?: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Xác nhận xóa khách mời',
      message: name
        ? `Bạn có chắc chắn muốn xóa khách mời "${name}" không? Đường link thiệp của khách này sẽ không còn truy cập được nữa.`
        : 'Bạn có chắc chắn muốn xóa khách mời này không? Đường link thiệp của khách này sẽ không còn truy cập được nữa.',
      confirmText: 'Xác nhận xóa',
      cancelText: 'Hủy bỏ',
      onConfirm: () => executeDelete(id),
    });
  };

  // Custom confirmation dialog before deleting all guests
  const confirmDeleteAll = () => {
    if (guests.length === 0) return;
    setConfirmModal({
      isOpen: true,
      title: 'Xác nhận xóa toàn bộ danh sách',
      message: `Bạn có chắc chắn muốn xóa tất cả ${guests.length} khách mời không? Mọi đường link thiệp cưới đã tạo sẽ bị xóa vĩnh viễn và không thể khôi phục.`,
      confirmText: 'Xác nhận xóa tất cả',
      cancelText: 'Hủy bỏ',
      onConfirm: () => executeDelete(),
    });
  };

  // Actual delete request execution
  const executeDelete = async (id?: string) => {
    setConfirmModal(null);
    setLoading(true);
    try {
      const url = id ? `/api/guests?id=${id}` : '/api/guests';
      const res = await fetch(url, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(id ? 'Đã xóa khách mời thành công!' : 'Đã xóa tất cả khách mời thành công!', 'success');
        fetchGuests();
      } else {
        showToast(data.error || 'Có lỗi xảy ra khi xóa khách mời.', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Lỗi kết nối máy chủ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch {
      router.push('/login');
    }
  };

  const copyToClipboard = (token: string, name?: string) => {
    const link = `${window.location.origin}/i/${token}`;
    navigator.clipboard.writeText(link);
    setCopiedToken(token);
    showToast(name ? `Đã copy link của ${name}!` : 'Đã copy link thiệp!', 'success');
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Filter guests based on search input
  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) return guests;
    const q = searchQuery.toLowerCase().trim();
    return guests.filter((guest) => {
      const name = (guest.name || '').toLowerCase();
      const token = (guest.token || '').toLowerCase();
      return name.includes(q) || token.includes(q);
    });
  }, [guests, searchQuery]);

  if (!mounted) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-gray-50/70 text-gray-900 pb-16">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs">
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
            <div>
              <div className="text-base sm:text-lg font-bold text-gray-900">Quản lý khách mời</div>
              <div className="text-xs text-gray-500">Hệ thống tạo link thiệp cưới</div>
            </div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6">
          <div className="bg-white p-8 rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 flex items-center justify-center min-h-[300px]">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gray-50/70 text-gray-900 pb-16">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
          {/* Header Title (Without AD Avatar) */}
          <div className="min-w-0 pr-2">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
              Quản lý khách mời
            </h1>
            <p className="text-xs text-gray-500 truncate">Hệ thống tạo link thiệp cưới</p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>Quản trị viên</span>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-colors cursor-pointer"
              title="Đăng xuất khỏi hệ thống"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{isLoggingOut ? 'Đang thoát...' : 'Đăng xuất'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6">
        {/* Error Alert if any */}
        {error && (
          <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 min-w-0">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="break-words">{error}</span>
            </div>
            <button
              onClick={fetchGuests}
              className="text-xs bg-red-100 hover:bg-red-200 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex-shrink-0"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Add Guests Card */}
        <div className="bg-white p-4 sm:p-7 rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Thêm khách mời mới</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Nhập tên khách mời (mỗi tên một dòng, hệ thống sẽ tự động tạo link riêng cho từng người):
          </p>
          <textarea
            className="w-full h-32 sm:h-36 p-3 sm:p-3.5 border border-gray-200 rounded-xl mb-3 sm:mb-4 text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all resize-y text-sm font-sans"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="Nguyễn Văn An&#10;Trần Thị Bình&#10;Gia đình chú Hải"
          />

          {addError && (
            <p className="text-xs sm:text-sm text-red-600 font-medium mb-3">
              {addError}
            </p>
          )}

          <div className="flex items-center justify-end sm:justify-start">
            <button
              onClick={handleAddGuests}
              disabled={loading || !names.trim()}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-xs hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{loading ? 'Đang xử lý...' : 'Tạo link'}</span>
            </button>
          </div>
        </div>

        {/* Guests List Card */}
        <div className="bg-white p-4 sm:p-7 rounded-xl sm:rounded-2xl shadow-xs border border-gray-100">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Danh sách khách mời
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {guests.length}
              </span>
              {searchQuery.trim() && (
                <span className="text-xs text-blue-600 font-medium">
                  (Tìm thấy {filteredGuests.length})
                </span>
              )}
            </div>

            <button
              onClick={confirmDeleteAll}
              disabled={loading || guests.length === 0}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-transparent hover:border-red-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 cursor-pointer self-start sm:self-auto flex-shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Xóa tất cả</span>
            </button>
          </div>

          {/* Search Bar - Flexbox Container: Never Overlaps */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="flex-1 flex items-center bg-gray-50/80 border border-gray-200 rounded-xl px-3.5 py-2 sm:py-2.5 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên khách hoặc mã thiệp..."
                className="w-full bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm p-0 focus:ring-0 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0 ml-1.5 rounded-full hover:bg-gray-200/80 transition-colors cursor-pointer"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3 py-2 sm:py-2.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer flex-shrink-0"
              >
                Đặt lại
              </button>
            )}
          </div>
          
          {/* Mobile Card List View (Visible on Mobile only) */}
          <div className="block sm:hidden space-y-2.5">
            {filteredGuests.map((guest, idx) => (
              <div 
                key={guest._id || idx} 
                className="p-3 bg-gray-50/80 border border-gray-200/70 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-gray-200/80 text-gray-600 text-[11px] flex items-center justify-center font-medium flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm truncate">
                      {guest.name}
                    </span>
                  </div>
                  <button
                    onClick={() => confirmDeleteGuest(guest._id, guest.name)}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg active:bg-red-50 transition-colors flex-shrink-0 cursor-pointer"
                    title={`Xóa ${guest.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200/60">
                  <span className="font-mono text-xs bg-white text-gray-700 px-2 py-1 rounded-md border border-gray-200 truncate max-w-[130px]">
                    /i/{guest.token}
                  </span>

                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    <button
                      onClick={() => copyToClipboard(guest.token, guest.name)}
                      className="inline-flex items-center space-x-1 text-xs text-blue-600 font-medium bg-blue-50 active:bg-blue-100 px-2.5 py-1.5 rounded-lg border border-blue-100 transition-colors cursor-pointer"
                    >
                      {copiedToken === guest.token ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`/i/${guest.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg bg-gray-100 active:bg-gray-200 transition-colors"
                      title="Xem thử thiệp"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Visible on Desktop/Tablet only) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  <th className="pb-3 px-3 w-14 text-center">STT</th>
                  <th className="pb-3 px-3">Tên khách mời</th>
                  <th className="pb-3 px-3">Link thiệp</th>
                  <th className="pb-3 px-3 text-right w-20">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredGuests.map((guest, idx) => (
                  <tr key={guest._id || idx} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-3 px-3 text-gray-400 text-xs text-center">{idx + 1}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">{guest.name}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200/60">
                          /i/{guest.token}
                        </span>
                        <button
                          onClick={() => copyToClipboard(guest.token, guest.name)}
                          className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          {copiedToken === guest.token ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Đã copy!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy link</span>
                            </>
                          )}
                        </button>
                        <a
                          href={`/i/${guest.token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-200/60 transition-colors"
                          title="Xem thử thiệp"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => confirmDeleteGuest(guest._id, guest.name)}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                        title={`Xóa ${guest.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State when no results found for query */}
          {guests.length > 0 && filteredGuests.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-sm">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Search className="w-8 h-8 text-gray-300" />
                <p className="font-medium text-gray-700 text-xs sm:text-sm">
                  Không tìm thấy khách mời nào phù hợp với "{searchQuery}"
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Xóa tìm kiếm để xem tất cả ({guests.length} khách mời)
                </button>
              </div>
            </div>
          )}

          {/* Empty State when zero total guests */}
          {guests.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-xs sm:text-sm">
              Chưa có khách mời nào. Hãy thêm khách mời ở biểu mẫu phía trên!
            </div>
          )}
        </div>
      </main>

      {/* Custom Confirmation Modal (Replaces native browser confirm/alert) */}
      {confirmModal?.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
          onClick={() => setConfirmModal(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md p-5 sm:p-6 relative overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {confirmModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                  {confirmModal.message}
                </p>
              </div>
              <button
                onClick={() => setConfirmModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer -mr-1 -mt-1 flex-shrink-0"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                {confirmModal.cancelText || 'Hủy bỏ'}
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                disabled={loading}
                className="px-4 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs hover:shadow cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{confirmModal.confirmText || 'Xác nhận xóa'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast Notification */}
      {toast && (
        <div 
          className={`fixed bottom-5 right-5 z-50 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-medium flex items-center space-x-2.5 animate-fadeIn max-w-[90vw] sm:max-w-md ${
            toast.type === 'error' 
              ? 'bg-red-600' 
              : toast.type === 'info' 
              ? 'bg-blue-600' 
              : 'bg-gray-900'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-white flex-shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-white flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          )}
          <span className="leading-snug">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
