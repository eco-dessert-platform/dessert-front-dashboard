import { Button } from '@dessert/ui'

const BOTTOM_NAV_BAR_ITEMS = [
  { label: '취소', variant: 'primary-filled' },
  { label: '수정하기', variant: 'primary-outlined' },
]

export function BottomNavBar() {
  return (
    <footer className="absolute inset-x-0 bottom-0 flex h-[104px] w-full items-center justify-end gap-2 p-6">
      {BOTTOM_NAV_BAR_ITEMS.map((item) => (
        <Button
          key={item.label}
          title={item.label}
          size="lg"
          variant={item.variant as 'primary-filled' | 'primary-outlined'}
        />
      ))}
    </footer>
  )
}
