import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Car, Phone, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const LocationSection: React.FC = () => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const address = 'Avenue Montaigne Luxury District, Obsidian Pavilion 01, London & Dubai';

  const copyAddress = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    showToast('Address copied to clipboard', 'gold');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="scroll-mt-[72px] sm:scroll-mt-[85px] py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#EBE4DA] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B57438]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
            <span>Access & Concierge Location</span>
          </div>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[38px] font-bold text-[#1A1816] leading-[1.25] mb-2 sm:mb-3 px-2">
            An Exclusive Modern Sanctuary
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] text-[#68625B] px-2">
            Effortless arrival with complimentary white-glove valet and private lounge entrance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map Simulation */}
          <div className="lg:col-span-7 rounded-[18px] overflow-hidden border border-[#EBE4DA] bg-white relative min-h-[420px] flex flex-col justify-between shadow-md">
            
            {/* Architectural Stylized Light Map */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#F5EFE6] overflow-hidden">
              
              {/* Grid Roads and Blocks pattern */}
              <svg className="w-full h-full opacity-70" viewBox="0 0 600 400" preserveAspectRatio="none">
                <defs>
                  <pattern id="lightCityGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <rect width="56" height="56" fill="#FFFFFF" rx="4" />
                    <line x1="0" y1="60" x2="60" y2="60" stroke="#EBE4DA" strokeWidth="4" />
                    <line x1="60" y1="0" x2="60" y2="60" stroke="#EBE4DA" strokeWidth="4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#lightCityGrid)" />

                {/* Major Boulevard line */}
                <path d="M 0 200 Q 300 180 600 240" stroke="#DDD5CA" strokeWidth="16" fill="none" />
                <path d="M 300 0 L 300 400" stroke="#DDD5CA" strokeWidth="12" fill="none" />
                <path d="M 120 0 L 120 400" stroke="#E6DFD4" strokeWidth="8" fill="none" />
                <path d="M 480 0 L 480 400" stroke="#E6DFD4" strokeWidth="8" fill="none" />
                
                {/* Accent Boulevard line */}
                <path d="M 0 200 Q 300 180 600 240" stroke="#B57438" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.8" />
              </svg>

              {/* Pinpoint Location Marker */}
              <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#B57438] border-2 border-white flex items-center justify-center text-white shadow-lg shadow-[#B57438]/40 animate-pulse">
                    <MapPin className="w-6 h-6 fill-current" />
                  </div>
                  <span className="absolute -inset-2 rounded-full border border-[#B57438]/50 animate-ping" />
                </div>
                
                {/* Popover Callout */}
                <div className="mt-2 px-4 py-2 rounded-xl bg-white border border-[#EBE4DA] text-center shadow-lg">
                  <div className="text-xs font-serif font-bold text-[#1A1816]">NOIR SPECIALTY COFFEE</div>
                  <div className="text-[10px] text-[#7A736A] font-sans">Modern Roastery & Lounge • Level Ground</div>
                </div>
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                <span className="text-[11px] px-3.5 py-1.5 rounded-full bg-white/95 text-[#4A453F] border border-[#EBE4DA] shadow-sm font-mono">
                  GPS: 51.5074° N, 0.1278° W
                </span>

                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="px-4 py-2 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bottom Bar in Card */}
            <div className="p-4 bg-white border-t border-[#EBE4DA] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#4A453F]">
                <Car className="w-4 h-4 text-[#B57438]" />
                <span>Complimentary VIP Valet Parking upon arrival</span>
              </div>
              <button
                onClick={copyAddress}
                className="flex items-center gap-1 text-xs text-[#B57438] hover:underline cursor-pointer font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Address'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Concierge Details & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Opening Hours Card */}
            <div className="p-6 rounded-[18px] bg-white border border-[#EBE4DA] flex items-start gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-[#F3ECE2] text-[#B57438]">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-1">
                  Hours of Hospitality
                </h3>
                <div className="space-y-1.5 text-xs text-[#68625B] mt-2 font-sans">
                  <div className="flex justify-between border-b border-[#FAF7F2] pb-1">
                    <span>Monday — Thursday:</span>
                    <span className="font-bold text-[#1A1816]">08:00 AM — 10:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-[#FAF7F2] py-1">
                    <span>Friday — Saturday:</span>
                    <span className="font-bold text-[#B57438]">08:00 AM — 11:30 PM</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Sunday (Artisan Cupping Flights):</span>
                    <span className="font-bold text-[#1A1816]">09:00 AM — 09:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Concierge Contact Card */}
            <div className="p-6 rounded-[18px] bg-white border border-[#EBE4DA] flex items-start gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-[#F3ECE2] text-[#B57438]">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-1">
                  Concierge & Private Inquiries
                </h3>
                <div className="space-y-2 text-xs text-[#68625B] mt-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B57438]" />
                    <span className="font-medium text-[#1A1816]">+44 (20) 7946 0912 / +1 (800) 942-NOIR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#B57438]" />
                    <span className="text-[#1A1816]">concierge@noirspecialty.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dress code & etiquette notice */}
            <div className="p-6 rounded-[18px] bg-gradient-to-br from-[#FAF7F2] to-[#F3ECE2] border border-[#EBE4DA] shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#B57438] mb-1">
                Lounge Etiquette & Dress Code
              </div>
              <p className="text-xs text-[#68625B] leading-relaxed font-sans">
                Smart casual attire is appreciated. We preserve an acoustic haven of natural light, calm music, and warm hospitality for all guests.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
