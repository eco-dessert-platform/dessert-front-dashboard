import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
