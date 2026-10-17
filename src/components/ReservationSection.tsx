import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, Sparkles, Smartphone, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { ZoneType, ReservationData } from '../types/index.ts';

export const ReservationSection: React.FC = () => {
  const { activeZonePreselect, saveReservation, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedZone, setSelectedZone] = useState<ZoneType>((activeZonePreselect as ZoneType) || 'vip');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState<string>('08:30 PM');
  const [guests, setGuests] = useState<number>(2);
  const [seatingPreference, setSeatingPreference] = useState<string>('Velvet Booth');
  
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmedData, setConfirmedData] = useState<ReservationData | null>(null);

  const zones = [
    {
      id: 'vip' as ZoneType,
      title: 'VIP Private Lounge',
      desc: 'Velvet booth with personal tableside sommelier & curated sensory flights',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600&auto=format&fit=crop',
      perk: 'Dedicated Sommelier • Acoustic Privacy'
    },
    {
      id: 'indoor' as ZoneType,
      title: 'Indoor Brewing Bar',
      desc: 'Front-row view to custom Modbar taps & vintage Japanese Kyoto towers',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop',
      perk: 'Barista Interaction • Priority Extraction'
    },
    {
      id: 'terrace' as ZoneType,
      title: 'The Botanical Terrace',
      desc: 'Sunlit and starlit open courtyard beside warm stone fire pits & mature olive trees',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=600&auto=format&fit=crop',
      perk: 'Fresh Air Garden • Heated Stone Fireplace'
    }
  ];

  const timeSlots = [
    '05:00 PM', '06:00 PM', '07:15 PM', '08:30 PM', '09:45 PM', '10:45 PM'
  ];

  const seatingOptions = [
    'Velvet Corner Booth',
    'Travertine Marble High-Top',
    'Direct Front Brew Bar Stool',
    'Garden Fireplace Table'
  ];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      showToast('Please provide your full name and phone number', 'info');
      return;
    }

    const reservation: ReservationData = {
      zone: selectedZone,
      date,
      timeSlot,
      guests,
      seatingPreference,
      guestName,
      guestPhone,
      guestEmail: guestEmail || 'guest@noirspecialty.com',
      specialRequests
    };

    saveReservation(reservation);
    setConfirmedData({
      ...reservation,
      id: `NOIR-${Math.floor(100000 + Math.random() * 900000)}`,
      confirmedAt: new Date().toLocaleTimeString()
    });
    setIsConfirmed(true);
    setStep(5);
    showToast('Your table reservation is secured with distinction!', 'success');
  };

  const resetFlow = () => {
    setIsConfirmed(false);
    setConfirmedData(null);
    setStep(1);
    setGuestName('');
    setGuestPhone('');
  };

  return (
    <section id="reservation" className="scroll-mt-[72px] sm:scroll-mt-[85px] py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background Soft Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#E8A86B]/15 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B57438]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B57438]" />
            <span>Direct Table Reservation &bull; Concierge</span>
          </div>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[38px] font-bold text-[#1A1816] leading-[1.25] mb-2 sm:mb-3 px-2">
            Reserve Your Table with Distinction
          </h2>
          <p className="font-sans text-[13px] sm:text-[15px] text-[#68625B] px-2">
            Effortless concierge booking with personalized seating and instant digital confirmation.
          </p>
        </div>

        {/* PDF Spec Container: 1080px Width • Modern Ceramic White Panel */}
        <div className="max-w-[1080px] mx-auto rounded-[16px] sm:rounded-[20px] bg-white border border-[#EBE4DA] shadow-xl p-4 sm:p-8 lg:p-10 relative overflow-hidden">
          
          {/* Subtle warm caramel top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#B57438] to-transparent" />

          {/* Stepper Progress Indicator */}
          {!isConfirmed && (
            <div className="flex items-center justify-between max-w-md mx-auto mb-10 pb-6 border-b border-[#EBE4DA]">
              {[
                { s: 1, label: 'Zone' },
                { s: 2, label: 'Date & Time' },
                { s: 3, label: 'Guests' },
                { s: 4, label: 'Contact' }
              ].map((item, idx) => (
                <div key={item.s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === item.s
                        ? 'bg-[#B57438] text-white shadow-md shadow-[#B57438]/30'
                        : step > item.s
                        ? 'bg-[#F3ECE2] text-[#B57438] border border-[#B57438]/40'
                        : 'bg-[#FAF7F2] text-[#7A736A] border border-[#EBE4DA]'
                    }`}
                  >
                    {step > item.s ? '✓' : item.s}
                  </div>
                  <span
                    className={`text-[12px] font-sans hidden sm:inline ${
                      step === item.s ? 'text-[#B57438] font-bold' : 'text-[#7A736A]'
                    }`}
                  >
                    {item.label}
                  </span>
                  {idx < 3 && <div className="w-4 sm:w-8 h-[1px] bg-[#EBE4DA] mx-1" />}
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Zone Selection Cards */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1816] font-bold mb-1">
                  Step 1: Select Your Atmosphere Zone
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B]">
                  Each sanctuary zone delivers a tailored acoustic and visual experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {zones.map((zone) => {
                  const isSelected = selectedZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => setSelectedZone(zone.id)}
                      className={`cursor-pointer rounded-[14px] overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#B57438] bg-[#FDFBF7] shadow-lg shadow-[#B57438]/15 scale-[1.02]'
                          : 'border-[#EBE4DA] bg-white hover:border-[#B57438]/60 shadow-sm'
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden bg-[#F3ECE2]">
                        <img
                          src={zone.image}
                          alt={zone.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        {isSelected && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#B57438] text-white text-xs font-bold flex items-center gap-1 shadow-md">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#1A1816] mb-1">
                            {zone.title}
                          </h4>
                          <p className="text-xs text-[#68625B] leading-relaxed mb-3">
                            {zone.desc}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[#EBE4DA] text-[11px] font-sans text-[#B57438] font-semibold">
                          ✦ {zone.perk}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-semibold text-sm flex items-center gap-2 caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20"
                >
                  <span>Proceed to Date & Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Picker */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1816] font-bold mb-1">
                  Step 2: Choose Date & Available Slot
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B]">
                  Live booking slots highlighted with warm caramel indicator
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Date Input */}
                <div className="bg-[#FAF7F2] p-5 rounded-[12px] border border-[#EBE4DA]">
                  <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-[48px] px-4 rounded-[8px] bg-white border border-[#EBE4DA] text-[#1A1816] focus:border-[#B57438] focus:outline-none font-sans text-sm shadow-sm"
                  />
                  <div className="mt-4 text-xs text-[#68625B] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B57438]" />
                    <span>Tables are guaranteed up to 20 minutes past arrival slot</span>
                  </div>
                </div>

                {/* Slot Selector */}
                <div className="bg-[#FAF7F2] p-5 rounded-[12px] border border-[#EBE4DA]">
                  <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Available Seating Slots</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                    {timeSlots.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`h-[48px] rounded-[8px] text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#B57438] text-white shadow-md shadow-[#B57438]/30 font-bold'
                              : 'bg-white text-[#4A453F] border border-[#EBE4DA] hover:border-[#B57438] hover:text-[#B57438] shadow-sm'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-full border border-[#EBE4DA] text-xs text-[#68625B] hover:text-[#1A1816] cursor-pointer flex items-center gap-1 bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-semibold text-sm flex items-center gap-2 caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20"
                >
                  <span>Proceed to Guests & Seating</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Counter (1-8) & Seating Preference */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1816] font-bold mb-1">
                  Step 3: Guest Count & Seating Style
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B]">
                  Accommodating 1 to 8 guests per exclusive reservation
                </p>
              </div>

              {/* Guest counter buttons */}
              <div className="bg-[#FAF7F2] p-5 rounded-[12px] border border-[#EBE4DA]">
                <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Party Size (1 - 8 Guests)</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`h-[48px] rounded-[8px] text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                        guests === num
                          ? 'bg-[#B57438] text-white shadow-md shadow-[#B57438]/30'
                          : 'bg-white text-[#1A1816] border border-[#EBE4DA] hover:border-[#B57438]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating preference pills */}
              <div className="bg-[#FAF7F2] p-5 rounded-[12px] border border-[#EBE4DA]">
                <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-3">
                  Seating Style Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSeatingPreference(opt)}
                      className={`p-3.5 rounded-[8px] text-xs font-medium text-left border transition-all cursor-pointer ${
                        seatingPreference === opt
                          ? 'bg-white border-[#B57438] text-[#B57438] font-bold shadow-sm'
                          : 'bg-white border-[#EBE4DA] text-[#4A453F] hover:border-[#B57438]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full border border-[#EBE4DA] text-xs text-[#68625B] hover:text-[#1A1816] cursor-pointer flex items-center gap-1 bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-semibold text-sm flex items-center gap-2 caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20"
                >
                  <span>Proceed to Contact Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Contact Details */}
          {step === 4 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1816] font-bold mb-1">
                  Step 4: Contact Details & Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B]">
                  Instant SMS confirmation and digital pass will be delivered
                </p>
              </div>

              {/* Form Inputs: Height: 48px, Radius: 8px */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Montgomery"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full h-[48px] px-4 rounded-[8px] bg-[#FAF7F2] border border-[#EBE4DA] text-[#1A1816] focus:border-[#B57438] focus:outline-none font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-1.5">
                    Mobile Number (for SMS Confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 234-8900"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full h-[48px] px-4 rounded-[8px] bg-[#FAF7F2] border border-[#EBE4DA] text-[#1A1816] focus:border-[#B57438] focus:outline-none font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="julian@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full h-[48px] px-4 rounded-[8px] bg-[#FAF7F2] border border-[#EBE4DA] text-[#1A1816] focus:border-[#B57438] focus:outline-none font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#B57438] uppercase tracking-wider mb-1.5">
                    Special Occasion or Notes
                  </label>
                  <input
                    type="text"
                    placeholder="Anniversary, quiet seating, coffee preferences"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full h-[48px] px-4 rounded-[8px] bg-[#FAF7F2] border border-[#EBE4DA] text-[#1A1816] focus:border-[#B57438] focus:outline-none font-sans text-sm"
                  />
                </div>
              </div>

              {/* Summary Box */}
              <div className="p-4 rounded-[12px] bg-[#FAF7F2] border border-[#EBE4DA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#1A1816]">
                <div className="flex items-center gap-2">
                  <span className="text-[#B57438] font-bold">
                    {zones.find((z) => z.id === selectedZone)?.title}
                  </span>
                  <span>•</span>
                  <span>{date}</span>
                  <span>•</span>
                  <span className="text-[#B57438] font-bold">{timeSlot}</span>
                  <span>•</span>
                  <span>{guests} Guests</span>
                </div>
                <div className="text-[#68625B] font-mono text-[11px] font-semibold">
                  {seatingPreference}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-full border border-[#EBE4DA] text-xs text-[#68625B] hover:text-[#1A1816] cursor-pointer flex items-center gap-1 bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-bold text-sm tracking-wide caramel-glow-hover cursor-pointer shadow-lg shadow-[#B57438]/25"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Instant Confirmation */}
          {step === 5 && confirmedData && (
            <div className="text-center py-6 animate-in zoom-in-95 duration-500">
              
              {/* Animated Warm Checkmark */}
              <div className="w-20 h-20 mx-auto rounded-full bg-[#B57438]/15 border-2 border-[#B57438] flex items-center justify-center text-[#B57438] mb-6 shadow-lg shadow-[#B57438]/25">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <span className="text-xs uppercase tracking-[0.25em] text-[#B57438] font-bold font-sans">
                Reservation Confirmed
              </span>

              <h3 className="font-serif text-3xl font-bold text-[#1A1816] mt-2 mb-2">
                Welcome, {confirmedData.guestName}
              </h3>

              <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EBE4DA] text-xs font-mono text-[#B57438] font-bold mb-6">
                Ref Code: {confirmedData.id}
              </div>

              {/* SMS Alert Simulation */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#4A453F] flex items-center gap-3.5 mb-8 text-left shadow-sm">
                <div className="p-2.5 rounded-lg bg-[#B57438]/15 text-[#B57438]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1A1816]">
                    SMS Confirmation Dispatched
                  </div>
                  <div className="text-[11px] text-[#68625B]">
                    Sent to {confirmedData.guestPhone} with lounge concierge access & arrival instructions
                  </div>
                </div>
              </div>

              {/* Add to Apple Wallet / Google Calendar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => showToast('Pass added to Apple Wallet', 'success')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-[#EBE4DA] hover:border-[#B57438] text-xs font-medium text-[#1A1816] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>🍏</span>
                  <span>Add to Apple Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => showToast('Event synced to Google Calendar', 'success')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-[#EBE4DA] hover:border-[#B57438] text-xs font-medium text-[#1A1816] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B57438]" />
                  <span>Add to Google Calendar</span>
                </button>
              </div>

              {/* Reset */}
              <button
                type="button"
                onClick={resetFlow}
                className="text-xs text-[#B57438] underline underline-offset-4 hover:text-[#9E6028] cursor-pointer font-medium"
              >
                Make Another Table Reservation
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
