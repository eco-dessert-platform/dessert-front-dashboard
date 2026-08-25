import { cn } from '@dessert/core'
import { Checkbox } from '@dessert/ui'
import { useFormContext, useWatch } from 'react-hook-form'

import { RegisterForm } from '@/entity/register'

import type { CheckedState } from '@radix-ui/react-checkbox'

interface TermsItem {
  id: string
  title: string
  required: boolean
  fieldName: 'agreeToServiceTerms' | 'agreeToPrivacyPolicy'
  renderContent: () => React.ReactNode
}

const TERMS_ITEMS: TermsItem[] = [
  {
    id: 'service',
    title: '이용약관',
    required: true,
    fieldName: 'agreeToServiceTerms',
    renderContent: () => <ServiceTerms />,
  },
  {
    id: 'privacy',
    title: '개인정보 처리방침',
    required: true,
    fieldName: 'agreeToPrivacyPolicy',
    renderContent: () => <PrivacyTerms />,
  },
]

export function TermsAgreement() {
  const { control, setValue } = useFormContext<RegisterForm>()
  const agreements = useWatch({
    control,
    name: TERMS_ITEMS.map((item) => item.fieldName),
  })

  const checkedCount = agreements.filter(Boolean).length
  const allState: CheckedState =
    checkedCount === 0
      ? false
      : checkedCount === TERMS_ITEMS.length
        ? true
        : 'indeterminate'

  const handleToggleAll = (checked: CheckedState) => {
    const next = checked === true
    TERMS_ITEMS.forEach((item) => {
      setValue(item.fieldName, next, { shouldDirty: true })
    })
  }

  const handleToggleItem =
    (fieldName: TermsItem['fieldName']) => (checked: CheckedState) => {
      setValue(fieldName, checked === true, { shouldDirty: true })
    }

  return (
    <section className="flex w-full flex-col overflow-clip rounded-16 bg-white">
      <header className="flex items-center justify-between px-24 pt-16 pb-12">
        <h2 className="typo-heading-20-sb text-gray-900">이용 약관 동의</h2>
      </header>

      <div className="flex flex-col items-start px-24 pt-12 pb-16">
        <div className="flex w-full flex-col items-start gap-16">
          <Checkbox
            label="전체 동의"
            size="lg"
            type="multiple"
            checked={allState}
            onCheckedChange={handleToggleAll}
          />

          <div className="h-8 w-full border-b border-gray-200" />

          {TERMS_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="flex w-full flex-col items-start gap-8"
            >
              <div className="flex items-center gap-8">
                <Checkbox
                  size="lg"
                  checked={Boolean(agreements[index])}
                  onCheckedChange={handleToggleItem(item.fieldName)}
                  aria-label={
                    item.required ? `${item.title} (필수)` : item.title
                  }
                />
                <div
                  aria-hidden
                  className="flex items-center gap-2 typo-title-16-m whitespace-nowrap"
                >
                  <span className="text-gray-900">{item.title}</span>
                  {item.required && (
                    <span className="text-primary-500">(필수)</span>
                  )}
                </div>
              </div>
              <div
                tabIndex={0}
                role="region"
                aria-label={`${item.title} 본문`}
                className={cn(
                  'flex h-[200px] w-full flex-col items-start gap-4 overflow-y-auto rounded-10 border border-gray-300 p-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                )}
              >
                {item.renderContent()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Clause({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2 typo-title-14-r text-gray-700">
      <p className="typo-title-14-sb">{title}</p>
      <div className="w-full">{children}</div>
    </div>
  )
}

function ServiceTerms() {
  return (
    <>
      <Clause title="제1조 목적">
        <p>
          이 약관은 ‘빵그리의 오븐’(이하 ‘회사’)이 운영하는 플랫폼을 통해
          제공되는 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및
          책임사항을 규정함을 목적으로 합니다.
        </p>
      </Clause>
      <Clause title="제2조 용어 정의">
        <ol className="list-decimal pl-[21px]">
          <li>
            “서비스”란 회사가 운영하는 웹사이트 및 앱을 통해 제공하는 건강
            디저트 관련 정보, 상품 판매, 예약 및 홍보 서비스를 말합니다.
          </li>
          <li>
            “판매자”란 회사의 입점 절차를 거쳐 자사 상품을 판매하는 개인 또는
            사업자를 말합니다.
          </li>
          <li>
            “이용자”란 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 모든
            회원 및 비회원을 의미합니다.
          </li>
          <li>
            “회원”은 회사와 이용계약을 체결하고 계정을 부여받은 자를 말합니다.
          </li>
        </ol>
      </Clause>
      <Clause title="제3조 약관의 효력 및 변경">
        <ol className="list-decimal pl-[21px]">
          <li>본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다.</li>
          <li>
            회사는 필요 시 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수
            있으며, 변경 시 사전 공지합니다.
          </li>
        </ol>
      </Clause>
      <Clause title="제4조 서비스의 제공 및 변경">
        <ol className="list-decimal pl-[21px]">
          <li>
            회사는 다음과 같은 서비스를 제공합니다.
            <ul className="list-disc pl-[21px]">
              <li>건강 디저트 상품의 검색 및 구매 서비스</li>
              <li>판매자 스토어 관리 기능</li>
              <li>결제, 리뷰, 알림 및 홍보 서비스</li>
            </ul>
          </li>
          <li>
            회사는 서비스 개선 및 운영상 필요에 따라 제공 내용을 변경할 수
            있습니다.
          </li>
        </ol>
      </Clause>
      <Clause title="제5조 회원가입 및 계정관리">
        <ol className="list-decimal pl-[21px]">
          <li>
            이용자는 회사가 정한 절차에 따라 회원가입을 신청하고, 회사는 이를
            승인함으로써 이용계약이 성립합니다.
          </li>
          <li>회원은 계정 정보를 제3자에게 양도, 대여할 수 없습니다.</li>
        </ol>
      </Clause>
      <Clause title="제6조 계약의 해지 및 이용제한">
        <ol className="list-decimal pl-[21px]">
          <li>
            회원은 언제든지 회원탈퇴를 요청할 수 있으며, 회사는 즉시 처리합니다.
          </li>
          <li>
            회원이 법령 또는 본 약관을 위반할 경우 회사는 서비스 이용을
            제한하거나 계약을 해지할 수 있습니다.
          </li>
        </ol>
      </Clause>
      <Clause title="제7조 서비스 수수료">
        <ol className="list-decimal pl-[21px]">
          <li>입점 수수료: 1,000원</li>
          <li>결제 기능 도입 후 판매 수수료: 결제금액의 10%(VAT 별도)</li>
        </ol>
      </Clause>
      <Clause title="제8조 면책조항">
        <ol className="list-decimal pl-[21px]">
          <li>
            회사는 판매자와 구매자 간의 거래에 직접적인 책임을 지지 않습니다.
          </li>
          <li>
            천재지변, 시스템 오류 등 불가항력적인 사유로 인한 손해에 대해서는
            책임을 지지 않습니다.
          </li>
        </ol>
      </Clause>
      <Clause title="제9조 관할 법원 및 준거법">
        <p>
          본 약관에 따른 분쟁은 대한민국 법률에 따르며, 관할 법원은
          서울중앙지방법원으로 합니다.
        </p>
      </Clause>
    </>
  )
}

function PrivacyTerms() {
  return (
    <>
      <Clause title="제1조 (개인정보의 수집 항목 및 방법)">
        <p>회사는 다음의 개인정보를 수집합니다.</p>
        <ul className="list-disc pl-[21px]">
          <li>회원가입 시: 이름, 이메일, 비밀번호, 휴대전화번호</li>
          <li>
            판매자 등록 시: 사업자등록번호, 상호명, 대표자명, 정산계좌 정보
          </li>
          <li>서비스 이용 시: 접속 로그, 쿠키, 이용기록</li>
        </ul>
      </Clause>
      <Clause title="제2조 (개인정보의 수집 및 이용 목적)">
        <p>수집한 개인정보는 다음의 목적을 위해 사용됩니다.</p>
        <ol className="list-decimal pl-[21px]">
          <li>회원 관리 및 본인 확인</li>
          <li>입점자와 소비자 간 거래 중개</li>
          <li>결제 및 정산 서비스 제공</li>
          <li>신규 서비스 개발 및 마케팅 활용</li>
        </ol>
      </Clause>
      <Clause title="제3조 (개인정보의 보유 및 이용 기간)">
        <p>
          회사는 이용자의 개인정보를 회원 탈퇴 시까지 보유하며, 관련 법령에 따라
          거래 기록은 일정 기간 보존합니다.
        </p>
        <ol className="list-decimal pl-[21px]">
          <li>전자상거래 기록: 5년</li>
          <li>소비자 불만 및 분쟁처리 기록: 3년</li>
        </ol>
      </Clause>
      <Clause title="제4조 (개인정보의 제3자 제공)">
        <p>
          회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          다만, 다음의 경우는 예외로 합니다.
        </p>
        <ol className="list-decimal pl-[21px]">
          <li>법령에 의한 요청이 있는 경우</li>
          <li>
            서비스 제공을 위해 필요한 최소한의 범위 내에서 배송업체 등에게
            제공하는 경우
          </li>
        </ol>
      </Clause>
      <Clause title="제5조 (개인정보의 위탁)">
        <p>
          회사는 원활한 서비스 제공을 위해 일부 업무를 외부 업체에 위탁할 수
          있으며, 위탁 시 개인정보 보호조치를 준수합니다.
        </p>
      </Clause>
      <Clause title="제6조 (이용자의 권리)">
        <p>
          이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제를 요청할 수
          있습니다.
        </p>
      </Clause>
      <Clause title="제7조 (개인정보 보호책임자)">
        <p>개인정보 보호 관련 문의는 아래로 연락해 주시기 바랍니다.</p>
        <ul className="list-disc pl-[21px]">
          <li>개인정보보호책임자: 윤예찬</li>
          <li>이메일: dpcks9893@naver.com</li>
        </ul>
      </Clause>
    </>
  )
}
