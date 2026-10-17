import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CoffeeItem, CartItem, ReservationData, Language } from '../types/index.ts';
import { ambianceAudio } from '../utils/audio.ts';

interface ToastState {
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeView: 'home' | 'menu' | 'shop' | 'roastery';
  setActiveView: (view: 'home' | 'menu' | 'shop' | 'roastery') => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCoffee: CoffeeItem | null;
  setSelectedCoffee: (coffee: CoffeeItem | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isCraftsmanshipOpen: boolean;
  setIsCraftsmanshipOpen: (open: boolean) => void;
  isAmbianceOpen: boolean;
  setIsAmbianceOpen: (open: boolean) => void;
  isPlayingAudio: boolean;
  toggleAudio: () => void;
  audioVolume: number;
  setAudioVolume: (vol: number) => void;
  activeZonePreselect: string;
  setActiveZonePreselect: (zoneId: string) => void;
  latestReservation: ReservationData | null;
  saveReservation: (res: ReservationData) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to English as explicitly requested: "اول حاجه انا عايز الموقع انجليزي مش عربي"
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'menu' | 'shop' | 'roastery'>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('noir_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCraftsmanshipOpen, setIsCraftsmanshipOpen] = useState(false);
  const [isAmbianceOpen, setIsAmbianceOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolumeState] = useState(0.6);
  const [activeZonePreselect, setActiveZonePreselect] = useState<string>('vip');
  const [latestReservation, setLatestReservation] = useState<ReservationData | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('noir_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Enforce English LTR document orientation
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const toggleLanguage = () => {
    setLanguage('en');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    setToast({ message, type });
    window.setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === newItem.productId && i.size === newItem.size && i.grind === newItem.grind
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [
        ...prev,
        {
          ...newItem,
          id: `${newItem.productId}-${newItem.size}-${newItem.grind}-${Date.now()}`
        }
      ];
    });
    showToast('Added to your coffee bag', 'gold');
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      ambianceAudio.stop();
      setIsPlayingAudio(false);
    } else {
      ambianceAudio.start();
      setIsPlayingAudio(true);
    }
  };

  const setAudioVolume = (vol: number) => {
    setAudioVolumeState(vol);
    ambianceAudio.setVolume(vol);
  };

  const saveReservation = (res: ReservationData) => {
    const enriched: ReservationData = {
      ...res,
      id: `NOIR-${Math.floor(100000 + Math.random() * 900000)}`,
      confirmedAt: new Date().toISOString()
    };
    setLatestReservation(enriched);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeView,
        setActiveView,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedCoffee,
        setSelectedCoffee,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isCraftsmanshipOpen,
        setIsCraftsmanshipOpen,
        isAmbianceOpen,
        setIsAmbianceOpen,
        isPlayingAudio,
        toggleAudio,
        audioVolume,
        setAudioVolume,
        activeZonePreselect,
        setActiveZonePreselect,
        latestReservation,
        saveReservation,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
