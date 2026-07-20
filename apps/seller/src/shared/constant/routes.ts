export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  CALLBACK: {
    SOCIAL: '/callback/social',
  },
  REGISTER: {
    DEFAULT: '/register',
    VERIFICATION: '/register/verification',
    STORE_INFO: '/register/store-info',
    COMPLETE: '/register/complete',
  },
  ORDERS: {
    ALL: '/orders',
    COMPLETED: '/orders/completed',
  },
  PRODUCTS: {
    ALL: '/products',
    CREATE: '/products/create',
    CREATE_DETAIL: '/products/create/detail',
  },
  SETTLEMENTS: {
    ALL: '/settlements',
    CHARGE: '/settlements/charge',
    PAYMENT_HOLD: '/settlements/payment-hold',
    VAT_REPORT: '/settlements/vat-report',
    TAX_INVOICE: '/settlements/tax-invoice',
  },
  STATISTICS: {
    SALES_ANALYTICS: '/statistics/sales-analytics',
  },
  INFO: {
    CHANGE: '/seller/info',
  },
} as const
