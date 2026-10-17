import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Sparkles, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { SHOP_PRODUCTS } from '../data/mockData.ts';
import { GrindOption } from '../types/index.ts';

export const ShopPage: React.FC = () => {
  const { setActiveView, addToCart } = useApp();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, '300g' | '1kg'>>({
    'prod-yirgacheffe-beans': '300g',
    'prod-cerro-azul-geisha': '300g',
    'prod-yemen-ancient': '300g',
    'prod-noir-syphon-brewer': '300g'
  });

  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, GrindOption>>({
    'prod-yirgacheffe-beans': 'Whole Bean',
    'prod-cerro-azul-geisha': 'Whole Bean',
    'prod-yemen-ancient': 'Whole Bean',
    'prod-noir-syphon-brewer': 'Whole Bean'
  });

  const grindOptions: GrindOption[] = [
    'Whole Bean',
    'Espresso Grind',
    'V60 Filter Grind',
    'French Press Grind'
  ];

  const handleSizeChange = (productId: string, size: '300g' | '1kg') => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleGrindChange = (productId: string, grind: GrindOption) => {
    setSelectedGrinds((prev) => ({ ...prev, [productId]: grind }));
  };

  const handleAddToCart = (product: typeof SHOP_PRODUCTS[0]) => {
    const size = selectedSizes[product.id] || '300g';
    const grind = selectedGrinds[product.id] || 'Whole Bean';
    const price = size === '1kg' ? product.price1kg : product.price300g;

    addToCart({
      productId: product.id,
      name: product.name,
      size,
      grind,
      price,
      quantity: 1,
      image: product.image
    });
  };

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
            Complimentary Global Express Shipping over $100
          </span>
        </div>

        {/* Page Banner */}
        <div className="rounded-[20px] bg-gradient-to-r from-white via-[#F3ECE2] to-white border border-[#EBE4DA] p-8 sm:p-12 mb-12 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs uppercase tracking-[0.22em] font-sans font-bold text-[#B57438]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
              <span>Artisan Beans & Brewing Gear Shop</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816] mb-4">
              Artisanal Whole Beans & Merch
            </h1>
            <p className="text-sm text-[#68625B] leading-relaxed">
              Micro-batch drum roasted on demand, flushed with nitrogen in light-shielded matte foil bags with one-way degassing valves.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOP_PRODUCTS.map((prod) => {
            const currentSize = selectedSizes[prod.id] || '300g';
            const currentGrind = selectedGrinds[prod.id] || 'Whole Bean';
            const currentPrice = currentSize === '1kg' ? prod.price1kg : prod.price300g;

            return (
              <div
                key={prod.id}
                className="rounded-[14px] bg-white border border-[#EBE4DA] hover:border-[#B57438]/50 overflow-hidden flex flex-col justify-between caramel-glow-hover group shadow-sm hover:shadow-md"
              >
                {/* Product Bag Image */}
                <div className="relative h-60 overflow-hidden bg-[#F3ECE2]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {prod.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 border border-[#EBE4DA] text-[#B57438] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {prod.badge}
                    </div>
                  )}

                  {/* Weight Switcher Pills */}
                  <div className="absolute bottom-3 right-3 flex items-center bg-white/95 rounded-full p-1 border border-[#EBE4DA] shadow-sm">
                    <button
                      onClick={() => handleSizeChange(prod.id, '300g')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        currentSize === '300g'
                          ? 'bg-[#B57438] text-white'
                          : 'text-[#68625B] hover:text-[#1A1816]'
                      }`}
                    >
                      300g
                    </button>
                    <button
                      onClick={() => handleSizeChange(prod.id, '1kg')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        currentSize === '1kg'
                          ? 'bg-[#B57438] text-white'
                          : 'text-[#68625B] hover:text-[#1A1816]'
                      }`}
                    >
                      1kg
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#B57438] font-bold mb-1">
                      {prod.origin}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1816] leading-snug line-clamp-1 mb-2">
                      {prod.name}
                    </h3>

                    {/* Flavor Notes Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {prod.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EBE4DA] text-[10px] text-[#68625B] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#68625B] line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#EBE4DA]">
                    {/* Grind Selector Pill Dropdown */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#7A736A] mb-1">
                        Grind Selection
                      </label>
                      <div className="relative">
                        <select
                          value={currentGrind}
                          onChange={(e) => handleGrindChange(prod.id, e.target.value as GrindOption)}
                          className="w-full h-[38px] px-3 pr-8 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#1A1816] focus:border-[#B57438] focus:outline-none appearance-none cursor-pointer font-medium"
                        >
                          {grindOptions.map((g) => (
                            <option key={g} value={g} className="bg-white text-[#1A1816]">
                              {g}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B57438] pointer-events-none" />
                      </div>
                    </div>

                    {/* Price and Add CTA */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-[#7A736A] block uppercase font-medium">Price</span>
                        <span className="font-serif text-xl font-bold text-[#1A1816]">${currentPrice}</span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="px-4 py-2.5 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer caramel-glow-hover"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
