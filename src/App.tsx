import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { FlavorMatrix } from './components/FlavorMatrix.tsx';
import { Atmosphere } from './components/Atmosphere.tsx';
import { ReservationSection } from './components/ReservationSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { DigitalMenuPage } from './components/DigitalMenuPage.tsx';
import { ShopPage } from './components/ShopPage.tsx';
import { RoasteryPage } from './components/RoasteryPage.tsx';
import { ProductDetailDrawer } from './components/ProductDetailDrawer.tsx';
import { TableBookingModal } from './components/TableBookingModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { AmbianceController } from './components/AmbianceController.tsx';
import { CraftsmanshipModal } from './components/CraftsmanshipModal.tsx';
import { Footer } from './components/Footer.tsx';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toast } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1816] selection:bg-[#B57438]/20 selection:text-[#1A1816] relative">
      {/* Global Header */}
      <Navbar />

      {/* Main Routed View */}
      <main>
        {activeView === 'home' && (
          <>
            <Hero />
            <FlavorMatrix />
            <Atmosphere />
            <ReservationSection />
            <ReviewsSection />
            <LocationSection />
          </>
        )}

        {activeView === 'menu' && <DigitalMenuPage />}
        {activeView === 'shop' && <ShopPage />}
        {activeView === 'roastery' && <RoasteryPage />}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailDrawer />
      <TableBookingModal />
      <CartDrawer />
      <AmbianceController />
      <CraftsmanshipModal />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-white border border-[#B57438] text-xs font-bold text-[#1A1816] shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-4 h-4 text-[#B57438]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
