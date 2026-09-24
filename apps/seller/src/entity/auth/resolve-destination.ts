import { ROUTES } from '@/shared/constant/routes'

import type { SellerStatus } from './types'

/** OAuth/가드에서 셀러 상태에 따라보낼 경로 */
export function getPostLoginPath(status: SellerStatus): string {
  switch (status) {
    case 'NEW':
      return ROUTES.REGISTER.VERIFICATION
    case 'PENDING':
    case 'REJECTED':
      return ROUTES.REGISTER.COMPLETE
    case 'APPROVED':
      return ROUTES.PRODUCTS.ALL
  }
}
