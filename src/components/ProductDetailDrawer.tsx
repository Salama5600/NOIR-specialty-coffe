import React from 'react';
import { X, Sparkles, ShoppingBag, Clock, Thermometer, MapPin, Award } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const ProductDetailDrawer: React.FC = () => {
  const { selectedCoffee, setSelectedCoffee, addToCart } = useApp();

  if (!selectedCoffee) return null;

  const scores = selectedCoffee.radarScores;
  const size = 180;
  const center = size / 2;
  const radius = 65;

  const points = [
    { label: 'Acidity', val: scores.acidity, angle: -Math.PI / 2 },
    { label: 'Body', val: scores.body, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: 'Sweetness', val: scores.sweetness, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: 'Aroma', val: scores.aroma, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: 'Aftertaste', val: scores.aftertaste, angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
  ];

  const polygonCoords = points
    .map((p) => {
      const r = (p.val / 100) * radius;
      const x = center + r * Math.cos(p.angle);
      const y = center + r * Math.sin(p.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const handleOrderCup = () => {
    addToCart({
      productId: selectedCoffee.id,
      name: `${selectedCoffee.name} (${selectedCoffee.extractionMethod})`,
      size: '300g',
      grind: 'V60 Filter Grind',
      price: selectedCoffee.price,
      quantity: 1,
      image: selectedCoffee.image
    });
    setSelectedCoffee(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedCoffee(null)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer: 480px Width (Desktop) / 100% (Mobile) */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-[480px] bg-white border-l border-[#EBE4DA] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#EBE4DA] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B57438] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#B57438] font-bold">
                Sensory Cupping Card
              </span>
            </div>
            <button
              onClick={() => setSelectedCoffee(null)}
              className="w-8 h-8 rounded-full border border-[#EBE4DA] flex items-center justify-center text-[#1A1816] hover:text-[#B57438] hover:border-[#B57438] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            
            {/* High-res Brew Visual */}
            <div className="relative h-56 rounded-xl overflow-hidden border border-[#EBE4DA] shadow-sm bg-[#F3ECE2]">
              <img
                src={selectedCoffee.image}
                alt={selectedCoffee.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#EBE4DA] text-xs font-bold text-[#B57438] flex items-center gap-1 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>{selectedCoffee.cuppingScore} Q Score</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
                <span className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-[#E8A86B]" /> {selectedCoffee.brewTime}
                </span>
                <span className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <Thermometer className="w-3 h-3 text-[#E8A86B]" /> {selectedCoffee.temp}
                </span>
              </div>
            </div>

            {/* Title & Origin */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#B57438] font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedCoffee.origin}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1A1816] mb-2">
                {selectedCoffee.name}
              </h2>
              <p className="text-xs text-[#68625B] leading-relaxed font-sans">
                {selectedCoffee.description}
              </p>
            </div>

            {/* Flavor Notes Badges */}
            <div>
              <label className="block text-xs uppercase font-bold text-[#B57438] tracking-wider mb-2">
                Distinct Flavor Notes
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedCoffee.flavorNotes.map((n, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#1A1816] font-medium"
                  >
                    ✦ {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EBE4DA]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-[#B57438] tracking-wider">
                  Sensory Balance Radar
                </span>
                <span className="text-[10px] text-[#7A736A] font-medium">SCA 100-Point Spectrum</span>
              </div>

              <div className="flex items-center justify-center py-2">
                <svg width={size} height={size} className="overflow-visible">
                  {[0.4, 0.7, 1.0].map((scale, i) => {
                    const poly = points
                      .map((p) => {
                        const r = radius * scale;
                        const x = center + r * Math.cos(p.angle);
                        const y = center + r * Math.sin(p.angle);
                        return `${x},${y}`;
                      })
                      .join(' ');
                    return (
                      <polygon
                        key={i}
                        points={poly}
                        fill="none"
                        stroke="#DDD4C7"
                        strokeWidth="1"
                        strokeDasharray={i === 2 ? 'none' : '3 3'}
                      />
                    );
                  })}

                  {points.map((p, i) => {
                    const x = center + radius * Math.cos(p.angle);
                    const y = center + radius * Math.sin(p.angle);
                    return (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={x}
                        y2={y}
                        stroke="#DDD4C7"
                        strokeWidth="1"
                      />
                    );
                  })}

                  <polygon
                    points={polygonCoords}
                    fill="rgba(181, 116, 56, 0.25)"
                    stroke="#B57438"
                    strokeWidth="2"
                    className="animate-pulse-slow"
                  />

                  {points.map((p, i) => {
                    const x = center + (p.val / 100) * radius * Math.cos(p.angle);
                    const y = center + (p.val / 100) * radius * Math.sin(p.angle);
                    const labelR = radius + 18;
                    const labelX = center + labelR * Math.cos(p.angle);
                    const labelY = center + labelR * Math.sin(p.angle);

                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="3.5" fill="#B57438" stroke="#FFFFFF" strokeWidth="1" />
                        <text
                          x={labelX}
                          y={labelY + 3}
                          textAnchor="middle"
                          fill="#1A1816"
                          fontSize="9"
                          fontWeight="bold"
                        >
                          {p.label} ({p.val})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Farmer Story */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EBE4DA]">
              <div className="text-xs uppercase font-bold text-[#B57438] tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Farmer Story & Heritage</span>
              </div>
              <p className="text-xs text-[#68625B] leading-relaxed font-sans">
                {selectedCoffee.farmerStory}
              </p>
            </div>

            {/* Extraction Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF7F2] p-4 rounded-xl border border-[#EBE4DA]">
              <div>
                <span className="text-[10px] uppercase text-[#7A736A] block font-medium">Altitude</span>
                <span className="font-semibold text-[#1A1816]">{selectedCoffee.altitude}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#7A736A] block font-medium">Roast Level</span>
                <span className="font-bold text-[#B57438]">{selectedCoffee.roastLevel}</span>
              </div>
            </div>

          </div>

          {/* Footer CTA */}
          <div className="p-4 sm:p-6 border-t border-[#EBE4DA] bg-white flex items-center justify-between sticky bottom-0 shadow-sm">
            <div>
              <span className="text-[10px] uppercase text-[#7A736A] block font-medium">Single Tasting Cup</span>
              <span className="font-serif text-2xl font-bold text-[#1A1816]">${selectedCoffee.price}</span>
            </div>

            <button
              onClick={handleOrderCup}
              className="px-6 py-3 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Tasting Flight</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
