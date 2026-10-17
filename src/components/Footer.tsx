import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const Footer: React.FC = () => {
  const { setActiveView, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to Rare Lot Allocation alerts', 'gold');
    setEmail('');
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EBE4DA] text-[#1A1816] pt-16 pb-12 relative overflow-hidden">
      {/* Background warm orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#E8A86B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EBE4DA]">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F3ECE2] flex items-center justify-center border border-[#E0D5C7]">
                <svg viewBox="0 0 40 40" className="w-5 h-5 text-[#B57438] fill-current">
                  <path d="M20 2C10.059 2 2 10.059 2 20s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2zm1 33.95c-7.238-.52-13.03-6.312-13.55-13.55 1.5.8 3.5 1.4 5.5 1.2 3.5-.4 6-2.5 8-5.5 1.8-2.7 4-4.5 7.5-4.5.8 0 1.6.1 2.3.4-.6 9.8-8.1 21.4-9.75 21.95zM22.5 5.5c6.5.6 11.8 5.6 12.8 11.9-1.2-.6-2.6-.9-4.3-.9-3.4 0-5.8 1.9-7.8 4.7-2 2.8-4.5 5-8.2 5.3-.8.1-1.6 0-2.3-.2C14 17.5 20.8 6.2 22.5 5.5z" />
                </svg>
              </div>
              <span className="font-serif tracking-[0.2em] text-2xl font-bold text-[#1A1816]">
                NOIR
              </span>
            </div>
            
            <p className="text-xs text-[#68625B] max-w-sm leading-relaxed font-sans">
              Artisanal roastery and modern coffee lounge engineered for discerning palates. Rare single-origin heirlooms, sunlit architectural tranquility, and precision extraction.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] text-[#B57438] flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Specialty Coffee Association (SCA) Premier Partner</span>
              </span>
            </div>
          </div>

          {/* Quick Sub-page Nav */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-[#B57438] uppercase tracking-widest mb-3">
              Sanctuary Navigation
            </div>
            <ul className="space-y-2.5 text-xs text-[#4A453F] font-sans font-medium">
              <li>
                <button
                  onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#B57438] transition-colors cursor-pointer"
                >
                  The Sanctuary (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#B57438] transition-colors cursor-pointer"
                >
                  Digital Menu & Coffee Specs (/menu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#B57438] transition-colors cursor-pointer"
                >
                  Artisan Beans & Merch (/shop)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('roastery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#B57438] transition-colors cursor-pointer"
                >
                  Roastery & Sourcing Map (/roastery)
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Allocations */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-[#B57438] uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
              <span>Private Micro-Lot Allocations</span>
            </div>
            <p className="text-xs text-[#68625B] leading-relaxed font-sans">
              Receive notifications for fresh 50-bag micro-lot roasts, Panama Geisha harvests, and private cupping events.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                required
                placeholder="connoisseur@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-[42px] px-4 rounded-full bg-white border border-[#EBE4DA] text-xs text-[#1A1816] placeholder-[#7A736A] focus:border-[#B57438] focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="h-[42px] px-5 rounded-full bg-[#B57438] text-white text-xs font-bold hover:bg-[#9E6028] transition-all cursor-pointer flex items-center justify-center shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A736A] gap-4">
          <div>
            © {new Date().getFullYear()} NOIR Specialty Coffee Roastery & Lounge. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6 font-medium">
            <span>Modern Sanctuary Edition</span>
            <span>Crafted for Peak Flavor & Architectural Elegance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
