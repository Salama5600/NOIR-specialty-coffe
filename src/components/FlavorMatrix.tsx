import React, { useState } from 'react';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { COFFEE_MENU } from '../data/mockData.ts';
import { Category } from '../types/index.ts';

export const FlavorMatrix: React.FC = () => {
  const { setSelectedCoffee, setActiveView } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: { key: Category; label: string }[] = [
    { key: 'All', label: 'All Lots' },
    { key: 'Fruity/Floral', label: 'Fruity & Floral' },
    { key: 'Nutty/Chocolate', label: 'Nutty & Chocolate' },
    { key: 'Cold Drips', label: 'Cold Drips' },
    { key: 'Signature Drinks', label: 'Signature Crafts' }
  ];

  const filteredItems = activeCategory === 'All'
    ? COFFEE_MENU
    : COFFEE_MENU.filter((item) => item.category === activeCategory);

  return (
    <section
      id="flavor-matrix"
      className="scroll-mt-[72px] sm:scroll-mt-[85px] py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] relative overflow-hidden"
    >
      {/* Background soft ambient orbs */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#E8A86B]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#4E6E56]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B57438]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
            <span>Interactive Flavor Matrix & Terroir</span>
          </div>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[38px] font-bold text-[#1A1816] leading-[1.25] mb-2 sm:mb-4 px-2">
            Curated Specialty Lots & Sensory Profiles
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] text-[#68625B] leading-relaxed px-2">
            Harvested from peak volcanic micro-climates and extracted to SCA gold standards to highlight pure terroir clarity.
          </p>
        </div>

        {/* Filter Bar: Horizontal Tabs (Touch-friendly & Responsive) */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-3 mb-8 sm:mb-14 gap-2 sm:gap-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] font-sans font-medium whitespace-nowrap transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#B57438] text-white font-semibold shadow-md shadow-[#B57438]/20'
                    : 'bg-white text-[#4A453F] border border-[#EBE4DA] hover:border-[#B57438] hover:text-[#B57438] shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid Layout (Responsive on mobile 1-col, tablet 2-col, desktop 3-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 justify-items-center">
          {filteredItems.map((coffee) => (
            <div
              key={coffee.id}
              className="w-full max-w-[360px] min-h-[440px] sm:h-[460px] rounded-[14px] bg-white border border-[#EBE4DA] overflow-hidden flex flex-col justify-between caramel-glow-hover group relative shadow-sm hover:shadow-md transition-all"
            >
              {/* Top Image: responsive height on mobile */}
              <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden bg-[#F3ECE2] flex-shrink-0">
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Extraction badge */}
                <div className="absolute top-3 left-3 px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#EBE4DA] text-[10px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider shadow-sm">
                  {coffee.extractionMethod}
                </div>

                {/* Cupping Score */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#B57438] text-white text-[10px] sm:text-[11px] font-bold shadow-sm">
                  {coffee.cuppingScore} Q
                </div>

                {/* Quick View Trigger on Hover & Mobile accessible */}
                <button
                  onClick={() => setSelectedCoffee(coffee)}
                  className="absolute inset-0 m-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#B57438] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl cursor-pointer hover:bg-[#B57438] hover:text-white"
                  title="Quick View Details"
                  aria-label="Quick View"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {/* Card Internal Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Origin Tag & Price */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[#B57438] font-sans font-bold">
                      {coffee.origin}
                    </span>
                    <span className="font-serif text-[18px] sm:text-[20px] font-bold text-[#1A1816]">
                      ${coffee.price}
                    </span>
                  </div>

                  {/* Title (H3) */}
                  <h3 className="font-sans font-bold text-[17px] sm:text-[18px] text-[#1A1816] leading-snug line-clamp-1 group-hover:text-[#B57438] transition-colors mb-2.5">
                    {coffee.name}
                  </h3>

                  {/* Flavor Notes pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {coffee.flavorNotes.slice(0, 3).map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EBE4DA] text-[10.5px] sm:text-[11px] text-[#68625B] font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Trigger button */}
                <button
                  onClick={() => setSelectedCoffee(coffee)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#EBE4DA] hover:border-[#B57438] bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[12px] font-semibold text-[#1A1816] hover:text-[#B57438] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>View Radar Profile & Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Digital Menu Link */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={() => {
              setActiveView('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#B57438] text-[#B57438] hover:bg-[#B57438] hover:text-white font-semibold text-[12px] sm:text-[13px] uppercase tracking-wider transition-all duration-300 caramel-glow-hover cursor-pointer shadow-sm"
          >
            <span>Explore Full Digital Menu & Coffee Specs</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
