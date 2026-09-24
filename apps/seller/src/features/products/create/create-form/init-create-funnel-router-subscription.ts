import type { createBrowserRouter } from 'react-router-dom'

import { clearCreateFormSession } from './clear-create-form-persistence.utils'
import {
  clearFunnelNavigationState,
  isCreateFunnelRoute,
  setPreviousRoute,
} from './create-funnel-navigation.utils'

export function initCreateFunnelRouterSubscription(
  router: ReturnType<typeof createBrowserRouter>,
) {
  let previousPath = router.state.location.pathname

  return router.subscribe((state) => {
    const currentPath = state.location.pathname
    const wasInFunnel = isCreateFunnelRoute(previousPath)
    const isInFunnel = isCreateFunnelRoute(currentPath)

    if (wasInFunnel && !isInFunnel) {
      clearCreateFormSession()
      clearFunnelNavigationState()
    }

    if (isInFunnel) {
      setPreviousRoute(previousPath)
    }

    previousPath = currentPath
  })
}
