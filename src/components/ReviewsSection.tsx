import React from 'react';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/mockData.ts';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F5EFE6] border-t border-[#EBE4DA] relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B57438]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
            <span>Distinguished Patrons & Certified Critics</span>
          </div>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[38px] font-bold text-[#1A1816] leading-[1.25] mb-2 sm:mb-3 px-2">
            Reverence from Certified Connoisseurs
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] text-[#68625B] px-2">
            Authentic experiences shared by licensed SCA Q-Graders and culinary lifestyle reviewers.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-[16px] bg-white border border-[#EBE4DA] hover:border-[#B57438]/50 flex flex-col justify-between caramel-glow-hover relative group shadow-sm hover:shadow-md"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#B57438]/15 group-hover:text-[#B57438]/30 transition-colors" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-[#B57438]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="font-serif italic text-[15px] sm:text-[16px] text-[#1A1816] leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-[#EBE4DA] flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#EBE4DA]"
                />
                <div>
                  <div className="font-sans font-bold text-sm text-[#1A1816] flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span title="Verified Patron">
                        <ShieldCheck className="w-4 h-4 text-[#B57438]" />
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-[#B57438] font-medium">
                    {rev.role}
                  </div>
                  <div className="text-[11px] text-[#7A736A] mt-0.5">
                    Favorite: {rev.favoriteOrder}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall satisfaction banner */}
        <div className="mt-16 p-6 rounded-[16px] bg-white border border-[#EBE4DA] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div>
            <div className="font-serif text-2xl font-bold text-[#1A1816]">
              4.98 / 5.00 <span className="text-[#B57438] text-lg font-sans">★★★★★</span>
            </div>
            <div className="text-xs text-[#68625B] mt-1 font-sans">
              Based on over 1,240 verified tastings by specialty coffee connoisseurs
            </div>
          </div>
          <div className="px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#B57438]/30 text-xs font-semibold text-[#B57438] uppercase tracking-wider">
            SCA Premier Sanctuary Certified
          </div>
        </div>

      </div>
    </section>
  );
};
