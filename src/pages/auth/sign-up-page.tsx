import { useState } from 'react'

import { AuthPageContainer } from '@/features/auth/ui'
import CompleteStep from '@/features/auth/ui/complete-step'
import { SellerVerificationStep } from '@/features/auth/ui/seller-verification-step'
import StoreInformationStep from '@/features/auth/ui/store-information-step'
import BottomNavBar from '@/shared/block/bottom-nav-bar/bottom-nav-bar'
import LogoHeader from '@/shared/ui/header/logo-header'
import { ProcessTab } from '@/shared/ui/tab/process-tab'

function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <AuthPageContainer>
      <LogoHeader />
      <ProcessTab
        currentStep={currentStep}
        steps={['판매자 인증', '스토어 정보 등록', '회원가입 완료']}
      />
      <div className="mx-auto mb-[104px] size-full max-w-[1048px] gap-4 space-y-20 py-40">
        {currentStep === 1 && <SellerVerificationStep />}
        {currentStep === 2 && <StoreInformationStep />}
        {currentStep === 3 && <CompleteStep />}
      </div>
      <ProcessNavbarSection
        currentStep={currentStep}
        onChangeStep={setCurrentStep}
      />
    </AuthPageContainer>
  )
}

export default SignUpPage

function ProcessNavbarSection({
  currentStep,
  onChangeStep,
}: {
  currentStep: number
  onChangeStep: (step: number) => void
}) {
  const onClickNext = () => {
    onChangeStep(currentStep + 1)
  }
  const onClickPrevious = () => {
    onChangeStep(currentStep - 1)
  }

  if (currentStep === 3) {
    return null
  }
  return (
    <BottomNavBar
      items={[
        {
          label: currentStep === 2 ? '확인' : '다음',
          variant: 'primary-outlined',
          onClick: () => onClickNext(),
        },
        {
          label: '수정하기',
          variant: 'primary-filled',
          onClick: () => onClickPrevious(),
        },
      ]}
    />
  )
}
