export const LoginFooter = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-8 border-t border-t-gray-200 bg-gray-100 p-24">
      <div className="flex items-center justify-center gap-8 self-stretch">
        <p className="typo-body-12-b text-gray-700">빵그리의 오븐</p>
        <div className="h-3 w-px bg-gray-200" />
        <p className="typo-body-12-b text-gray-700">대표 : 윤예찬</p>
        <div className="h-3 w-px bg-gray-200" />
        <p className="typo-body-12-b text-gray-700">
          사업자등록번호 : 670-01-03496
        </p>
        <div className="h-3 w-px bg-gray-200" />
        <p className="typo-body-12-b text-gray-700">
          이메일 : dpcks9893@naver.com
        </p>
      </div>

      <div className="flex h-[19px] items-center justify-center gap-8 self-stretch">
        <p className="typo-body-12-r text-gray-500">이용약관</p>
        <div className="h-3 w-px bg-gray-200" />
        <p className="typo-body-12-b text-gray-700">개인정보 처리방침</p>
      </div>
    </footer>
  )
}
