export enum AppMode {
  BAZI = 'bazi',
  VISION = 'vision',
  TAROT = 'tarot',
  FENGSHUI = 'fengshui',
  PROFILE = 'profile'
}

export interface UserProfile {
  name: string;
  gender: 'male' | 'female';
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
}

export interface FortuneResult {
  markdown: string;
  suggestedActions?: string[];
}

export interface TarotCard {
  name: string;
  nameCN: string;
  meaningUpright: string;
  meaningReversed: string;
  isReversed: boolean;
}

export enum VisionType {
  PALM = 'palm',
  FACE = 'face',
  FENGSHUI = 'fengshui'
}

export type MembershipTier = 'free' | 'weekly' | 'monthly';

export interface UserState {
  usageCount: number;      // Number of times used
  maxFree: number;         // Default 3
  extraQuota: number;      // Added via 9.9 purchase
  vipExpiry: number | null; // Timestamp of expiration
  isVip: boolean;
  remainingQuota: number;
}