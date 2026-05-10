import { LogoHeader } from '@dessert/ui'

import {
  AUTH_MESSAGES,
  LoginFooter,
  SocialLoginButtons,
} from '@/features/auth/login'
import { AuthFlowCard, AuthFlowImage } from '@/shared/ui/auth-flow-card'

const AuthPage = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <LogoHeader />

      <main className="flex flex-1 flex-col items-center justify-center overflow-hidden p-6">
        <div className="w-full max-w-[1050px]">
          <AuthFlowCard
            image={
              <AuthFlowImage className="hidden max-h-[746px] max-w-[595px] lg:block" />
            }
          >
            <div className="flex flex-col items-start gap-1">
              <h1 className="typo-heading-18-b text-gray-900">
                {AUTH_MESSAGES.LOGIN.TITLE}
              </h1>
              <p className="typo-title-16-m whitespace-pre-wrap text-gray-700">
                {AUTH_MESSAGES.LOGIN.DESCRIPTION}
              </p>
            </div>

            <SocialLoginButtons />
          </AuthFlowCard>
        </div>
      </main>

      <LoginFooter />
    </div>
  )
}

export default AuthPage
