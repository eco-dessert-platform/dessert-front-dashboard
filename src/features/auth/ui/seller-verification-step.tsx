import InputField from '@/shared/components/blocks/input-field/input-field'
import Button from '@/shared/components/ui/button/button'
import { ChangeEventHandler, useRef, useState } from 'react'

export function SellerVerificationStep() {
  return (
    <>
      <RequiredSection />
      <BusinessAccountVerificationSection />
    </>
  )
}

function RequiredSection() {
  const businessRegFileInputRef = useRef<HTMLInputElement | null>(null)
  const [businessRegFileName, setBusinessRegFileName] = useState('')

  const telecomFileInputRef = useRef<HTMLInputElement | null>(null)
  const [telecomFileName, setTelecomFileName] = useState('')

  const foodLicenseFileInputRef = useRef<HTMLInputElement | null>(null)
  const [foodLicenseFileName, setFoodLicenseFileName] = useState('')

  const handleBusinessRegUploadClick = () => {
    businessRegFileInputRef.current?.click()
  }

  const handleBusinessRegFileChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setBusinessRegFileName(file.name)
  }

  const handleTelecomUploadClick = () => {
    telecomFileInputRef.current?.click()
  }

  const handleTelecomFileChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setTelecomFileName(file.name)
  }

  const handleFoodLicenseUploadClick = () => {
    foodLicenseFileInputRef.current?.click()
  }

  const handleFoodLicenseFileChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFoodLicenseFileName(file.name)
  }

  return (
    <div className="rounded-10 flex w-full flex-col items-start gap-4 bg-white p-10">
      <div className="px-24 pt-16 pb-12">
        <h2 className="typo-heading-20-sb text-gray-900">필수 서류 등록</h2>
        <h2 className="typo-body-16-r text-gray-700">
          파일은 10MB 이하의 jpg, jpeg, png, pdf만 등록이 가능해요
        </h2>
      </div>
      <div className="flex w-full flex-col gap-[16px] px-24 pt-[10px] pb-[16px]">
        <InputField
          label="사업자 등록증"
          buttonText="업로드"
          required
          placeholder="사업자 등록증을 등록해주세요"
          value={businessRegFileName}
          readOnly
          onButtonClick={handleBusinessRegUploadClick}
        />
        <input
          ref={businessRegFileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleBusinessRegFileChange}
        />
        <InputField
          label="통신판매업 신고증"
          buttonText="업로드"
          required
          placeholder="통신판매업 신고증을 업로드해주세요"
          value={telecomFileName}
          readOnly
          onButtonClick={handleTelecomUploadClick}
        />
        <input
          ref={telecomFileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleTelecomFileChange}
        />
        <InputField
          label="즉석식품제조가공업 & 식품제조업"
          buttonText="업로드"
          required
          placeholder="즉석식품제조가공업 & 식품제조업을 업로드해주세요"
          value={foodLicenseFileName}
          readOnly
          onButtonClick={handleFoodLicenseUploadClick}
        />
        <input
          ref={foodLicenseFileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleFoodLicenseFileChange}
        />
      </div>
    </div>
  )
}

function BusinessAccountVerificationSection() {
  const passbookFileInputRef = useRef<HTMLInputElement | null>(null)
  const [passbookFileName, setPassbookFileName] = useState('')

  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')

  const handlePassbookUploadClick = () => {
    passbookFileInputRef.current?.click()
  }

  const handlePassbookFileChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setPassbookFileName(file.name)
  }

  const handleBankNameChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setBankName(event.target.value)
  }

  const handleAccountNumberChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAccountNumber(event.target.value)
  }

  const handleVerifyAccountClick = () => {
    if (!passbookFileName || !bankName || !accountNumber) {
      // TODO: 추후 토스트/에러 처리로 교체
      console.log('계좌 인증을 위해 모든 정보를 입력해 주세요.')
      return
    }

    // TODO: 실제 계좌 인증 API 연동
    console.log('계좌 인증 요청', {
      passbookFileName,
      bankName,
      accountNumber,
    })
  }

  return (
    <div className="rounded-10 flex flex-col items-start gap-4 bg-white p-10">
      <div className="px-24 pt-[16px] pb-[12px]">
        <h2 className="typo-heading-20-sb text-gray-900">
          사업자 명의 계좌 인증
        </h2>
        <h2 className="typo-body-16-r text-gray-700">
          사업자 명의의 통장 사본과 일치하는 계좌번호로 인증해주세요
        </h2>
      </div>
      <div className="flex w-full flex-col gap-[16px] px-24 pt-[10px] pb-[16px]">
        <InputField
          label="사업자 명의 통장사본"
          buttonText="업로드"
          required
          placeholder="대표자명 혹은 사업자명의 통장 사본을 업로드해주세요(10MB 이하의 jpg, jpeg, png, pdf)"
          helperText="예금주는 대표자명 혹은 사업자명과 일치하는 계좌번호만 인증이 가능해요"
          value={passbookFileName}
          readOnly
          onButtonClick={handlePassbookUploadClick}
        />
        <input
          ref={passbookFileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handlePassbookFileChange}
        />
        <div className="flex items-end gap-16">
          <InputField
            label="은행명"
            placeholder="은행명"
            value={bankName}
            onChange={handleBankNameChange}
            onButtonClick={() => {}}
          />
          <InputField
            label="계좌번호"
            placeholder="계좌번호"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            onButtonClick={() => {}}
          />
          <Button
            title="계좌인증"
            size="md"
            onClick={handleVerifyAccountClick}
            disabled={false}
            className="whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  )
}
