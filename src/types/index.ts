export type Language = 'en' | 'ar';

export type Category = 'All' | 'Fruity/Floral' | 'Nutty/Chocolate' | 'Cold Drips' | 'Signature Drinks';

export type RoastLevel = 'Light' | 'Medium' | 'Dark';

export type ExtractionMethod = 'V60' | 'Aeropress' | 'Espresso' | 'Cold Drip';

export type GrindOption = 'Whole Bean' | 'Espresso Grind' | 'V60 Filter Grind' | 'French Press Grind';

export interface CoffeeItem {
  id: string;
  name: string;
  nameAr: string;
  category: Category;
  origin: string;
  originAr: string;
  country: 'Ethiopia' | 'Colombia' | 'Guatemala' | 'Yemen' | 'Panama';
  price: number;
  image: string;
  roastLevel: RoastLevel;
  extractionMethod: ExtractionMethod;
  altitude: string;
  processing: string;
  processingAr: string;
  cuppingScore: number;
  flavorNotes: string[];
  flavorNotesAr: string[];
  description: string;
  descriptionAr: string;
  farmerStory: string;
  farmerStoryAr: string;
  radarScores: {
    acidity: number;
    body: number;
    sweetness: number;
    aroma: number;
    aftertaste: number;
  };
  brewTime: string;
  temp: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  nameAr: string;
  price300g: number;
  price1kg: number;
  image: string;
  flavorNotes: string[];
  flavorNotesAr: string[];
  roastLevel: RoastLevel;
  origin: string;
  originAr: string;
  badge?: string;
  description: string;
  descriptionAr: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: '300g' | '1kg';
  grind: GrindOption;
  price: number;
  quantity: number;
  image: string;
}

export type ZoneType = 'vip' | 'indoor' | 'terrace';

export interface ReservationData {
  id?: string;
  zone: ZoneType;
  date: string;
  timeSlot: string;
  guests: number;
  seatingPreference: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests?: string;
  confirmedAt?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  roleAr: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  commentAr: string;
  favoriteOrder: string;
  verified: boolean;
}

export interface SourcingOrigin {
  id: string;
  country: string;
  countryAr: string;
  region: string;
  regionAr: string;
  altitude: string;
  varietals: string;
  harvest: string;
  harvestAr: string;
  lat: number;
  lng: number;
  svgX: number; // for SVG world map
  svgY: number;
  notes: string;
  notesAr: string;
  producer: string;
}
