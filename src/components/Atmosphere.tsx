import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Info, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { ATMOSPHERE_ZONES } from '../data/mockData.ts';

export const Atmosphere: React.FC = () => {
  const { setIsBookingModalOpen, setActiveZonePreselect } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<{ zoneId: string; index: number } | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleBookZone = (zoneId: string) => {
    const mapped = zoneId === 'brew-bar' ? 'indoor' : zoneId === 'vip-lounge' ? 'vip' : 'terrace';
    setActiveZonePreselect(mapped);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="atmosphere" className="scroll-mt-[72px] sm:scroll-mt-[85px] py-14 sm:py-20 lg:py-24 bg-[#F5EFE6] border-t border-[#EBE4DA] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B57438]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
            <span>Atmosphere & Modern Architecture</span>
          </div>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[38px] font-bold text-[#1A1816] leading-[1.25]">
            The Atmosphere & Lounge Experience
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] text-[#68625B] mt-2 max-w-xl">
            Four bespoke architectural zones designed with sunlit natural oak, travertine stone, and interactive 3D sensory hotspots.
          </p>
        </div>

        {/* Scroll Nav Controls */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#EBE4DA] bg-white text-[#1A1816] hover:border-[#B57438] hover:text-[#B57438] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#EBE4DA] bg-white text-[#1A1816] hover:border-[#B57438] hover:text-[#B57438] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Showcase (Responsive heights) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-2 scroll-smooth cursor-grab active:cursor-grabbing scrollbar-none h-[460px] sm:h-[540px]"
      >
        {ATMOSPHERE_ZONES.map((zone) => (
          <div
            key={zone.id}
            className="relative flex-shrink-0 w-[84vw] sm:w-[480px] lg:w-[600px] h-[430px] sm:h-[500px] rounded-[16px] sm:rounded-[18px] overflow-hidden border border-[#EBE4DA] bg-white group shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Background Image */}
            <img
              src={zone.image}
              alt={zone.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/95 via-[#1A1816]/40 to-black/10" />

            {/* Architectural Tag */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#EBE4DA] text-[#1A1816] text-[10px] sm:text-[11px] font-sans font-bold tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
              <span>{zone.badge}</span>
            </div>

            {/* Interactive Hotspots */}
            {zone.hotspots.map((spot, idx) => {
              const isSpotActive =
                activeHotspot?.zoneId === zone.id && activeHotspot?.index === idx;

              return (
                <div
                  key={idx}
                  className="absolute z-20 group/spot"
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                >
                  <button
                    onClick={() =>
                      setActiveHotspot(isSpotActive ? null : { zoneId: zone.id, index: idx })
                    }
                    className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B57438] text-white flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(181,116,56,0.6)] transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
                    aria-label={spot.title}
                  >
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 font-bold" />
                    <span className="absolute inset-0 rounded-full bg-[#B57438] animate-ping opacity-70" />
                  </button>

                  {/* Hotspot Popover Tooltip */}
                  {isSpotActive && (
                    <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-56 sm:w-64 p-3 sm:p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[#B57438]/40 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-200">
                      <div className="text-[11px] sm:text-xs font-bold text-[#B57438] mb-1 font-serif">
                        {spot.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#4A453F] font-sans leading-relaxed">
                        {spot.desc}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Content & Booking Link */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-10 text-white">
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 group-hover:text-[#F3ECE2] transition-colors">
                {zone.name}
              </h3>
              <p className="font-sans text-[12px] sm:text-[14px] text-white/80 line-clamp-2 mb-3 sm:mb-4 leading-relaxed max-w-lg">
                {zone.description}
              </p>

              <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-white/20">
                <button
                  onClick={() => handleBookZone(zone.id)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-sans font-semibold text-[#F7EFE6] hover:text-[#B57438] transition-colors cursor-pointer group/link"
                >
                  <span>View Details & Table Availability</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-[#B57438]" />
                </button>

                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/60 font-medium">
                  Reserved Seating
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
