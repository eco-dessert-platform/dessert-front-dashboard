import { LogoHeader } from '@dessert/ui'

import { AUTH_MESSAGES } from '@/features/auth/login/constant/message'
import { LoginFooter } from '@/features/auth/login/login-footer'
import { useSocialLogin } from '@/features/auth/login/login-hooks'
import { AuthLoginImage } from '@/features/auth/login/login-image'
import {
  AuthCard,
  AuthContentWrapper,
  AuthPageContainer,
} from '@/features/auth/ui'

const AuthPage = () => {
  useSocialLogin()

  return (
    <AuthPageContainer>
      <LogoHeader />

      <AuthContentWrapper centered>
        <AuthCard className="max-w-[1240px]">
          <AuthLoginImage className="hidden max-h-[746px] max-w-[595px] lg:block" />

          <div className="flex flex-1 flex-col items-center justify-center gap-56 px-5 py-10 lg:py-0">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-gray-900">{AUTH_MESSAGES.LOGIN.TITLE}</h1>
              <p className="whitespace-pre-wrap text-gray-700">
                {AUTH_MESSAGES.LOGIN.DESCRIPTION}
              </p>
            </div>

            {/* <SocialLoginButtons /> */}
          </div>
        </AuthCard>
      </AuthContentWrapper>

      <LoginFooter />
    </AuthPageContainer>
  )
}

export default AuthPage
