import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { deleteCookie, getCookie } from '@/shared/utils'

interface AuthState {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  isReady: boolean
  logout: () => void
  syncAuthState: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      logout: () => {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        set({ isLoggedIn: false })
      },
      isReady: false,
      syncAuthState: () => {
        const accessToken = getCookie('accessToken')
        set({ isLoggedIn: !!accessToken, isReady: true })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
