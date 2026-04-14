import { useEffect, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import { useAuthStore } from '@/entity/auth'
import { setupAuthResponseInterceptor } from '@/shared/utils'

setupAuthResponseInterceptor(() => useAuthStore.getState().logout())

function App({ router }: { router: ReturnType<typeof createBrowserRouter> }) {
  const [queryClient] = useState(() => new QueryClient())
  const syncAuthState = useAuthStore((state) => state.syncAuthState)

  const isReady = useAuthStore((state) => state.isReady)

  useEffect(() => {
    syncAuthState()
  }, [syncAuthState])

  if (!isReady) return null

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="!p-0 !bg-transparent !shadow-none !min-w-0"
      />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App
