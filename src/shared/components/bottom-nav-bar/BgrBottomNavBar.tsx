import BgrButton from "../button/BgrButton"

const BOTTOM_NAV_BAR_ITEMS = [
  {label:'취소',variant:'primary-filled'},
  {label:'수정하기',variant:'primary-outlined'},
]
function BgrBottomNavBar() {
    return (
        <footer className="flex bg-red-500 w-full items-center justify-end gap-2 h-[104px] p-6">
          {BOTTOM_NAV_BAR_ITEMS.map((item) => (
            <BgrButton key={item.label} title={item.label} size='lg' variant={item.variant as 'primary-filled' | 'primary-outlined'} />       
          ))}           
        </footer>
    )
}

export default BgrBottomNavBar