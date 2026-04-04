import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { deleteCookie, getCookie } from '@/shared/utils/cookieUtils'

interface AuthState {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
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
      syncAuthState: () => {
        const accessToken = getCookie('accessToken')
        set({ isLoggedIn: !!accessToken })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
