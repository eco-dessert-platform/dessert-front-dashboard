import { Button } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { StoreApplicationStatus, registerQueries } from '@/entity/register'
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
  const { data: application } = useQuery(registerQueries.application())

  return (
    <div className="flex flex-1 items-center justify-center pb-40">
      <AuthFlowCard
        image={
          <AuthFlowImage className="hidden max-h-[746px] max-w-[595px] lg:block" />
        }
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="typo-heading-18-b text-gray-900">
            {REGISTER_MESSAGES.COMPLETE.TITLE}
          </h1>
          {application && (
            <div className="flex items-center gap-8 pt-4">
              <span className="typo-title-16-sb text-gray-900">
                {application.name}
              </span>
              <span className="typo-body-12-m rounded-full bg-gray-100 px-8 py-2 text-gray-700">
                {STATUS_LABEL[application.status]}
              </span>
            </div>
          )}
          <p className="typo-title-16-m whitespace-pre-wrap text-gray-700">
            {REGISTER_MESSAGES.COMPLETE.DESCRIPTION}
          </p>
        </div>

        <Button
          title="첫 화면으로 이동"
          variant="primary-outlined"
          size="lg"
          className="w-[408px]"
          onClick={() => navigate(ROUTES.HOME)}
        />
      </AuthFlowCard>
    </div>
  )
}

export default CompletePage
