import { ROUTES } from '@/shared/constant/routes'

const PREVIOUS_ROUTE_KEY = 'product-create-previous-route'

export const CREATE_FUNNEL_ROUTES = [
  ROUTES.PRODUCTS.CREATE,
  ROUTES.PRODUCTS.CREATE_DETAIL,
] as const

export type CreateFunnelRoute = (typeof CREATE_FUNNEL_ROUTES)[number]

export const FROM_DETAIL_PAGE_STATE = { fromDetailPage: true } as const

export function isCreateFunnelRoute(pathname: string): boolean {
  return CREATE_FUNNEL_ROUTES.includes(pathname as CreateFunnelRoute)
}

export function setPreviousRoute(pathname: string) {
  sessionStorage.setItem(PREVIOUS_ROUTE_KEY, pathname)
}

export function getPreviousRoute(): string | null {
  return sessionStorage.getItem(PREVIOUS_ROUTE_KEY)
}

export function clearFunnelNavigationState() {
  sessionStorage.removeItem(PREVIOUS_ROUTE_KEY)
}

export function shouldRestoreCreateForm(
  locationState: unknown = null,
): boolean {
  if (
    locationState &&
    typeof locationState === 'object' &&
    'fromDetailPage' in locationState &&
    (locationState as { fromDetailPage?: boolean }).fromDetailPage === true
  ) {
    return true
  }

  return getPreviousRoute() === ROUTES.PRODUCTS.CREATE_DETAIL
}

export type CreateFormEntryMode = 'restore' | 'reset'

export function resolveCreateFormEntryMode(
  locationState: unknown = null,
): CreateFormEntryMode {
  return shouldRestoreCreateForm(locationState) ? 'restore' : 'reset'
}

type NavigateFn = (to: string, options?: { state?: unknown }) => void

export function navigateToCreateDetail(navigate: NavigateFn) {
  navigate(ROUTES.PRODUCTS.CREATE_DETAIL)
}

export function navigateBackToCreateFromDetail(navigate: NavigateFn) {
  navigate(ROUTES.PRODUCTS.CREATE, { state: FROM_DETAIL_PAGE_STATE })
}
