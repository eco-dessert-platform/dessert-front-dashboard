import '@/styles/index.css'

import ReactDOM from 'react-dom/client'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import AuthPage from '@/pages/auth/auth-page'
import SocialCallbackPage from '@/pages/auth/social-callback-page'
import AllOrdersPage from '@/pages/orders/all-orders/all-orders-page'
import CompletedOrdersPage from '@/pages/orders/completed-orders/completed-orders-page'
import CreatePage from '@/pages/products/create/create-page'
import { DetailEditPage } from '@/pages/products/create/detail-edit-page'
import ProductsPage from '@/pages/products/product/product-page'
import CompletePage from '@/pages/register/complete/complete-page'
import RegisterLayout from '@/pages/register/register-layout'
import StoreInfoPage from '@/pages/register/store-info/store-info-page'
import VerificationPage from '@/pages/register/verification/verification-page'
import SettlementPage from '@/pages/settlement/settlement-page'
import SalesAnalyticsPage from '@/pages/statistics/sales-analytics/sales-analytics-page'
import { ROUTES } from '@/shared/constant/routes'

import App from './App'
import { SellerInfoPage } from './pages/seller-info/seller-info-page'
import FixedLayout from './shared/block/fixed-layout/fixed-layout'

const router = createBrowserRouter([
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
  },
  {
    path: ROUTES.CALLBACK.SOCIAL,
    element: <SocialCallbackPage />,
  },
  { path: ROUTES.PRODUCTS.CREATE_DETAIL, element: <DetailEditPage /> },
  {
    path: ROUTES.REGISTER.DEFAULT,
    element: <RegisterLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.REGISTER.VERIFICATION} replace />,
      },
      { path: ROUTES.REGISTER.VERIFICATION, element: <VerificationPage /> },
      { path: ROUTES.REGISTER.STORE_INFO, element: <StoreInfoPage /> },
      { path: ROUTES.REGISTER.COMPLETE, element: <CompletePage /> },
    ],
  },
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

      { path: ROUTES.SETTLEMENTS.ALL, element: <SettlementPage /> },
      {
        path: ROUTES.STATISTICS.SALES_ANALYTICS,
        element: <SalesAnalyticsPage />,
      },
      { path: ROUTES.INFO.CHANGE, element: <SellerInfoPage /> },
    ],
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(<App router={router} />)
