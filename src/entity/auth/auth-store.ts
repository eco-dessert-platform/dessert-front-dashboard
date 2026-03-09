import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SocialType } from './types'

interface AuthState {
  isLoggedIn: boolean
  socialLoginType: SocialType | null
  setSocialLoginType: (type: SocialType | null) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      socialLoginType: null,
      setSocialLoginType: (type) => set({ socialLoginType: type }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      logout: () => set({ isLoggedIn: false, socialLoginType: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
