import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from 'src/pages/HomePage'
import AuthPage from 'src/pages/auth/auth-page'

function App() {
  const [queryClient] = useState(() => new QueryClient())

  // 새로 고침시 애니메이션, 임시 배경색상 처리
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = document.documentElement
        const computedBg =
          getComputedStyle(root).getPropertyValue('--background')

        if (computedBg?.trim()) {
          root.style.backgroundColor = ''
          document.body.classList.remove('preload')
          document.documentElement.classList.remove('theme-instant')
        }
      })
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
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
    </QueryClientProvider>
  )
}

export default App
