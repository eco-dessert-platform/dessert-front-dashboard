import { useState } from 'react'

import { Button, Dropdown, Input, Label } from '@dessert/ui'

const CUSTOM_EMAIL_DOMAIN = 'custom'

const EMAIL_DOMAIN = [
  { label: '선택하세요', value: '' },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'kakao.com', value: 'kakao.com' },
  { label: 'icloud.com', value: 'icloud.com' },
  { label: 'hanmail.net', value: 'hanmail.net' },
  { label: 'hotmail.com', value: 'hotmail.com' },
  { label: 'outlook.com', value: 'outlook.com' },
  { label: '직접 입력', value: CUSTOM_EMAIL_DOMAIN },
]

export function StoreContactAddressForm() {
  const [selectedEmailDomain, setSelectedEmailDomain] = useState('')
  const [emailDomain, setEmailDomain] = useState('')
  return (
    <section className="flex w-full min-w-0 flex-col gap-24">
      <ContactSection />
      <EmailSection
        emailDomain={emailDomain}
        selectedEmailDomain={selectedEmailDomain}
        onEmailDomainChange={setEmailDomain}
        onSelectedEmailDomainChange={setSelectedEmailDomain}
      />

      <AddressSection />
    </section>
  )
}

function ContactSection() {
  return (
    <div>
      <div className="flex w-full flex-col gap-20 2xl:flex-row">
        <Input
          placeholder="01011112222"
          required={true}
          onChange={() => {}}
          label="연락처"
          className="flex-1"
        />
        <Input
          placeholder="01033334444"
          required={false}
          onChange={() => {}}
          label="추가 연락처"
          className="flex-1"
        />
      </div>
      <p className="mt-2 text-[12px] font-normal text-gray-500">
        연락처는 주문서 혹은 상품 페이지 하단에서 고객이 확인할 수 있어요
      </p>
    </div>
  )
}

interface EmailSectionProps {
  emailDomain: string
  selectedEmailDomain: string
  onEmailDomainChange: (value: string) => void
  onSelectedEmailDomainChange: (value: string) => void
}

function EmailSection({
  emailDomain,
  onEmailDomainChange,
  selectedEmailDomain,
  onSelectedEmailDomainChange,
}: EmailSectionProps) {
  const isCustomDomain = selectedEmailDomain === CUSTOM_EMAIL_DOMAIN

  return (
    <div>
      <Label label="이메일" required={true} />
      <div className="flex w-full flex-col gap-20 2xl:flex-row 2xl:items-center">
        <Input
          placeholder="aaa123"
          required={true}
          onChange={() => {}}
          className="flex-1"
        />
        <div className="flex items-center text-[16px] font-normal text-gray-800">
          @
        </div>
        <Input
          placeholder="naver.com"
          value={emailDomain}
          onChange={(event) => onEmailDomainChange(event.target.value)}
          required={true}
          className="flex-1"
          disabled={!isCustomDomain}
        />
        <Dropdown
          options={EMAIL_DOMAIN}
          placeholder="선택하세요"
          value={emailDomain}
          onSelect={(value) => {
            onSelectedEmailDomainChange(value)

            if (value === CUSTOM_EMAIL_DOMAIN) {
              onEmailDomainChange('')
              return
            }

            onEmailDomainChange(value)
          }}
          className="flex-1"
        />
      </div>
    </div>
  )
}

function AddressSection() {
  const [isPostalCodeSelected, setIsPostalCodeSelected] = useState(false)

  const handleClickPostalCodeSearch = () => {
    // 추후 우편번호 검색 라이브러리 연동
    // 주소 선택 완료시 아래 호출
    // setIsPostalCodeSelected(true);
  }

  return (
    <div>
      <div className="flex flex-col gap-24">
        <div className="flex w-full flex-col gap-20 2xl:flex-row">
          <div className="w-full xl:w-[310px] 2xl:shrink-0">
            <Label label="우편번호" required={true} />
            <div className="flex gap-12">
              <Input
                placeholder="12345"
                required={true}
                className="flex-1"
                disabled={true}
              />
              <Button title="우편번호 검색" className="shrink-0" />
            </div>
          </div>

          <Input
            label="출고지 주소"
            placeholder="서울시 강남구 선릉로"
            required={true}
            className="flex-1"
            disabled={true}
          />
        </div>
        <Input
          label="출고지 상세주소"
          placeholder="1동 101호"
          required={true}
          className="flex-1"
          disabled={!isPostalCodeSelected}
        />
      </div>
    </div>
  )
}
