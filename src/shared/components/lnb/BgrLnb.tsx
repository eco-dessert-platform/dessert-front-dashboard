import logoutIcon from 'src/assets/icons/logout.svg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'src/shared/lib/shadcn/components/ui/accordion'

const MENU_LIST = [
    {
        group: '상품 관리',
        items: [
            { title: '상품등록', href: '/products/register' },
            { title: '상품 조회/수정', href: '/products' },
        ],
    },
    {
        group: '주문 관리',
        items: [
            { title: '주문내역', href: '/orders' },
            {
                title: '완료 주문 내역',
                href: '/orders/completed',
            },
        ],
    },
    {
        group: '정산 관리',
        items: [
            { title: '정산내역', href: '/settlements' },
            {
                title: '충전금 현황',
                href: '/settlements/charge',
            },
            {
                title: '지급보류내역',
                href: '/settlements/pending',
            },
            {
                title: '부가세신고내역',
                href: '/settlements/vat-report',
            },
            {
                title: '세금계산서조회',
                href: '/settlements/tax-invoice',
            },
        ],
    },
    {
        group: '통계',
        items: [
            {
                title: '판매분석',
                href: '/statistics/sales',
            },
        ],
    },
    {
        group: '판매자 정보',
        items: [
            {
                title: '판매자 정보 변경',
                href: '/seller/profile',
            },
        ],
    },
]

function BgrLnb() {
    return (
        <nav className="border-border relative flex h-[calc(100vh-80px)] w-[240px] flex-col border-r">
            <div className="flex-1 overflow-y-auto px-3 py-4">
                <Accordion
                    type="multiple"
                    className="gap-button-sm-px flex flex-col"
                >
                    {MENU_LIST.map((menu) => (
                            <MenuItem
                                key={menu.group}
                                title={menu.group}
                                items={menu.items}
                            />
                    ))}
                </Accordion>
            </div>
            <LogoutButton />
        </nav>
    )
}

function MenuItem({
    title,
    items,
}: {
    title: string
    items: { title: string }[]
}) {
    return (
        <AccordionItem value={title} key={title}>
            <AccordionTrigger className="cursor-pointer text-heading-18-b h-[53px] w-[208px] px-[8px] no-underline hover:no-underline">
                <span className="text-gray-800">{title}</span>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col">
                {items.map((item) => (
                    <div className="px-2 py-1">
                        <button
                            type="button"
                            className="cursor-pointer text-heading-18-m rounded-[10px] h-full w-full justify-start p-3 text-left border border-transparent focus:border-gray-200 focus:bg-gray-100"
                            onClick={() => {}}
                        >
                            <span className="text-gray-800">{item.title}</span>
                        </button>
                    </div>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

export default BgrLnb

function LogoutButton() {
    return (
        <button
            type="button"
            className="flex h-[49px] w-full items-center justify-start border-t border-gray-300 px-4 py-button-sm-px text-left"
        >
            <img src={logoutIcon} alt="logout" className="mr-2 size-5" />
            <span className="text-heading-18-m text-gray-800">로그아웃</span>
        </button>
    )
}
