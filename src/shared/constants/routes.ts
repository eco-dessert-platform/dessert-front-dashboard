export const ROUTES = {
  HOME: '/',
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
	},
} as const