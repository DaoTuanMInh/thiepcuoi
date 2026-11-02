import { Metadata } from 'next';
import WeddingExperience from '@/components/WeddingExperience';

export const metadata: Metadata = {
  title: 'Thiệp Cưới Nhà Gái - Nguyễn Thuý Hiền & Phạm Xuân Tùng',
  description:
    'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Thuý Hiền & Xuân Tùng tại Nhà văn hoá Khu Yên Lãng 2 lúc 9:00, Chủ Nhật 29.11.2026',
  openGraph: {
    title: 'Thiệp Cưới Nhà Gái - Nguyễn Thuý Hiền & Phạm Xuân Tùng',
    description:
      'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Thuý Hiền & Xuân Tùng tại Nhà văn hoá Khu Yên Lãng 2',
    images: ['/images/slide1-hero.jpg'],
  },
};

export default function Home() {
  return <WeddingExperience side="nha-gai" />;
}
