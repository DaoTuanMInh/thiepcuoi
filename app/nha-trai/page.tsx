import { Metadata } from 'next';
import WeddingExperience from '@/components/WeddingExperience';

export const metadata: Metadata = {
  title: 'Thiệp Cưới Nhà Trai - Phạm Xuân Tùng & Nguyễn Thuý Hiền',
  description:
    'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Xuân Tùng & Thuý Hiền tại Huy Hoàng Palace lúc 16:30, Chủ Nhật 29.11.2026',
  openGraph: {
    title: 'Thiệp Cưới Nhà Trai - Phạm Xuân Tùng & Nguyễn Thuý Hiền',
    description:
      'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Xuân Tùng & Thuý Hiền tại Huy Hoàng Palace',
    images: ['/images/slide1-hero.jpg'],
  },
};

export default function NhaTraiPage() {
  return <WeddingExperience side="nha-trai" />;
}
