import { Button } from '@dessert/ui'

const BOTTOM_NAV_BAR_ITEMS = [
  { label: '취소', variant: 'primary-filled' },
  { label: '수정하기', variant: 'primary-outlined' },
]

/**
 * @deprecated `widgets`펄더로 이동되었습니다.
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `@/widgets` 폴더에 구현된 컴포넌트를 사용해주세요.
 */
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
