'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Playfair_Display, EB_Garamond } from 'next/font/google';
import {
  MessageSquareHeart,
  X,
  Copy,
  Check,
  Heart,
  QrCode,
  Send,
  Sparkles,
  Download,
  RotateCw,
} from 'lucide-react';

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

const ebGaramond = EB_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

export interface WishItem {
  _id?: string;
  name: string;
  message: string;
  attendance?: string;
  createdAt?: string | Date;
}

interface Slide5RSVPProps {
  guestName?: string;
}

export default function Slide5RSVP({ guestName = '' }: Slide5RSVPProps) {
  // Form states
  const [name, setName] = useState(guestName);
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('Xác nhận tham dự');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Modal states
  const [isWishesOpen, setIsWishesOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrTab, setQrTab] = useState<'groom' | 'bride'>('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  // Wishes data
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(false);

  // Pre-fill name if guestName changes
  useEffect(() => {
    if (guestName && !name) {
      setName(guestName);
    }
  }, [guestName, name]);

  // Fetch wishes from DB (cache: 'no-store')
  const fetchWishes = async () => {
    setIsLoadingWishes(true);
    try {
      const res = await fetch('/api/wishes', {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache',
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.wishes)) {
        setWishes(data.wishes);
      }
    } catch (err) {
      console.warn('Error fetching wishes:', err);
    } finally {
      setIsLoadingWishes(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Handle RSVP & Wish Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Vui lòng nhập tên của Quý Khách.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          attendance,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setMessage('');
        // Re-fetch all wishes from DB so the newest list is loaded
        await fetchWishes();
        // Automatically open the wishes guestbook popup after 1s so the user can immediately see their wish recorded on the site!
        setTimeout(() => {
          setIsWishesOpen(true);
          setSubmitSuccess(false);
        }, 1200);
      } else {
        alert(data.error || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy Account Number
  const copyToClipboard = (text: string, type: 'groom' | 'bride') => {
    navigator.clipboard.writeText(text);
    if (type === 'groom') {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2500);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2500);
    }
  };

  // Format time relative
  const formatTime = (dateInput?: string | Date) => {
    if (!dateInput) return 'Vừa xong';
    const date = new Date(dateInput);
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <section className="relative w-full bg-[#FFFAF4] pt-8 pb-16 select-none overflow-x-hidden">
      <div className="relative w-full max-w-[430px] sm:max-w-[450px] mx-auto px-5 sm:px-6 flex flex-col items-center">
        {/* 1. Header paragraph text from image */}
        <p
          className={`${playfair.className} text-[15px] sm:text-[16.5px] text-[#AC4558] text-center font-semibold leading-relaxed max-w-[380px] mb-6 sm:mb-7`}
        >
          Hãy xác nhận sự có mặt của Quý Khách để gia đình chúng tôi chuẩn bị đón
          tiếp một cách chu đáo nhất.
          <br />
          <span className="font-bold italic">Trân trọng!</span>
        </p>

        {/* 2. RSVP & Wishes Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5 sm:gap-4">
          {/* Input 1: Tên của Quý Khách */}
          <div className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của Quý Khách?"
              required
              className={`${playfair.className} w-full px-5 py-3 rounded-full bg-white/70 border border-[#AC4558]/55 text-[#8F3047] placeholder-[#AC4558]/65 text-[15px] sm:text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-[#AC4558]/30 transition-all shadow-[0_2px_8px_rgba(172,69,88,0.06)]`}
            />
          </div>

          {/* Input 2: Nhập lời chúc của Quý Khách */}
          <div className="w-full">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập lời chúc của Quý Khách"
              className={`${playfair.className} w-full px-5 py-3.5 rounded-[22px] bg-white/70 border border-[#AC4558]/55 text-[#8F3047] placeholder-[#AC4558]/65 text-[15px] sm:text-[16px] font-medium leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#AC4558]/30 transition-all shadow-[0_2px_8px_rgba(172,69,88,0.06)]`}
            />
          </div>

          {/* Input 3: Xác nhận tham dự (Dropdown Select) */}
          <div className="w-full relative">
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className={`${playfair.className} w-full px-5 py-3 rounded-full bg-white/70 border border-[#AC4558]/55 text-[#8F3047] text-[15px] sm:text-[16px] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#AC4558]/30 transition-all shadow-[0_2px_8px_rgba(172,69,88,0.06)] cursor-pointer pr-10`}
            >
              <option value="Xác nhận tham dự">Xác nhận tham dự</option>
              <option value="Chắc chắn tham dự">Chắc chắn tham dự</option>
              <option value="Rất tiếc không thể tham dự">
                Rất tiếc không thể tham dự
              </option>
              <option value="Gửi lời chúc mừng từ xa">Gửi lời chúc mừng từ xa</option>
            </select>
            {/* Custom dropdown arrow icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AC4558]">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 10L0.937822 0.25L13.0622 0.250001L7 10Z" />
              </svg>
            </div>
          </div>

          {/* Success Banner */}
          {submitSuccess && (
            <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center text-sm font-medium flex items-center justify-center gap-1.5 animate-in fade-in">
              <Check size={16} className="text-emerald-600" />
              Cảm ơn Quý Khách đã gửi lời chúc và xác nhận tham dự!
            </div>
          )}

          {/* Row 4: [ GỬI LỜI CHÚC & XÁC NHẬN ] + [ Nút tròn icon tin nhắn trái tim ] */}
          <div className="w-full flex items-center gap-2.5 sm:gap-3 mt-1">
            {/* Button 1: Gửi lời chúc & xác nhận */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${ebGaramond.className} flex-1 py-3.5 sm:py-3.5 px-4 rounded-full bg-[#AC4558] hover:bg-[#8F3047] text-white text-[15.5px] sm:text-[16.5px] font-medium tracking-[0.05em] uppercase shadow-[0_4px_14px_rgba(172,69,88,0.25)] hover:shadow-[0_6px_18px_rgba(172,69,88,0.35)] active:scale-[0.98] transition-all disabled:opacity-75 flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <span>Đang gửi...</span>
              ) : (
                <span>GỬI LỜI CHÚC & XÁC NHẬN</span>
              )}
            </button>

            {/* Button 2: Nút tròn icon tin nhắn trái tim */}
            <button
              type="button"
              onClick={() => {
                fetchWishes();
                setIsWishesOpen(true);
              }}
              title="Xem những lời chúc của mọi người"
              className="relative w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] shrink-0 rounded-full bg-[#AC4558] hover:bg-[#8F3047] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(172,69,88,0.25)] hover:shadow-[0_6px_18px_rgba(172,69,88,0.35)] active:scale-95 transition-all group"
            >
              <MessageSquareHeart
                size={22}
                className="transform group-hover:scale-110 transition-transform"
              />
              {wishes.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-white text-[#AC4558] text-[10.5px] font-bold border-2 border-[#AC4558] flex items-center justify-center shadow-sm">
                  {wishes.length}
                </span>
              )}
            </button>
          </div>

          {/* Row 5: [ GỬI QUÀ MỪNG CƯỚI ] */}
          <button
            type="button"
            onClick={() => setIsQrOpen(true)}
            className={`${ebGaramond.className} w-full py-3.5 sm:py-3.5 px-4 rounded-full bg-[#AC4558] hover:bg-[#8F3047] text-white text-[15.5px] sm:text-[16.5px] font-medium tracking-[0.05em] uppercase shadow-[0_4px_14px_rgba(172,69,88,0.25)] hover:shadow-[0_6px_18px_rgba(172,69,88,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
          >
            <span>GỬI QUÀ MỪNG CƯỚI</span>
          </button>

          {/* Row 6: Nút xem toàn bộ lời chúc */}
          <button
            type="button"
            onClick={() => {
              fetchWishes();
              setIsWishesOpen(true);
            }}
            className={`${ebGaramond.className} mt-1 text-[15px] sm:text-[16px] text-[#AC4558] hover:text-[#8F3047] font-medium flex items-center justify-center gap-1.5 transition-colors underline underline-offset-4`}
          >
            <MessageSquareHeart size={16} />
            <span>
              Xem sổ lưu bút {wishes.length > 0 ? `(${wishes.length} lời chúc)` : ''}
            </span>
          </button>
        </form>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: POPUP NHỮNG LỜI CHÚC CỦA MỌI NGƯỜI (SỔ LƯU BÚT) */}
      {/* ========================================================= */}
      {isWishesOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsWishesOpen(false)}
        >
          <div
            className="relative w-full max-w-[430px] max-h-[85vh] bg-[#FFFAF4] rounded-[28px] border border-[#AC4558]/30 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative px-6 pt-6 pb-3 border-b border-[#AC4558]/15 flex flex-col items-center text-center bg-gradient-to-b from-[#AC4558]/10 to-transparent">
              {/* Refresh button */}
              <button
                onClick={fetchWishes}
                title="Làm mới danh sách lời chúc"
                className="absolute left-4 top-4 w-8 h-8 rounded-full bg-[#AC4558]/10 hover:bg-[#AC4558]/20 text-[#8F3047] flex items-center justify-center transition active:scale-90"
              >
                <RotateCw size={15} className={isLoadingWishes ? 'animate-spin' : ''} />
              </button>

              {/* Close button */}
              <button
                onClick={() => setIsWishesOpen(false)}
                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#AC4558]/10 hover:bg-[#AC4558]/20 text-[#8F3047] flex items-center justify-center transition active:scale-90"
              >
                <X size={18} />
              </button>
              <div className="w-10 h-10 rounded-full bg-[#AC4558] text-white flex items-center justify-center shadow-md mb-2">
                <Heart size={20} className="fill-white" />
              </div>
              <h3
                className={`${ebGaramond.className} text-[20px] sm:text-[22px] font-semibold text-[#AC4558] uppercase tracking-wide`}
              >
                SỔ LƯU BÚT & LỜI CHÚC
              </h3>
              <p
                className={`${playfair.className} text-[13px] sm:text-[14px] text-[#8F3047] italic font-medium mt-0.5`}
              >
                Những tình cảm và lời chúc phúc chân thành dành tặng đôi uyên ương
              </p>
              {wishes.length > 0 && (
                <span className="mt-1.5 px-3 py-0.5 rounded-full bg-[#AC4558]/10 text-[#AC4558] text-[11.5px] font-bold tracking-wide">
                  {wishes.length} lời chúc phúc đã gửi
                </span>
              )}
            </div>

            {/* Wishes Scrollable List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
              {isLoadingWishes ? (
                <div className="text-center py-8 text-[#AC4558]/70 text-sm">
                  Đang tải những lời chúc ngọt ngào...
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-center py-10 px-4 flex flex-col items-center justify-center gap-2.5">
                  <div className="w-12 h-12 rounded-full bg-[#AC4558]/10 flex items-center justify-center text-[#AC4558]">
                    <Heart size={22} className="stroke-[1.5]" />
                  </div>
                  <p className={`${playfair.className} text-[15.5px] text-[#8F3047] font-semibold`}>
                    Chưa có lời chúc nào
                  </p>
                  <p className="text-[13px] text-[#AC4558]/70 max-w-[260px] leading-relaxed">
                    Hãy là người đầu tiên gửi gắm lời chúc phúc yêu thương tới Xuân Tùng & Thuý Hiền nhé!
                  </p>
                </div>
              ) : (
                wishes.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#AC4558]/20 shadow-[0_2px_10px_rgba(172,69,88,0.06)] flex flex-col gap-1.5 transition hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`${playfair.className} font-bold text-[15.5px] text-[#AC4558] tracking-wide flex items-center gap-1.5`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#AC4558]" />
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-stone-400 font-normal">
                        {formatTime(item.createdAt)}
                      </span>
                    </div>

                    {item.message ? (
                      <p
                        className={`${playfair.className} text-[14px] sm:text-[14.5px] text-stone-700 leading-relaxed pl-3.5 italic font-medium`}
                      >
                        “{item.message}”
                      </p>
                    ) : (
                      <p className="text-[13px] text-stone-400 pl-3.5 italic">
                        Đã xác nhận gửi lời chúc mừng đến cô dâu & chú rể!
                      </p>
                    )}

                    {item.attendance && (
                      <div className="self-end mt-1">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#AC4558]/10 text-[#AC4558] font-medium tracking-wide">
                          {item.attendance}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#AC4558]/15 bg-white/50 text-center">
              <button
                onClick={() => setIsWishesOpen(false)}
                className={`${playfair.className} text-xs font-bold uppercase text-[#AC4558] hover:underline tracking-wider`}
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: GỬI QUÀ MỪNG CƯỚI - MÃ QR & SỐ TÀI KHOẢN SANG TRỌNG */}
      {/* ========================================================= */}
      {isQrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsQrOpen(false)}
        >
          <div
            className="relative w-full max-w-[420px] max-h-[90vh] bg-[#FFFAF4] rounded-[30px] border border-[#AC4558]/35 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setIsQrOpen(false)}
              className="absolute right-3.5 top-3.5 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#AC4558] shadow-md flex items-center justify-center transition active:scale-90"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            {/* Modal Top Decorative Header */}
            <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-[#AC4558]/12 to-transparent text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#AC4558] text-white shadow-md mb-2">
                <Sparkles size={22} />
              </div>
              <h3
                className={`${ebGaramond.className} text-[21px] sm:text-[23px] font-semibold text-[#AC4558] uppercase tracking-wider`}
              >
                HỘP MỪNG CƯỚI
              </h3>
              <p
                className={`${playfair.className} text-[13px] sm:text-[14px] text-[#8F3047] italic font-medium max-w-[320px] mt-0.5 leading-snug`}
              >
                Gửi gắm lời chúc phúc và món quà ý nghĩa đến Đôi Uyên Ương
              </p>

              {/* 2 Tabs: CHÚ RỂ & CÔ DÂU */}
              <div className="w-full max-w-[280px] mt-4 p-1 rounded-full bg-stone-200/70 border border-[#AC4558]/20 flex items-center">
                <button
                  type="button"
                  onClick={() => setQrTab('groom')}
                  className={`${ebGaramond.className} flex-1 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                    qrTab === 'groom'
                      ? 'bg-[#AC4558] text-white shadow-sm'
                      : 'text-[#8F3047] hover:text-[#AC4558]'
                  }`}
                >
                  CHÚ RỂ
                </button>
                <button
                  type="button"
                  onClick={() => setQrTab('bride')}
                  className={`${ebGaramond.className} flex-1 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                    qrTab === 'bride'
                      ? 'bg-[#AC4558] text-white shadow-sm'
                      : 'text-[#8F3047] hover:text-[#AC4558]'
                  }`}
                >
                  CÔ DÂU
                </button>
              </div>
            </div>

            {/* Modal Body: QR Card Details */}
            <div className="flex-1 overflow-y-auto px-5 pb-6 pt-1 flex flex-col items-center text-center">
              {qrTab === 'groom' ? (
                /* ================= TAB CHÚ RỂ ================= */
                <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
                  {/* Luxury QR Frame */}
                  <div className="relative p-3 rounded-2xl bg-white border-2 border-[#AC4558]/35 shadow-[0_6px_20px_rgba(172,69,88,0.15)] my-2">
                    {/* 4 Corner Ornaments */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#AC4558]" />
                    <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#AC4558]" />
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#AC4558]" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#AC4558]" />

                    {/* QR Image */}
                    <div className="relative w-[190px] h-[225px] sm:w-[210px] sm:h-[250px] overflow-hidden rounded-lg bg-white flex items-center justify-center">
                      <Image
                        src="/images/qr-chu-re.svg"
                        alt="Mã QR mừng cưới Chú rể Phạm Xuân Tùng"
                        fill
                        sizes="210px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Bank Info Details */}
                  <div className="w-full mt-3 px-3 py-3 rounded-xl bg-white/80 border border-[#AC4558]/20 flex flex-col items-center gap-1">
                    <span className="text-[11.5px] uppercase tracking-wider text-stone-500 font-medium">
                      Ngân hàng Quân Đội (MB Bank)
                    </span>
                    <span
                      className={`${playfair.className} text-[17px] sm:text-[18px] font-bold text-[#AC4558] tracking-wider`}
                    >
                      PHẠM XUÂN TÙNG
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[16px] sm:text-[17px] font-mono font-bold text-stone-800 tracking-wider">
                        0988 668 899
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('0988668899', 'groom')}
                        className="px-2.5 py-1 rounded-md bg-[#AC4558]/10 hover:bg-[#AC4558]/20 text-[#AC4558] text-xs font-medium inline-flex items-center gap-1 active:scale-95 transition"
                      >
                        {copiedGroom ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">
                              Đã chép
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= TAB CÔ DÂU ================= */
                <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
                  {/* Luxury QR Frame */}
                  <div className="relative p-3 rounded-2xl bg-white border-2 border-[#AC4558]/35 shadow-[0_6px_20px_rgba(172,69,88,0.15)] my-2">
                    {/* 4 Corner Ornaments */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#AC4558]" />
                    <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#AC4558]" />
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#AC4558]" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#AC4558]" />

                    {/* QR Image */}
                    <div className="relative w-[190px] h-[225px] sm:w-[210px] sm:h-[250px] overflow-hidden rounded-lg bg-white flex items-center justify-center">
                      <Image
                        src="/images/qr-co-dau.svg"
                        alt="Mã QR mừng cưới Cô dâu Nguyễn Thuý Hiền"
                        fill
                        sizes="210px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Bank Info Details */}
                  <div className="w-full mt-3 px-3 py-3 rounded-xl bg-white/80 border border-[#AC4558]/20 flex flex-col items-center gap-1">
                    <span className="text-[11.5px] uppercase tracking-wider text-stone-500 font-medium">
                      Ngân hàng Ngoại Thương (Vietcombank)
                    </span>
                    <span
                      className={`${playfair.className} text-[17px] sm:text-[18px] font-bold text-[#AC4558] tracking-wider`}
                    >
                      NGUYỄN THUÝ HIỀN
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[16px] sm:text-[17px] font-mono font-bold text-stone-800 tracking-wider">
                        0988 886 699
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('0988886699', 'bride')}
                        className="px-2.5 py-1 rounded-md bg-[#AC4558]/10 hover:bg-[#AC4558]/20 text-[#AC4558] text-xs font-medium inline-flex items-center gap-1 active:scale-95 transition"
                      >
                        {copiedBride ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">
                              Đã chép
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Thank you note */}
              <p
                className={`${playfair.className} text-[12.5px] sm:text-[13.5px] text-stone-500 italic font-medium mt-3 max-w-[320px]`}
              >
                Sự hiện diện và lời chúc phúc của Quý Khách là món quà ý nghĩa nhất
                đối với chúng tôi!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

