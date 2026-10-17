import React from 'react';
import { X, Sparkles, Flame, Droplets, Award } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const CraftsmanshipModal: React.FC = () => {
  const { isCraftsmanshipOpen, setIsCraftsmanshipOpen } = useApp();

  if (!isCraftsmanshipOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setIsCraftsmanshipOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="relative w-full max-w-[800px] bg-white border border-[#EBE4DA] rounded-[20px] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EBE4DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B57438]" />
            <span className="font-serif text-lg font-bold text-[#1A1816]">
              The Artisanal Craftsmanship of NOIR
            </span>
          </div>
          <button
            onClick={() => setIsCraftsmanshipOpen(false)}
            className="w-8 h-8 rounded-full border border-[#EBE4DA] flex items-center justify-center text-[#1A1816] hover:text-[#B57438] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          <video
            autoPlay
            controls
            loop
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-barista-making-a-latte-art-41585-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Details and philosophy */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF7F2]">
          <div className="p-4 rounded-xl bg-white border border-[#EBE4DA] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B57438] mb-1">
              <Droplets className="w-4 h-4" />
              <span>Custom Mineral Water</span>
            </div>
            <p className="text-[11px] text-[#68625B] leading-relaxed font-sans">
              Remineralized spring water balanced to 130 TDS for optimal flavor and acidity extraction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#EBE4DA] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B57438] mb-1">
              <Flame className="w-4 h-4" />
              <span>Micro Drum Roasting</span>
            </div>
            <p className="text-[11px] text-[#68625B] leading-relaxed font-sans">
              Strict 5kg maximum batches ensuring uniform convection heat application and aromatic peak preservation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#EBE4DA] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B57438] mb-1">
              <Award className="w-4 h-4" />
              <span>SCA World Standard</span>
            </div>
            <p className="text-[11px] text-[#68625B] leading-relaxed font-sans">
              Certified Q-Graders audit every single lot across aroma, body, acidity, and lingering aftertaste.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
