import { Metadata } from 'next';
import WeddingExperience from '@/components/WeddingExperience';

export const metadata: Metadata = {
  title: 'Thiệp Cưới Nhà Gái - Nguyễn Thuý Hiền & Phạm Xuân Tùng',
  description:
    'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Thuý Hiền & Xuân Tùng tại Nhà văn hoá Khu Yên Lãng 2 lúc 9:30, Chủ Nhật 29.11.2026',
  openGraph: {
    title: 'Thiệp Cưới Nhà Gái - Nguyễn Thuý Hiền & Phạm Xuân Tùng',
    description:
      'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Thuý Hiền & Xuân Tùng tại Nhà văn hoá Khu Yên Lãng 2 lúc 9:30, Chủ Nhật 29.11.2026',
    type: 'website',
    locale: 'vi_VN',
    images: [
      {
        url: '/images/og-wedding-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Thiệp Cưới Thuý Hiền & Xuân Tùng - Nhà Gái',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp Cưới Nhà Gái - Nguyễn Thuý Hiền & Phạm Xuân Tùng',
    description:
      'Trân trọng kính mời Quý khách đến dự Lễ Thành Hôn của Thuý Hiền & Xuân Tùng tại Nhà văn hoá Khu Yên Lãng 2 lúc 9:30, Chủ Nhật 29.11.2026',
    images: ['/images/og-wedding-cover.jpg'],
  },
};

export default function NhaGaiPage() {
  return <WeddingExperience side="nha-gai" />;
}
