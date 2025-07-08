import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardTabs from '@/components/DashboardTabs';
import ImpactBoard from '@/components/ImpactBoard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-12 md:mb-20">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-foreground tracking-tight">
            Bridging Gaps, Nourishing Hope.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            GrainBridge connects global food surplus with regions in need.
            Explore live data, support shipments, and witness the impact of your contribution.
          </p>
        </section>

        <DashboardTabs />
        
        <ImpactBoard />

      </main>
      <Footer />
    </div>
  );
}
