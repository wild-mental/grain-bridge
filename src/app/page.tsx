"use client";

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ValueSection from '@/components/ValueSection';
import HowItWorks from '@/components/HowItWorks';
import NeedSection from '@/components/NeedSection';
import DashboardTabs from '@/components/DashboardTabs';
import MatchMaker from '@/components/MatchMaker';
import ImpactBoard from '@/components/ImpactBoard';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/i18n/LanguageProvider';
import kwinanaTerminal from '../../public/images/kwinana-grain-terminal.webp';

/**
 * Section rhythm (full-bleed backgrounds, content in a container):
 * hero photo → value (white) → how it works (muted) → need (photo strip + white)
 * → dashboard (muted) → match (photo band + white card) → impact (dark primary) → footer.
 */
export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ValueSection />
        <HowItWorks />
        <NeedSection />
        <DashboardTabs />

        <section id="match-and-donate" aria-labelledby="match-title" className="relative isolate scroll-mt-24 bg-background pb-16 md:pb-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-[380px] overflow-hidden md:h-[440px]">
            <Image
              src={kwinanaTerminal}
              alt={t.match.bandAlt}
              fill
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-overlay/85 via-overlay/70 to-overlay/80" aria-hidden="true" />
          </div>
          <div className="container px-4 pt-16 sm:px-8 md:pt-24">
            <SectionHeading id="match-title" tone="dark" eyebrow={t.match.eyebrow} title={t.match.title} body={t.match.body} />
            <Reveal className="mt-10 md:mt-12">
              <MatchMaker />
            </Reveal>
          </div>
        </section>

        <ImpactBoard />
      </main>
      <Footer />
    </div>
  );
}
