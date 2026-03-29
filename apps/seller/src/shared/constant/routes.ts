export const ROUTES = {
  HOME: '/',
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
    WITHHELD: '/settlements/withheld',
    VAT_REPORT: '/settlements/vat-report',
    TAX_INVOICE: '/settlements/tax-invoice',
  },
} as const
