import BgrHeader from 'src/shared/components/header/BgrHeader'
import { useSocialLogin } from 'src/features/auth/login/login-hooks'
import { LoginFooter } from 'src/features/auth/login/login-footer'
import { SocialLoginButtons } from 'src/features/auth/login/social-login-buttons'
import { AUTH_MESSAGES } from 'src/features/auth/login/constant/message'
import AuthLoginImage from 'src/features/auth/login/login-image'
import {
  AuthPageContainer,
  AuthContentWrapper,
  AuthCard,
} from 'src/features/auth/ui'

const AuthPage = () => {
  useSocialLogin()

  return (
    <AuthPageContainer>
      <BgrHeader />

      <AuthContentWrapper centered>
        <AuthCard className="max-w-[1240px]">
          <AuthLoginImage className="hidden max-h-[746px] max-w-[595px] lg:block" />

          <div className="flex flex-1 flex-col items-center justify-center gap-[56px] px-5 py-10 lg:py-0">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-heading-18-b text-gray-900">
                {AUTH_MESSAGES.LOGIN.TITLE}
              </h1>
              <p className="text-title-16-m whitespace-pre-wrap text-gray-700">
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
