import React from 'react';
import { Play, Sparkles, ArrowDown } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const Hero: React.FC = () => {
  const { setIsBookingModalOpen, setIsCraftsmanshipOpen, setActiveView } = useApp();

  const handleScrollToMenu = () => {
    const el = document.getElementById('flavor-matrix');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('menu');
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] lg:h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2] pt-[84px] sm:pt-[100px] pb-12 sm:pb-16">
      {/* Background: Sunlit Airy Coffee Loop Video + Soft Warm Light Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.88] contrast-[1.02] saturate-[0.95]"
          poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-41584-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft, Fresh, Modern Light Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/55 to-[#FAF7F2]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[#FAF7F2]/30 backdrop-blur-[2px] pointer-events-none" />

        {/* Gentle Ambient Warm Sunlight Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] bg-[#E8A86B]/20 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#B57438]/15 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />
      </div>

      {/* Content Container (Mobile-First, fully spaced with no navbar overlap) */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Editorial Overline: Modern Architectural Kicker (Replaces generic AI pill badge) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 text-[11px] sm:text-[12px] uppercase tracking-[0.26em] font-sans font-bold text-[#945B25]">
          <span className="h-px w-6 sm:w-8 bg-[#B57438]/40" />
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
            <span>Artisanal Roastery &bull; Modern Sanctuary</span>
          </span>
          <span className="h-px w-6 sm:w-8 bg-[#B57438]/40" />
        </div>

        {/* Headline (H1): Playfair Display, mobile: 32px-36px, desktop: 56px-64px */}
        <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[54px] lg:text-[64px] font-bold text-[#1A1816] leading-[1.15] max-w-4xl tracking-tight mb-4 sm:mb-6">
          Elevating Specialty Coffee to <br className="hidden sm:inline" />
          <span className="caramel-text-gradient italic font-normal">an Art Form</span>
        </h1>

        {/* Sub-headline description */}
        <p className="font-sans text-[14px] sm:text-[16px] md:text-[18px] text-[#4A453F] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal px-2">
          A sun-drenched architectural sanctuary for rare single-origin coffees, century-old heirloom cultivars, and bespoke slow-extraction towers in an airy modern setting.
        </p>

        {/* CTA Group: Mobile full-width, desktop row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
          {/* Primary CTA: Warm Caramel Fill */}
          <button
            onClick={handleScrollToMenu}
            className="w-full sm:w-auto sm:min-w-[200px] h-[48px] sm:h-[52px] px-7 sm:px-8 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-semibold text-[13px] sm:text-[14px] uppercase tracking-wider caramel-glow-hover flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#B57438]/25"
          >
            <span>Explore Blends</span>
            <span className="text-base sm:text-lg">→</span>
          </button>

          {/* Secondary CTA: Soft Frosted Ceramic Glass */}
          <button
            onClick={() => setIsCraftsmanshipOpen(true)}
            className="w-full sm:w-auto sm:min-w-[210px] h-[48px] sm:h-[52px] px-6 sm:px-7 rounded-full bg-white/95 hover:bg-white border border-[#EBE4DA] hover:border-[#B57438] text-[#1A1816] text-[13px] sm:text-[14px] font-medium tracking-wide flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 cursor-pointer shadow-sm group"
          >
            <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-[#F3ECE2] border border-[#EBE4DA] flex items-center justify-center group-hover:bg-[#B57438] group-hover:text-white text-[#B57438] transition-all flex-shrink-0">
              <Play className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-current ml-0.5" />
            </div>
            <span>Watch Craftsmanship</span>
          </button>
        </div>

        {/* Luxury Specs Strip (2 columns on mobile, 4 columns on desktop) */}
        <div className="mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-[#EBE4DA] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 max-w-4xl w-full">
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#EBE4DA] backdrop-blur-sm shadow-sm">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#B57438]">94.2 Q</div>
            <div className="text-[10px] sm:text-[12px] uppercase tracking-wider text-[#7A736A] mt-0.5 sm:mt-1 font-sans font-medium">
              Peak Cupping Score
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#EBE4DA] backdrop-blur-sm shadow-sm">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#B57438]">18 Hours</div>
            <div className="text-[10px] sm:text-[12px] uppercase tracking-wider text-[#7A736A] mt-0.5 sm:mt-1 font-sans font-medium">
              Kyoto Slow Drip
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#EBE4DA] backdrop-blur-sm shadow-sm">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#B57438]">2,300m</div>
            <div className="text-[10px] sm:text-[12px] uppercase tracking-wider text-[#7A736A] mt-0.5 sm:mt-1 font-sans font-medium">
              Altitude MASL
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#EBE4DA] backdrop-blur-sm shadow-sm">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#4E6E56]">100% Direct</div>
            <div className="text-[10px] sm:text-[12px] uppercase tracking-wider text-[#7A736A] mt-0.5 sm:mt-1 font-sans font-medium">
              Fair Trade
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        onClick={handleScrollToMenu}
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center text-[#7A736A] hover:text-[#B57438] transition-colors cursor-pointer group"
        aria-label="Scroll to menu"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] mb-1 group-hover:tracking-[0.3em] transition-all font-medium">
          Scroll Down
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#B57438]" />
      </button>
    </section>
  );
};
