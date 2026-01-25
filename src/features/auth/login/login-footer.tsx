interface BgrFooterProps {
  variant?: 'default' | 'simple'
}

export const LoginFooter = ({ variant = 'default' }: BgrFooterProps) => {
  if (variant === 'simple') {
    return (
      <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2.5 self-stretch bg-white">
        <div className="flex items-end justify-end gap-3 self-stretch bg-white p-6">
          {/* Custom buttons can be passed as props or children */}
        </div>
      </footer>
    )
  }

  return (
    <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2 self-stretch border-t border-t-gray-200 bg-gray-100 p-6 font-medium">
      <div className="flex items-center justify-center gap-2 self-stretch">
        <p className="text-[12px] text-gray-700">빵그리의 오븐</p>
        <div className="h-3 w-[1px] bg-gray-200" />
        <p className="text-[12px] text-gray-700">대표 : 윤예찬</p>
        <div className="h-3 w-[1px] bg-gray-200" />
        <p className="text-[12px] text-gray-700">
          사업자등록번호 : 670-01-03496
        </p>
        <div className="h-3 w-[1px] bg-gray-200" />
        <p className="text-[12px] text-gray-700">
          이메일 : dpcks9893@naver.com
        </p>
      </div>

      <div className="mt-2 flex h-[19px] items-center justify-center gap-2 self-stretch">
        <p className="text-[12px] font-normal text-gray-500">이용약관</p>
        <div className="h-3 w-[1px] bg-gray-200" />
        <p className="text-[12px] font-bold text-gray-700">개인정보 처리방침</p>
      </div>
    </footer>
  )
}
