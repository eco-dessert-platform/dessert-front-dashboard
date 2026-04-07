export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  CALLBACK: {
    SOCIAL: '/callback/social',
  },
  ORDERS: {
    ALL: '/orders',
    COMPLETED: '/orders/completed',
  },
  PRODUCTS: {
    ALL: '/products',
    CREATE: '/products/create',
  },
  SETTLEMENTS: {
    ALL: '/settlements',
    CHARGE: '/settlements/charge',
    WITHHELD: '/settlements/withheld',
    VAT_REPORT: '/settlements/vat-report',
    TAX_INVOICE: '/settlements/tax-invoice',
  },
} as const
