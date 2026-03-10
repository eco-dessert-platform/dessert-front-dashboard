import Button from '@/shared/components/ui/button/button'

interface BottomNavBarProps {
  items: {
    label: string
    variant: 'primary-filled' | 'primary-outlined'
    onClick: () => void
  }[]
}

function BottomNavBar({ items }: BottomNavBarProps) {
  return (
    <footer className="fixed right-0 bottom-0 left-0 flex h-[104px] w-full items-center justify-end gap-12 bg-white p-24">
      {items.map((item) => (
        <Button
          key={item.label}
          title={item.label}
          size="lg"
          variant={item.variant as 'primary-filled' | 'primary-outlined'}
          onClick={item.onClick}
        />
      ))}
    </footer>
  )
}

export default BottomNavBar
