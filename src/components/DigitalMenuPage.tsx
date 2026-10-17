import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowLeft, ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { COFFEE_MENU } from '../data/mockData.ts';
import { RoastLevel, ExtractionMethod } from '../types/index.ts';

export const DigitalMenuPage: React.FC = () => {
  const { setSelectedCoffee, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoasts, setSelectedRoasts] = useState<RoastLevel[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<ExtractionMethod[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(30);

  const roastOptions: RoastLevel[] = ['Light', 'Medium', 'Dark'];
  const methodOptions: ExtractionMethod[] = ['V60', 'Aeropress', 'Espresso', 'Cold Drip'];

  const toggleRoast = (r: RoastLevel) => {
    setSelectedRoasts((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const toggleMethod = (m: ExtractionMethod) => {
    setSelectedMethods((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const filteredCoffees = useMemo(() => {
    return COFFEE_MENU.filter((coffee) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        coffee.name.toLowerCase().includes(q) ||
        coffee.origin.toLowerCase().includes(q) ||
        coffee.flavorNotes.some((n) => n.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedRoasts.length > 0 && !selectedRoasts.includes(coffee.roastLevel)) {
        return false;
      }

      if (selectedMethods.length > 0 && !selectedMethods.includes(coffee.extractionMethod)) {
        return false;
      }

      if (coffee.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedRoasts, selectedMethods, maxPrice]);

  return (
    <div className="pt-24 pb-28 bg-[#FAF7F2] min-h-screen text-[#1A1816]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#B57438] hover:text-[#9E6028] transition-colors cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sanctuary Home</span>
          </button>

          <span className="text-xs text-[#7A736A]">
            {filteredCoffees.length} Curated Lots Available
          </span>
        </div>

        {/* Header Banner */}
        <div className="rounded-[20px] bg-gradient-to-r from-white via-[#F3ECE2] to-white border border-[#EBE4DA] p-8 sm:p-12 mb-12 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs uppercase tracking-[0.22em] font-sans font-bold text-[#B57438]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
              <span>Full Digital Menu & Coffee Specs</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816] mb-4">
              The Coffee Selection
            </h1>
            <p className="text-sm text-[#68625B] mb-6 leading-relaxed">
              Explore scientific extraction metrics, altitude MASL, cupping scores, and processing methods for each single-origin micro-lot.
            </p>

            {/* Search Input with instant live filter */}
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B57438]" />
              <input
                type="text"
                placeholder="Search by lot name, notes (jasmine, cocoa, peach...), origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[52px] pl-12 pr-4 rounded-full bg-white border border-[#EBE4DA] text-[#1A1816] placeholder-[#7A736A] focus:border-[#B57438] focus:outline-none text-sm transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#B57438] hover:underline"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Two-Column Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Sticky Filter Sidebar, Width: 280px / lg:col-span-4) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 rounded-[16px] bg-white border border-[#EBE4DA] p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE4DA]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#B57438] uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter Specs</span>
              </div>
              {(selectedRoasts.length > 0 || selectedMethods.length > 0 || maxPrice < 30) && (
                <button
                  onClick={() => {
                    setSelectedRoasts([]);
                    setSelectedMethods([]);
                    setMaxPrice(30);
                  }}
                  className="text-[11px] text-[#B57438] hover:underline cursor-pointer font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Roast Level Filter */}
            <div>
              <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2.5">
                Roast Level
              </label>
              <div className="flex flex-wrap gap-2">
                {roastOptions.map((roast) => {
                  const active = selectedRoasts.includes(roast);
                  return (
                    <button
                      key={roast}
                      onClick={() => toggleRoast(roast)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        active
                          ? 'bg-[#B57438] text-white font-bold shadow-sm'
                          : 'bg-[#FAF7F2] text-[#4A453F] border border-[#EBE4DA] hover:border-[#B57438]'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{roast}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extraction Method Filter */}
            <div>
              <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2.5">
                Extraction Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                {methodOptions.map((method) => {
                  const active = selectedMethods.includes(method);
                  return (
                    <button
                      key={method}
                      onClick={() => toggleMethod(method)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
                        active
                          ? 'bg-[#B57438] text-white font-bold shadow-sm'
                          : 'bg-[#FAF7F2] text-[#4A453F] border border-[#EBE4DA] hover:border-[#B57438]'
                      }`}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-[#1A1816]">Max Price Limit</span>
                <span className="text-[#B57438] font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#B57438] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#7A736A] mt-1 font-medium">
                <span>$10</span>
                <span>$20</span>
                <span>$30</span>
              </div>
            </div>
          </aside>

          {/* Right Column (Grid Layout): Detailed Coffee Cards */}
          <div className="lg:col-span-8 space-y-6">
            {filteredCoffees.length === 0 ? (
              <div className="p-12 text-center rounded-[16px] bg-white border border-[#EBE4DA] shadow-sm">
                <p className="text-[#68625B] text-sm mb-4">
                  No coffees match your specified filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRoasts([]);
                    setSelectedMethods([]);
                    setMaxPrice(30);
                  }}
                  className="px-5 py-2 rounded-full bg-[#B57438] text-white text-xs font-bold"
                >
                  Show All Coffees
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCoffees.map((coffee) => (
                  <div
                    key={coffee.id}
                    className="rounded-[14px] bg-white border border-[#EBE4DA] overflow-hidden flex flex-col justify-between caramel-glow-hover group shadow-sm hover:shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#F3ECE2]">
                      <img
                        src={coffee.image}
                        alt={coffee.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] uppercase font-bold text-[#B57438] shadow-sm">
                        {coffee.cuppingScore} Q Score
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] text-[#1A1816] font-semibold shadow-sm">
                        {coffee.extractionMethod}
                      </div>

                      <div className="absolute bottom-3 left-3 font-serif text-xl font-bold text-white">
                        ${coffee.price}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#B57438] font-bold mb-1">
                          {coffee.origin}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-3 group-hover:text-[#B57438] transition-colors">
                          {coffee.name}
                        </h3>

                        {/* Specs Grid: Altitude (MASL), Processing, Cupping Score */}
                        <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF7F2] p-3 rounded-lg border border-[#EBE4DA] mb-4">
                          <div>
                            <span className="text-[10px] uppercase text-[#7A736A] block font-medium">Altitude</span>
                            <span className="font-semibold text-[#1A1816]">{coffee.altitude}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#7A736A] block font-medium">Processing</span>
                            <span className="font-semibold text-[#1A1816] line-clamp-1">
                              {coffee.processing}
                            </span>
                          </div>
                        </div>

                        {/* Flavor notes */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {coffee.flavorNotes.map((note, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[10px] text-[#68625B] border border-[#EBE4DA]"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCoffee(coffee)}
                        className="w-full py-2.5 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#B57438] text-[#B57438] hover:text-white border border-[#EBE4DA] hover:border-[#B57438] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View Sensory Radar Chart & Story</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
