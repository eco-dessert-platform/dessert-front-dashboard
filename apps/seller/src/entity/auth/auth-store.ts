import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SellerStatus } from './types'

interface AuthState {
  isLoggedIn: boolean
  sellerId: number | null
  sellerStatus: SellerStatus | null
  hasHydrated: boolean
  setAuth: (sellerId: number, status: SellerStatus) => void
  setSellerStatus: (status: SellerStatus) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      sellerId: null,
      sellerStatus: null,
      hasHydrated: false,
      setAuth: (sellerId, status) =>
        set({ isLoggedIn: true, sellerId, sellerStatus: status }),
      setSellerStatus: (status) => set({ sellerStatus: status }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      logout: () =>
        set({
          isLoggedIn: false,
          sellerId: null,
          sellerStatus: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        sellerId: state.sellerId,
        sellerStatus: state.sellerStatus,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
