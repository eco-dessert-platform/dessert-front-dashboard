import Button from '@/shared/ui/button/button'

import { AuthCard } from './auth-card'
import { AuthContentWrapper } from './auth-content-wrapper'
import { AUTH_MESSAGES } from '../login/constant/message'
import AuthLoginImage from '../login/login-image'

function CompleteStep() {
  return (
    <>
      <AuthContentWrapper centered>
        <AuthCard className="max-w-[1240px]">
          <AuthLoginImage className="hidden max-h-[746px] max-w-[595px] lg:block" />

          <div className="flex flex-1 flex-col items-center justify-center gap-56 px-20 py-10">
            <div className="flex flex-col items-start gap-4">
              <h1 className="typo-heading-18-b text-gray-900">
                {AUTH_MESSAGES.REGISTER_SUCCESS.TITLE}
              </h1>
              <p className="typo-title-16-m whitespace-pre-wrap text-gray-700">
                {AUTH_MESSAGES.REGISTER_SUCCESS.DESCRIPTION}
              </p>
            </div>
            <Button
              title="첫 화면으로 이동"
              onClick={() => {}}
              size="lg"
              variant="primary-outlined"
              className="w-full"
            />
          </div>
        </AuthCard>
      </AuthContentWrapper>
    </>
  )
}

export default CompleteStep
