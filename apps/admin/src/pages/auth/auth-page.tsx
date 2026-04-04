import { LogoHeader } from '@dessert/ui'

import { AuthLoginImage, LoginFooter, LoginForm } from '@/features/auth'

const AuthPage = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <LogoHeader />
      <main className="flex flex-1 flex-col items-center justify-center overflow-hidden p-6">
        <div className="w-full max-w-[1048px]">
          <div className="flex flex-1 items-center gap-4 self-stretch overflow-hidden rounded-20 border border-gray-200 bg-white p-2.5">
            <AuthLoginImage className="hidden max-h-[746px] max-w-[595px] lg:block" />
            <LoginForm />
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  )
}

export default AuthPage
