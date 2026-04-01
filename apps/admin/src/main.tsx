import '@/styles/index.css'

import ReactDOM from 'react-dom/client'
import { Navigate, createBrowserRouter } from 'react-router-dom'

// import ProductPage from '@/pages/product/product-page'
// import { ROUTES } from '@/shared/constant/routes'

import { ROUTES } from '@/shared/constant/routes'

import App from './App'
import AuthPage from './pages/auth/auth-page'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.HOME} replace />,
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

ReactDOM.createRoot(rootElement).render(<App router={router} />)
