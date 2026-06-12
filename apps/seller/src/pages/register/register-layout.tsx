import { LogoHeader } from '@dessert/ui'
import { FormProvider } from 'react-hook-form'
import { Outlet, useLocation } from 'react-router-dom'

import { useRegisterForm } from '@/features/register'
import { ROUTES } from '@/shared/constant/routes'
import {
  RegisterProcessStep,
  RegisterStep,
} from '@/widgets/register-process-step'

const STEP_BY_PATH: Record<string, RegisterStep> = {
  [ROUTES.REGISTER.VERIFICATION]: 1,
  [ROUTES.REGISTER.STORE_INFO]: 2,
  [ROUTES.REGISTER.COMPLETE]: 3,
}

const RegisterLayout = () => {
  const { pathname } = useLocation()
  const currentStep = STEP_BY_PATH[pathname] ?? 1
  const form = useRegisterForm()

  return (
    <FormProvider {...form}>
      <div className="flex h-screen flex-col bg-gray-50">
        <LogoHeader bordered={false} />
        <RegisterProcessStep current={currentStep} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-[1240px] flex-col gap-20 px-[90px] pt-40 pb-0">
            <Outlet />
          </div>
        </main>
      </div>
    </FormProvider>
  )
}

export default RegisterLayout
