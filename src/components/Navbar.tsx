import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cart,
    setIsCartOpen,
    setIsBookingModalOpen,
    isPlayingAudio,
    toggleAudio,
    setIsAmbianceOpen
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'experience', label: 'Experience', targetView: 'home', hash: 'atmosphere' },
    { id: 'menu', label: 'Coffee Menu', targetView: 'menu' },
    { id: 'shop', label: 'Artisan Beans', targetView: 'shop' },
    { id: 'roastery', label: 'The Roastery', targetView: 'roastery' },
    { id: 'reserve', label: 'Lounge Reserve', targetView: 'home', hash: 'reservation' }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.targetView === 'home' && link.hash) {
      if (activeView !== 'home') {
        setActiveView('home');
        setTimeout(() => {
          const el = document.getElementById(link.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveView(link.targetView as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] sm:h-[80px] transition-all duration-300 ${
          scrolled
            ? 'glass-panel-light border-b border-[#EBE4DA] shadow-sm'
            : 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4DA]/70'
        }`}
      >
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo (Left): Modern Serif NOIR + Caramel Bean Motif */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer"
            title="NOIR Specialty Coffee"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3ECE2] flex items-center justify-center border border-[#E0D5C7] group-hover:border-[#B57438] transition-colors flex-shrink-0">
              <svg viewBox="0 0 40 40" className="w-4 h-4 sm:w-5 sm:h-5 text-[#B57438] fill-current">
                <path d="M20 2C10.059 2 2 10.059 2 20s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2zm1 33.95c-7.238-.52-13.03-6.312-13.55-13.55 1.5.8 3.5 1.4 5.5 1.2 3.5-.4 6-2.5 8-5.5 1.8-2.7 4-4.5 7.5-4.5.8 0 1.6.1 2.3.4-.6 9.8-8.1 21.4-9.75 21.95zM22.5 5.5c6.5.6 11.8 5.6 12.8 11.9-1.2-.6-2.6-.9-4.3-.9-3.4 0-5.8 1.9-7.8 4.7-2 2.8-4.5 5-8.2 5.3-.8.1-1.6 0-2.3-.2C14 17.5 20.8 6.2 22.5 5.5z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.18em] sm:tracking-[0.2em] text-base sm:text-lg font-bold text-[#1A1816] leading-none group-hover:text-[#B57438] transition-colors">
                NOIR
              </span>
              <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.22em] text-[#B57438] mt-0.5 sm:mt-1 font-sans font-semibold">
                Specialty Coffee
              </span>
            </div>
          </button>

          {/* Navigation Links (Center): 13px, Tracking: 1px */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                (link.targetView === 'home' && !link.hash && activeView === 'home') ||
                (link.targetView === activeView && link.targetView !== 'home');

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`text-[13px] tracking-[1px] font-sans transition-all duration-200 uppercase cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-[#B57438] font-bold'
                      : 'text-[#4A453F] hover:text-[#B57438]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B57438] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls (Right): Ambiance Audio Toggle (🔊 28px) + Cart Drawer Badge + Primary CTA "Reserve Table" (140px × 42px) */}
          <div className="flex items-center gap-3">
            
            {/* Ambiance Audio Toggle (28px Button) */}
            <button
              onClick={() => {
                toggleAudio();
                setIsAmbianceOpen(true);
              }}
              className={`w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all duration-300 relative cursor-pointer border ${
                isPlayingAudio
                  ? 'border-[#B57438] bg-[#B57438]/15 text-[#B57438] shadow-[0_0_12px_rgba(181,116,56,0.3)]'
                  : 'border-[#E0D5C7] bg-white text-[#7A736A] hover:text-[#B57438] hover:border-[#B57438]'
              }`}
              title={isPlayingAudio ? 'Lounge Jazz Playing' : 'Play Ambient Lounge Jazz'}
              aria-label="Toggle Ambiance Audio"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#B57438] rounded-full animate-ping" />
                </>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Cart Drawer Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#4A453F] hover:text-[#B57438] transition-colors cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B57438] text-white text-[10px] font-bold flex items-center justify-center font-sans shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary CTA: "Reserve Table" (140px × 42px) */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center w-[140px] h-[42px] rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-semibold text-[13px] tracking-wide caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Reserve Table
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1816] hover:text-[#B57438] cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] sm:top-[80px] z-40 bg-[#FAF7F2]/98 backdrop-blur-xl border-t border-[#EBE4DA] p-5 sm:p-6 flex flex-col justify-between lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-left py-3.5 px-4 rounded-xl text-base font-serif border border-[#EBE4DA] bg-white hover:border-[#B57438] hover:bg-[#F3ECE2] text-[#1A1816] hover:text-[#B57438] transition-all flex items-center justify-between shadow-sm"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#B57438] font-sans font-bold">→</span>
              </button>
            ))}

            <button
              onClick={() => {
                setIsBookingModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 h-[50px] rounded-full bg-[#B57438] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B57438]/25"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table Now
            </button>
          </div>

          <div className="pt-6 border-t border-[#EBE4DA] flex items-center justify-between text-xs text-[#7A736A]">
            <span>NOIR Modern Roastery & Cafe</span>
            <span className="text-[#B57438] font-semibold">Open Daily 08:00 AM — 11:00 PM</span>
          </div>
        </div>
      )}
    </>
  );
};
