import clientPromise from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { Metadata } from 'next';
import { Great_Vibes, Cormorant_Garamond, Cormorant_Infant, Marcellus, Montserrat, Imperial_Script } from 'next/font/google';
import { MapPin, Calendar, Heart, Clock } from 'lucide-react';
import Image from 'next/image';
import Countdown from '@/components/Countdown';
import Slide2Envelope from '@/components/Slide2Envelope';
import BannerPhotoSection from '@/components/BannerPhotoSection';
import Slide3Invitation from '@/components/Slide3Invitation';
import Slide4Timeline from '@/components/Slide4Timeline';
import Slide5LoveStory from '@/components/Slide5LoveStory';
import GoldenHourGallery from '@/components/GoldenHourGallery';
import ThankYouSection from '@/components/ThankYouSection';

export const instant = false;

// Fonts configuration
const imperialScript = Imperial_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
  variable: '--font-imperial-script',
});
const greatVibes = Great_Vibes({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-vibes' 
});
const cormorant = Cormorant_Garamond({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ['latin', 'vietnamese'], 
  variable: '--font-cormorant' 
});
const cormorantInfant = Cormorant_Infant({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ['latin', 'vietnamese'], 
  variable: '--font-cormorant-infant' 
});
const marcellus = Marcellus({ 
  weight: '400', 
  subsets: ['latin', 'latin-ext'], 
  variable: '--font-marcellus' 
});
const montserrat = Montserrat({ 
  weight: ['300', '400', '500'], 
  subsets: ['latin', 'vietnamese'], 
  variable: '--font-montserrat' 
});

type Props = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const resolvedParams = await params;
  const token = resolvedParams.token;
  const client = await clientPromise;
  const db = client.db('wedding_db');
  
  const guest = await db.collection('guests').findOne({ token });
  
  if (!guest) {
    return { title: 'Không tìm thấy thiệp' };
  }
  
  return {
    title: `Thiệp mời đám cưới - Kính mời ${guest.name}`,
    description: `Trân trọng kính mời ${guest.name} đến dự lễ thành hôn của chúng tôi`,
  };
}

export default async function InvitationPage({ params }: Props) {
  await connection();
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  const client = await clientPromise;
  const db = client.db('wedding_db');
  
  const guest = await db.collection('guests').findOne({ token });
  
  if (!guest) {
    notFound();
  }

  // Common styles
  const sectionClass = "py-20 px-4 flex flex-col items-center justify-center text-center relative";
  const titleClass = `${greatVibes.className} text-4xl md:text-6xl text-[#928362] mb-6`;
  const textClass = `${cormorant.className} text-gray-700 text-lg md:text-xl`;

  return (
    <div className={`${cormorant.variable} ${cormorantInfant.variable} ${marcellus.variable} ${greatVibes.variable} ${montserrat.variable} ${imperialScript.variable} bg-[#FAF9F6] text-gray-800 font-serif min-h-screen max-w-[500px] w-full mx-auto shadow-2xl relative`}>
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100svh] max-h-[850px] flex flex-col items-center justify-end overflow-hidden pb-14">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Couple" 
            fill 
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover w-full h-full"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent h-[120%] -bottom-[20%]"></div>
        </div>
        
        <div className="relative z-10 text-white text-center w-full px-4 flex flex-col items-center select-none">
          {/* Kiểu chữ 1: Tên cô dâu chú rể "Linh & Nga" với font Imperial Script đồng bộ Slide 2 */}
          <h1 
            className={`animate-hero-1 ${imperialScript.className} text-[68px] sm:text-[76px] leading-[0.92] tracking-[0.01em] text-white whitespace-nowrap`}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}
          >
            Linh <span className="mx-1 text-[52px] sm:text-[58px] align-baseline">&amp;</span> Nga
          </h1>
          
          {/* Kiểu chữ 2: SAVE THE DATE - Chữ in hoa nhỏ gọn, thanh mảnh đúng tỉ lệ ảnh */}
          <p 
            className={`animate-hero-2 ${marcellus.className} text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-white/95 mt-[14px] mb-[11px]`}
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
          >
            SAVE THE DATE
          </p>
          
          {/* Kiểu số: 21.12.2025 - Cormorant Infant đúng từng nét số 2, 1, 0, 5 và kích cỡ như ảnh */}
          <p 
            className={`animate-hero-3 ${cormorantInfant.className} text-[31px] sm:text-[34px] font-semibold leading-none tracking-[0.02em] text-white`}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            21.12.2025
          </p>
        </div>
      </section>

      {/* 2. INVITATION CARD SECTION (Slide 2: Realistic Envelope with sliding letter & gliding polaroid) */}
      <Slide2Envelope 
        guestName={guest.name} 
        targetDate="2025-12-21T09:00:00" 
      />

      {/* 3. BANNER PHOTO TRÊN SLIDE SỐ 3 (This day / OUR HEARTS BECOME ONE) */}
      <BannerPhotoSection />

      {/* 4. SLIDE SỐ 3 (Ngay dưới cái ảnh) - Nền slide3-bg-v2.jpg (463x1024) hiển thị trọn vẹn cả hoa văn đầu & cuối */}
      <Slide3Invitation />

      {/* 5. SLIDE 4 (Ngay dưới Slide 3): Timeline & Dress Code */}
      <Slide4Timeline />

      {/* 6. SLIDE 5: Love Story, Monogram LN & Cô dâu / Chú rể Polaroids */}
      <Slide5LoveStory />

      {/* 7. MOMENTS OF LOVE / GOLDEN HOUR OF LOVE (Gallery) */}
      <GoldenHourGallery />





      {/* 8. SLIDE CUỐI: THANK YOU & LỜI CẢM ƠN */}
      <ThankYouSection />
      
    </div>
  );
}
