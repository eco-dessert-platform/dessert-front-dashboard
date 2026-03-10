import '@/styles/index.css'

import AllOrdersPage from '@/pages/orders/all-orders/all-orders-page'
import CompletedOrdersPage from '@/pages/orders/completed-orders/completed-orders-page'
import CreatePage from '@/pages/products/create/create-page'
import ProductsPage from '@/pages/products/product/product-page'
import { ROUTES } from '@/shared/constants/routes'
import ReactDOM from 'react-dom/client'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from './App'
import SignUpPage from './pages/auth/sign-up-page'
import FixedLayout from './shared/components/blocks/fixed-layout/fixed-layout'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <FixedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.PRODUCTS.ALL} replace />,
      },
      { path: ROUTES.ORDERS.ALL, element: <AllOrdersPage /> },
      { path: ROUTES.ORDERS.COMPLETED, element: <CompletedOrdersPage /> },
      { path: ROUTES.PRODUCTS.ALL, element: <ProductsPage /> },
      { path: ROUTES.PRODUCTS.CREATE, element: <CreatePage /> },
    ],
  },
  {
    path: ROUTES.AUTH.SIGN_UP,
    element: <SignUpPage />,
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(<App router={router} />)
