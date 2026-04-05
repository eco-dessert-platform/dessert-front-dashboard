import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
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
        deleteCookie(TOKEN_COOKIE_KEYS.ACCESS)
        deleteCookie(TOKEN_COOKIE_KEYS.REFRESH)
        set({ isLoggedIn: false })
      },
      isReady: false,
      syncAuthState: () => {
        const accessToken = getCookie(TOKEN_COOKIE_KEYS.ACCESS)
        set({ isLoggedIn: !!accessToken, isReady: true })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    },
  ),
)
