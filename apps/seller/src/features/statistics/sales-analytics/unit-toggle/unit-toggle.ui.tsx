import { Tab, TabList, TabTrigger } from '@dessert/ui'

import type { PaymentStatsPeriod } from '@/entity/payments'

interface UnitToggleProps {
  value: PaymentStatsPeriod
  onChange: (value: PaymentStatsPeriod) => void
}

const OPTIONS: ReadonlyArray<{ value: PaymentStatsPeriod; label: string }> = [
  { value: 'DAY', label: '일' },
  { value: 'WEEK', label: '주' },
  { value: 'MONTH', label: '월' },
]

// 차트 헤더 우측에 위치하는 3-way 토글. 기본 Tab(variant='btn')은 입력 필드 높이라 컴팩트하게 override.
export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <Tab
      variant="btn"
      value={value}
      onValueChange={(v) => onChange(v as PaymentStatsPeriod)}
    >
      <TabList className="h-8 space-x-1">
        {OPTIONS.map((opt) => (
          <TabTrigger
            key={opt.value}
            value={opt.value}
            className="h-full min-w-10 rounded-4 px-3 py-0 typo-body-12-m"
          >
            {opt.label}
          </TabTrigger>
        ))}
      </TabList>
    </Tab>
  )
}
