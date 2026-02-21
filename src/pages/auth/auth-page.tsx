import { AUTH_MESSAGES } from '@/features/auth/login/constant/message'
import { LoginFooter } from '@/features/auth/login/login-footer'
import { useSocialLogin } from '@/features/auth/login/login-hooks'
import AuthLoginImage from '@/features/auth/login/login-image'
import { SocialLoginButtons } from '@/features/auth/login/social-login-buttons'
import {
  AuthCard,
  AuthContentWrapper,
  AuthPageContainer,
} from '@/features/auth/ui'
import LogoHeader from '@/shared/components/ui/header/logo-header'

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
              <h1 className="typo-heading-18-b text-gray-900">
                {AUTH_MESSAGES.LOGIN.TITLE}
              </h1>
              <p className="typo-title-16-m whitespace-pre-wrap text-gray-700">
                {AUTH_MESSAGES.LOGIN.DESCRIPTION}
              </p>
            </div>

            <SocialLoginButtons />
          </div>
        </AuthCard>
      </AuthContentWrapper>

      <LoginFooter />
    </AuthPageContainer>
  )
}

export default AuthPage
