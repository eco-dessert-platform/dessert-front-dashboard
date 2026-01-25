import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

function App({ router }: { router: ReturnType<typeof createBrowserRouter> }) {
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
    <>
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
    </>
  )
}

export default App
