export const ROUTES = {
  HOME: '/',
	AUTH: {
		SIGN_UP: '/auth/sign-up',
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
	},
} as const