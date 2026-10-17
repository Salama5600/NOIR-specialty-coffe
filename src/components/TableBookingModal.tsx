import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { ZoneType, ReservationData } from '../types/index.ts';

export const TableBookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    activeZonePreselect,
    saveReservation,
    showToast
  } = useApp();

  const [zone] = useState<ZoneType>((activeZonePreselect as ZoneType) || 'vip');
  const [selectedTableId, setSelectedTableId] = useState<string>('T-04');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [timeSlot, setTimeSlot] = useState<string>('08:30 PM');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string>('');

  if (!isBookingModalOpen) return null;

  const floorplanTables = [
    { id: 'T-01', label: 'VIP-1', seats: 4, status: 'available' },
    { id: 'T-02', label: 'VIP-2', seats: 6, status: 'available' },
    { id: 'T-03', label: 'VIP-3', seats: 2, status: 'reserved' },
    { id: 'T-04', label: 'BAR-A', seats: 2, status: 'available' },
    { id: 'T-05', label: 'BAR-B', seats: 2, status: 'available' },
    { id: 'T-06', label: 'OUT-1', seats: 4, status: 'available' },
    { id: 'T-07', label: 'OUT-2', seats: 6, status: 'reserved' }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      showToast('Please provide name and phone', 'info');
      return;
    }

    const code = `NOIR-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(code);

    const resData: ReservationData = {
      id: code,
      zone,
      date: new Date().toISOString().split('T')[0],
      timeSlot,
      guests: guestCount,
      seatingPreference: selectedTableId,
      guestName,
      guestPhone,
      guestEmail: 'lounge@noir.com'
    };

    saveReservation(resData);
    setIsSuccess(true);
    showToast('Table reservation secured', 'success');
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="relative w-full max-w-[680px] max-h-[92vh] sm:max-h-[580px] bg-white border border-[#EBE4DA] rounded-[20px] shadow-2xl overflow-y-auto flex flex-col justify-between z-10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EBE4DA] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B57438]" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1816]">
              Visual Floorplan & Table Booking
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full border border-[#EBE4DA] flex items-center justify-center text-[#1A1816] hover:text-[#B57438] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {!isSuccess ? (
            <form onSubmit={handleBooking} className="space-y-5">
              
              {/* Floorplan Map */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#B57438] uppercase tracking-wider">
                    Select Your Seat on the Floorplan
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-[#7A736A] font-medium">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#B57438]" /> Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-neutral-300" /> Reserved
                    </span>
                  </div>
                </div>

                <div className="relative h-44 w-full bg-[#FAF7F2] rounded-xl border border-[#EBE4DA] p-3 sm:p-4 overflow-hidden flex items-center justify-around gap-1">
                  <div className="absolute top-2 left-3 sm:left-4 text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#7A736A] font-mono font-bold">
                    VIP LOUNGE
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#7A736A] font-mono font-bold">
                    BREW BAR
                  </div>
                  <div className="absolute top-2 right-3 sm:right-4 text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#7A736A] font-mono font-bold">
                    TERRACE
                  </div>

                  {floorplanTables.map((t) => {
                    const isSelected = selectedTableId === t.id;
                    const isAvailable = t.status === 'available';

                    return (
                      <button
                        key={t.id}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedTableId(t.id)}
                        className={`relative rounded-lg p-1.5 sm:p-2.5 flex flex-col items-center justify-center transition-all cursor-pointer min-w-[38px] sm:min-w-[48px] ${
                          !isAvailable
                            ? 'opacity-35 bg-neutral-200 border border-neutral-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#B57438] text-white border-2 border-[#1A1816] shadow-md shadow-[#B57438]/40 scale-105'
                            : 'bg-white text-[#1A1816] border border-[#EBE4DA] hover:border-[#B57438]'
                        }`}
                      >
                        <span className="text-[9px] sm:text-[10px] font-bold font-mono">{t.label}</span>
                        <span className="text-[8px] sm:text-[9px] opacity-80">{t.seats}s</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot and Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#7A736A] uppercase tracking-wider mb-1">
                    Preferred Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full h-[44px] px-3 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#1A1816] focus:border-[#B57438] focus:outline-none"
                  >
                    <option value="06:00 PM">06:00 PM (Sunset Tasting)</option>
                    <option value="07:30 PM">07:30 PM (Evening Lounge)</option>
                    <option value="08:30 PM">08:30 PM (Prime Jazz Hours)</option>
                    <option value="10:00 PM">10:00 PM (Late Night Mood)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7A736A] uppercase tracking-wider mb-1">
                    Guests Count
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-[44px] px-3 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#1A1816] focus:border-[#B57438] focus:outline-none"
                  >
                    <option value={1}>1 Guest (Solitary Tasting)</option>
                    <option value={2}>2 Guests (Intimate Table)</option>
                    <option value={4}>4 Guests (Sommelier Booth)</option>
                    <option value={6}>6 Guests (Private Flight Group)</option>
                  </select>
                </div>
              </div>

              {/* Guest Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#7A736A] uppercase tracking-wider mb-1">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Sterling"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full h-[44px] px-3 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#1A1816] focus:border-[#B57438] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#7A736A] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0192"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full h-[44px] px-3 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#1A1816] focus:border-[#B57438] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[48px] rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-bold text-xs uppercase tracking-wider caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20"
              >
                Lock Table Reservation
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#B57438]/15 border border-[#B57438] mx-auto flex items-center justify-center text-[#B57438] shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1A1816]">
                Table Secured
              </h4>
              <p className="text-xs text-[#68625B] max-w-sm mx-auto">
                Table {selectedTableId} has been designated for {guestName} at {timeSlot}.
              </p>

              <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] text-xs text-[#B57438] font-mono font-bold inline-block">
                Pass ID: {reservationCode}
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Event added to calendar', 'success');
                    handleClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#B57438] text-white text-xs font-bold cursor-pointer hover:bg-[#9E6028]"
                >
                  <Calendar className="w-3.5 h-3.5 inline mr-1" />
                  Add to Calendar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
