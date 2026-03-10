import InputField from '@/shared/components/blocks/input-field/input-field'
import Checkbox from '@/shared/components/ui/checkbox/checkbox'
import Divider from '@/shared/components/ui/divider/divider'
import { useState } from 'react'
import { AGREEMENT_DATA, PRIVACY_POLICY_DATA } from './const'

function StoreInformationStep() {
  return (
    <>
      <StoreInformationSection />
      <AgreementSection />
    </>
  )
}

export default StoreInformationStep

function StoreInformationSection() {
  const statusMsg = '승인 대기 : 요청하신 등록이 승인 진행 중이에요'
  const [storeName, setStoreName] = useState('')

  const handleStoreNameButtonClick = () => {
    setStoreName('빵그리의 오븐 본점')
  }
  return (
    <div className="rounded-10 flex flex-col items-start gap-4 bg-white p-10">
      <div className="px-24 pt-[16px] pb-[12px]">
        <h2 className="typo-heading-20-sb text-gray-900">스토어 정보 등록</h2>
      </div>
      <div className="flex w-full flex-col gap-[16px] px-24 pt-[10px] pb-[16px]">
        <InputField
          label="스토어명"
          placeholder="스토어를 검색해주세요"
          required
          buttonText="검색"
          readOnly
          helperText={storeName ? statusMsg : undefined}
          value={storeName}
          onButtonClick={handleStoreNameButtonClick}
        />
      </div>
    </div>
  )
}

function AgreementSection() {
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false)

  const handleAllCheckedChange = (checked: boolean | 'indeterminate') => {
    const next = checked === true
    setIsAllChecked(next)
    setIsAgreementChecked(next)
    setIsPrivacyPolicyChecked(next)
  }

  const handleAgreementCheckedChange = (checked: boolean | 'indeterminate') => {
    const next = checked === true
    setIsAgreementChecked(next)
    setIsAllChecked(next && isPrivacyPolicyChecked)
  }

  const handlePrivacyPolicyCheckedChange = (
    checked: boolean | 'indeterminate',
  ) => {
    const next = checked === true
    setIsPrivacyPolicyChecked(next)
    setIsAllChecked(isAgreementChecked && next)
  }
  return (
    <div className="rounded-10 flex flex-col items-start gap-4 bg-white p-10 px-24">
      <div className="pt-16 pb-12">
        <h2 className="typo-heading-20-sb text-gray-900">이용 약관 동의</h2>
      </div>
      <div className="flex w-full flex-col gap-16">
        <Checkbox
          label="전체 동의"
          type="single"
          checked={isAllChecked}
          onCheckedChange={handleAllCheckedChange}
        />
        <Divider />
        <div className="flex w-full flex-col gap-16">
          <Checkbox
            label={
              <div className="flex">
                <h2 className="typo-body-16-m text-gray-900">이용약관</h2>
                <h2 className="typo-body-16-m text-primary-500">(필수)</h2>
              </div>
            }
            type="single"
            checked={isAgreementChecked}
            onCheckedChange={handleAgreementCheckedChange}
          />
          <div className="rounded-10 h-[200px] border border-gray-200 p-16">
            {AGREEMENT_DATA.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <h2 className="typo-title-14-sb text-gray-700">{item.title}</h2>
                <p className="typo-title-14-r text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
          <Checkbox
            label={
              <div className="flex">
                <h2 className="typo-body-16-m text-gray-900">
                  개인정보 처리방침
                </h2>
                <h2 className="typo-body-16-m text-primary-500">(필수)</h2>
              </div>
            }
            type="single"
            checked={isPrivacyPolicyChecked}
            onCheckedChange={handlePrivacyPolicyCheckedChange}
          />
          <div className="rounded-10 h-[200px] border border-gray-200 p-16">
            {PRIVACY_POLICY_DATA.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <h2 className="typo-title-14-sb text-gray-700">{item.title}</h2>
                <p className="typo-title-14-r text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
