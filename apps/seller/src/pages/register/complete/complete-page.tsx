import { deleteCookie } from '@dessert/core'
import { Button } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/entity/auth'
import {
  StoreApplicationStatus,
  registerQueries,
} from '@/entity/register'
import { ROUTES } from '@/shared/constant/routes'
import { AuthFlowCard, AuthFlowImage } from '@/shared/ui/auth-flow-card'

import { REGISTER_MESSAGES } from '../register.constant'

const STATUS_LABEL: Record<StoreApplicationStatus, string> = {
  PENDING: '승인 대기중',
  APPROVED: '승인 완료',
  REJECTED: '승인 거절',
}

const CompletePage = () => {
  const navigate = useNavigate()
  const sellerStatus = useAuthStore((s) => s.sellerStatus)
  const setSellerStatus = useAuthStore((s) => s.setSellerStatus)
  const logout = useAuthStore((s) => s.logout)
  const { data: application, isLoading } = useQuery({
    ...registerQueries.application(),
    retry: false,
  })

  const status: StoreApplicationStatus =
    application?.status ??
    (sellerStatus === 'APPROVED' ||
    sellerStatus === 'PENDING' ||
    sellerStatus === 'REJECTED'
      ? sellerStatus
      : 'PENDING')

  const copy = REGISTER_MESSAGES.COMPLETE[status]

  const handleCta = () => {
    if (status === 'APPROVED') {
      setSellerStatus('APPROVED')
      navigate(ROUTES.PRODUCTS.ALL, { replace: true })
      return
    }

    deleteCookie('accessToken')
    logout()
    navigate(ROUTES.AUTH, { replace: true })
  }

  return (
    <div className="flex flex-1 items-center justify-center pb-40">
      <AuthFlowCard
        image={
          <AuthFlowImage className="hidden max-h-[746px] max-w-[595px] lg:block" />
        }
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="typo-heading-18-b text-gray-900">{copy.TITLE}</h1>
          {!isLoading && application && (
            <div className="flex items-center gap-8 pt-4">
              <span className="typo-title-16-sb text-gray-900">
                {application.name}
              </span>
              <span className="rounded-full bg-gray-100 px-8 py-2 typo-body-12-m text-gray-700">
                {STATUS_LABEL[application.status]}
              </span>
            </div>
          )}
          <p className="typo-title-16-m whitespace-pre-wrap text-gray-700">
            {copy.DESCRIPTION}
          </p>
        </div>

        <Button
          title={copy.CTA}
          variant="primary-outlined"
          size="lg"
          className="w-[408px]"
          onClick={handleCta}
        />
      </AuthFlowCard>
    </div>
  )
}

export default CompletePage
