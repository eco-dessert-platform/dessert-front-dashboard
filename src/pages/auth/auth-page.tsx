import BgrHeader from 'src/shared/components/header/BgrHeader'
import { useSocialLogin } from 'src/features/auth/login/login-hooks'
import { LoginFooter } from 'src/features/auth/login/login-footer'
import { SocialLoginButtons } from 'src/features/auth/login/social-login-buttons'
import { AUTH_MESSAGES } from 'src/features/auth/login/schema/contracts'
import {
  AuthPageContainer,
  AuthContentWrapper,
  AuthCard,
  ImagePlaceholder,
} from 'src/features/auth/components'

const AuthPage = () => {
  useSocialLogin()

  return (
    <AuthPageContainer>
      <BgrHeader />

      <AuthContentWrapper centered fullHeight>
        <AuthCard>
          <ImagePlaceholder className="hidden max-h-[746px] max-w-[595px] lg:block" />

          <div className="flex flex-1 flex-col items-center gap-14 px-5 py-10 lg:py-0">
            <div className="flex flex-col items-start gap-1">
              <p className="text-[24px] font-bold text-gray-900">
                {AUTH_MESSAGES.LOGIN.TITLE}
              </p>
              <p className="text-[16px] text-gray-600">
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
