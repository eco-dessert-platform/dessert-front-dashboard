import { cn } from '@dessert/core'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@dessert/ui'
import { useLocation, useNavigate } from 'react-router-dom'

import logoutIcon from '@/assets/icons/logout.svg'
import { ROUTES } from '@/shared/constant/routes'

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
      { title: '정산내역', href: ROUTES.SETTLEMENTS.ALL },
      {
        title: '충전금 현황',
        href: ROUTES.SETTLEMENTS.CHARGE,
      },
      {
        title: '지급보류내역',
        href: ROUTES.SETTLEMENTS.WITHHELD,
      },
      {
        title: '부가세신고내역',
        href: ROUTES.SETTLEMENTS.VAT_REPORT,
      },
      {
        title: '세금계산서조회',
        href: ROUTES.SETTLEMENTS.TAX_INVOICE,
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

export function Lnb() {
  return (
    <nav className="relative flex h-[calc(100vh-80px)] w-[240px] flex-col border-r border-border">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Accordion type="multiple" className="gap-10">
          {MENU_LIST.map((menu) => (
            <AccordionItem value={menu.group} key={menu.group}>
              <AccordionTrigger>
                <span className="typo-title-16-m text-gray-800">
                  {menu.group}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {menu.items.map((item) => (
                  <MenuItemLink
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  />
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

function MenuItemLink({ href, title }: { href: string; title: string }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = pathname === href
  return (
    <div className="px-8 py-4">
      <button
        type="button"
        className={cn(
          'flex w-full cursor-pointer items-center rounded-10 border border-transparent p-12',
          isActive && 'border-gray-200 bg-gray-100',
        )}
        onClick={() => navigate(href)}
      >
        <span className="text-left typo-title-16-r text-gray-800">{title}</span>
      </button>
    </div>
  )
}

function LogoutButton() {
  return (
    <button
      type="button"
      className="flex h-[49px] w-full cursor-pointer items-center justify-start border-t border-gray-300 px-4 text-left"
    >
      <img src={logoutIcon} alt="logout" className="mr-2 size-20" />
      <span className="typo-title-16-m text-gray-800">로그아웃</span>
    </button>
  )
}
