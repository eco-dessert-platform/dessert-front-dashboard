import logoutIcon from '@/assets/icons/logout.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion/accordion'
import { ROUTES } from '@/shared/constants/routes'
import { cn } from '@/shared/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'

const MENU_LIST = [
  {
    group: '상품 관리',
    items: [
      { title: '상품 조회/수정', href: ROUTES.PRODUCTS.ALL },
      { title: '상품등록', href: ROUTES.PRODUCTS.CREATE },
    ],
  },
  {
    group: '주문 관리',
    items: [
      { title: '주문내역', href: ROUTES.ORDERS.ALL },
      {
        title: '완료 주문 내역',
        href: ROUTES.ORDERS.COMPLETED,
      },
    ],
  },
  {
    group: '정산 관리',
    items: [
      { title: '정산내역', href: '#' },
      {
        title: '충전금 현황',
        href: '#',
      },
      {
        title: '지급보류내역',
        href: '#',
      },
      {
        title: '부가세신고내역',
        href: '#',
      },
      {
        title: '세금계산서조회',
        href: '#',
      },
    ],
  },
  {
    group: '통계',
    items: [
      {
        title: '판매분석',
        href: '#',
      },
    ],
  },
  {
    group: '판매자 정보',
    items: [
      {
        title: '판매자 정보 변경',
        href: '#',
      },
    ],
  },
]

function Lnb() {

  return (
    <nav className="border-border relative flex h-[calc(100vh-80px)] w-[240px] flex-col border-r">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Accordion type="multiple" className="gap-[10px]" >
          {MENU_LIST.map((menu) => (
            <AccordionItem value={menu.group} key={menu.group}>
              <AccordionTrigger>
                <span className="text-title-16-m text-gray-800">{menu.group}</span>
              </AccordionTrigger>
              <AccordionContent>
                {menu.items.map((item) => (
                  <MenuItemLink key={item.title} title={item.title} href={item.href} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <LogoutButton />
    </nav>
  )
}

export default Lnb

function MenuItemLink({ href, title }: { href: string, title: string }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive =  pathname === href
  return (
    <div className="px-2 py-1">
      <button type="button" className={cn("cursor-pointer flex items-center p-3 w-full rounded-[10px] border border-transparent", isActive && "bg-gray-100 border-gray-200")} onClick={() => navigate(href)}>
        <span className="text-title-16-r text-left text-gray-800">{title}</span>
      </button>
    </div>
  )
}


function LogoutButton() {
  return (
    <button
      type="button"
      className="cursor-pointer py-button-sm-px flex h-[49px] w-full items-center justify-start border-t border-gray-300 px-4 text-left"
    >
      <img src={logoutIcon} alt="logout" className="mr-2 size-5" />
      <span className="text-heading-16-m text-gray-800">로그아웃</span>
    </button>
  )
}
