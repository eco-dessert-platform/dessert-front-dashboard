import React from 'react'
import '@/styles/index.css'

import ReactDOM from 'react-dom/client'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import AuthPage from './pages/auth/auth-page'
import ProductPage from '@/pages/product/product-page'
import { ROUTES } from '@/shared/constant/routes'

import App from './App'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.PRODUCTS.ROOT} replace />,
      },
      {
        path: ROUTES.PRODUCTS.ROOT,
        element: <ProductPage />,
      },
      {
        path: ROUTES.LOGIN.ROOT,
        element: <AuthPage />,
      },
    ],
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>,
)
