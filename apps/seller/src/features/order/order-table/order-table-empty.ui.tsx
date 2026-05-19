import characterLogo from '@/assets/images/character-logo.png'

export function OrderTableEmpty() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <img src={characterLogo} alt="" className="size-28" />
        <p className="typo-body-14-r text-gray-500">주문내역이 없습니다.</p>
      </div>
    </div>
  )
}
