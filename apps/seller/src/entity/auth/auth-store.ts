import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SellerStatus } from './types'

interface AuthState {
  isLoggedIn: boolean
  sellerId: number | null
  sellerStatus: SellerStatus | null
  setAuth: (sellerId: number, status: SellerStatus) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      sellerId: null,
      sellerStatus: null,
      setAuth: (sellerId, status) =>
        set({ isLoggedIn: true, sellerId, sellerStatus: status }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      logout: () =>
        set({
          isLoggedIn: false,
          sellerId: null,
          sellerStatus: null,
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
