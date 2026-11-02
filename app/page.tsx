import { Metadata } from 'next';
import Slide1Hero from '@/components/Slide1Hero';
import Slide2Countdown from '@/components/Slide2Countdown';
import Slide3Invitation from '@/components/Slide3Invitation';
import Slide4Album from '@/components/Slide4Album';
import Slide5RSVP from '@/components/Slide5RSVP';
import Slide6ThankYou from '@/components/Slide6ThankYou';
import WaxSealGate from '@/components/WaxSealGate';
import AutoScrollController from '@/components/AutoScrollController';

export const metadata: Metadata = {
  title: 'Thiệp cưới Xuân Tùng & Thuý Hiền',
  description: 'Trân trọng kính mời Quý khách đến dự lễ thành hôn của Xuân Tùng & Thuý Hiền',
};

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center">
      <WaxSealGate />
      <AutoScrollController />
      <div className="w-full max-w-[430px] sm:max-w-[450px] mx-auto bg-[#FFFAF4] flex flex-col items-center">
        <Slide1Hero />
        <Slide2Countdown />
        <Slide3Invitation />
        <Slide4Album />
        <Slide5RSVP />
        <Slide6ThankYou />
      </div>
    </main>
  );
}
