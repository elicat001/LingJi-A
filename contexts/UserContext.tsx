import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserState } from '../types';

interface UserContextType extends UserState {
  consumeQuota: () => void;
  purchaseSingle: () => void;
  purchaseWeekly: () => void;
  purchaseMonthly: () => void;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  checkAccess: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usageCount, setUsageCount] = useState(0);
  const [extraQuota, setExtraQuota] = useState(0);
  const [vipExpiry, setVipExpiry] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedUsage = localStorage.getItem('lingji_usage');
    const savedExtra = localStorage.getItem('lingji_extra');
    const savedVip = localStorage.getItem('lingji_vip');

    if (savedUsage) setUsageCount(parseInt(savedUsage));
    if (savedExtra) setExtraQuota(parseInt(savedExtra));
    if (savedVip) setVipExpiry(parseInt(savedVip));
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('lingji_usage', usageCount.toString());
    localStorage.setItem('lingji_extra', extraQuota.toString());
    if (vipExpiry) localStorage.setItem('lingji_vip', vipExpiry.toString());
  }, [usageCount, extraQuota, vipExpiry]);

  const maxFree = 3;
  const isVip = vipExpiry !== null && vipExpiry > Date.now();
  
  // Logic: You have access if VIP OR (usage < free + extra)
  const remainingQuota = isVip ? 9999 : (maxFree + extraQuota) - usageCount;

  const checkAccess = (): boolean => {
    if (isVip) return true;
    if (remainingQuota > 0) return true;
    
    setShowPaywall(true);
    return false;
  };

  const consumeQuota = () => {
    if (!isVip) {
      setUsageCount(prev => prev + 1);
    }
  };

  const purchaseSingle = () => {
    // 9.9 - Add 1 to extra quota
    setExtraQuota(prev => prev + 1);
    setShowPaywall(false);
  };

  const purchaseWeekly = () => {
    // 19.9 - 7 Days
    const expiry = Date.now() + (7 * 24 * 60 * 60 * 1000);
    setVipExpiry(expiry);
    setShowPaywall(false);
  };

  const purchaseMonthly = () => {
    // 49.9 - 30 Days
    const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
    setVipExpiry(expiry);
    setShowPaywall(false);
  };

  return (
    <UserContext.Provider value={{
      usageCount,
      maxFree,
      extraQuota,
      vipExpiry,
      isVip,
      remainingQuota,
      consumeQuota,
      purchaseSingle,
      purchaseWeekly,
      purchaseMonthly,
      showPaywall,
      setShowPaywall,
      checkAccess
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};