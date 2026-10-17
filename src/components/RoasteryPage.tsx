import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Flame, Layers, PackageCheck, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { SOURCING_ORIGINS } from '../data/mockData.ts';
import { SourcingOrigin } from '../types/index.ts';

export const RoasteryPage: React.FC = () => {
  const { setActiveView } = useApp();
  const [selectedOrigin, setSelectedOrigin] = useState<SourcingOrigin>(SOURCING_ORIGINS[0]);

  const timelineSteps = [
    {
      step: '01',
      title: 'Selective Hand Picking',
      desc: 'Only peak ruby cherries exceeding 22° Brix sugar refractometer density are harvested on steep volcanic slopes.',
      icon: Eye
    },
    {
      step: '02',
      title: 'Precision Fermentation Control',
      desc: 'Anaerobic temperature-regulated bioreactors monitor lactic and yeast cultures down to 0.1 pH shifts.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Custom Drum Roasting',
      desc: 'Small convection drum roasters with micro-second conductive curve profiling preserve delicate floral volatiles.',
      icon: Flame
    },
    {
      step: '04',
      title: 'Nitrogen Flush Packaging',
      desc: 'Oxygen evacuation below 0.2% with food-grade pure nitrogen in lightproof matte canisters to guarantee lasting freshness.',
      icon: PackageCheck
    }
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF7F2] min-h-screen text-[#1A1816]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#B57438] hover:text-[#9E6028] transition-colors cursor-pointer font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sanctuary Home</span>
          </button>

          <span className="text-xs text-[#B57438] font-semibold">
            100% Direct Fair Trade Origin Traceability
          </span>
        </div>

        {/* Page Banner */}
        <div className="rounded-[20px] bg-gradient-to-r from-white via-[#F3ECE2] to-white border border-[#EBE4DA] p-8 sm:p-12 mb-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs uppercase tracking-[0.22em] font-sans font-bold text-[#B57438]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
              <span>Direct Sourcing & Roastery Transparency</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816] mb-4">
              Single-Origin Terroirs & Artisanal Roastery
            </h1>
            <p className="text-sm text-[#68625B] leading-relaxed">
              Direct partnerships with multi-generational estate farmers across volcanic peaks. Complete transparency from harvest cherry to nitrogen-sealed roast.
            </p>
          </div>
        </div>

        {/* Interactive SVG World Map */}
        <div className="rounded-[20px] bg-white border border-[#EBE4DA] p-6 sm:p-8 mb-16 shadow-md relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#EBE4DA] gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A1816]">
                Interactive Sourcing Map
              </h2>
              <p className="text-xs text-[#68625B] mt-1">
                Click the glowing markers on Ethiopia, Colombia, Guatemala, and Yemen to inspect lot details
              </p>
            </div>

            {/* Quick Country Switcher */}
            <div className="flex flex-wrap gap-2">
              {SOURCING_ORIGINS.map((orig) => (
                <button
                  key={orig.id}
                  onClick={() => setSelectedOrigin(orig)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedOrigin.id === orig.id
                      ? 'bg-[#B57438] text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-[#4A453F] border border-[#EBE4DA] hover:border-[#B57438]'
                  }`}
                >
                  {orig.country}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full h-[360px] sm:h-[460px] bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#EBE4DA] flex items-center justify-center">
            
            <svg
              viewBox="0 0 900 500"
              className="w-full h-full object-contain filter drop-shadow select-none"
            >
              <defs>
                <radialGradient id="caramelGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B57438" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#B57438" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* World Continents Stylized Outlines in soft oatmeal stone */}
              {/* North America */}
              <path
                d="M 120 100 Q 180 80 240 120 L 260 170 Q 200 210 180 260 L 140 220 Q 90 180 120 100 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* Central America & Guatemala */}
              <path
                d="M 180 260 L 235 250 L 250 280 L 220 290 Z"
                fill="#E2D9CC"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* South America (Colombia) */}
              <path
                d="M 235 270 Q 320 280 340 360 L 300 440 Q 260 460 250 420 Q 220 340 235 270 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* Europe */}
              <path
                d="M 420 100 Q 500 80 540 130 L 510 180 Q 450 180 430 150 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* Africa (Ethiopia) */}
              <path
                d="M 430 180 Q 530 180 560 220 L 600 270 Q 550 380 490 400 Q 420 350 440 250 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* Middle East & Yemen */}
              <path
                d="M 530 180 Q 600 190 620 240 L 580 260 Q 550 220 530 180 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* Asia */}
              <path
                d="M 560 100 Q 750 90 820 180 L 780 280 Q 650 260 620 210 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />
              {/* Australia */}
              <path
                d="M 720 340 Q 820 350 810 420 L 730 430 Z"
                fill="#EAE3D8"
                stroke="#DDD4C7"
                strokeWidth="1.5"
              />

              {/* Glowing Markers on Ethiopia, Colombia, Guatemala, Yemen */}
              {SOURCING_ORIGINS.map((orig) => {
                const isSelected = selectedOrigin.id === orig.id;
                return (
                  <g
                    key={orig.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedOrigin(orig)}
                  >
                    <circle
                      cx={orig.svgX}
                      cy={orig.svgY}
                      r={isSelected ? 24 : 16}
                      fill="url(#caramelGlow)"
                      className="animate-pulse"
                    />
                    <circle
                      cx={orig.svgX}
                      cy={orig.svgY}
                      r={isSelected ? 8 : 6}
                      fill={isSelected ? '#B57438' : '#C98748'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <text
                      x={orig.svgX}
                      y={orig.svgY - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#B57438' : '#1A1816'}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight="bold"
                      fontFamily="Plus Jakarta Sans"
                    >
                      {orig.country}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Origin Card Floating Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EBE4DA] shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg font-bold text-[#B57438]">
                  {selectedOrigin.country}
                </span>
                <span className="text-[11px] font-mono font-bold text-[#1A1816]">
                  {selectedOrigin.altitude}
                </span>
              </div>
              <div className="text-xs text-[#1A1816] font-bold mb-1">
                {selectedOrigin.region}
              </div>
              <p className="text-[11px] text-[#68625B] leading-relaxed mb-3">
                {selectedOrigin.notes}
              </p>
              <div className="pt-2 border-t border-[#EBE4DA] flex justify-between text-[10px] text-[#B57438] font-semibold">
                <span>Producer: {selectedOrigin.producer}</span>
                <span>Harvest: {selectedOrigin.harvest}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bean Processing Steps */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1816] mb-2">
              Bean Processing & Artisanal Roasting Protocol
            </h2>
            <p className="text-xs sm:text-sm text-[#68625B]">
              Four calibrated phases engineered to safeguard delicate terroir volatiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((stepItem, idx) => {
              const IconComp = stepItem.icon;
              return (
                <div
                  key={stepItem.step}
                  className="rounded-[16px] bg-white border border-[#EBE4DA] p-6 flex flex-col justify-between caramel-glow-hover relative group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl font-bold text-[#B57438]/30 group-hover:text-[#B57438] transition-colors">
                        {stepItem.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#EBE4DA] flex items-center justify-center text-[#B57438]">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-2">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs text-[#68625B] leading-relaxed font-sans">
                      {stepItem.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#EBE4DA] text-[10px] uppercase tracking-wider text-[#B57438] font-bold">
                    Phase 0{idx + 1} • Verified Protocol
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
