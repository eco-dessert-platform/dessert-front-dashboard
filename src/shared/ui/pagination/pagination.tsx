import DoubleForwardArrow from '@/assets/icons/arrow/double-forward-arrow.svg?react'
import DoubleNextArrow from '@/assets/icons/arrow/double-next-arrow.svg?react'
import ForwardArrow from '@/assets/icons/arrow/forward-arrow.svg?react'
import NextArrow from '@/assets/icons/arrow/next-arrow.svg?react'
import { cn } from '@/shared/libs/utils'
import clsx from 'clsx'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  const GROUP_SIZE = 5

  // 공통 버튼 스타일
  const baseButtonStyle =
    'flex h-[30px] w-[30px] items-center justify-center rounded-[8px] p-[5px] transition-colors'

  // disabled 스타일 헬퍼
  const getDisabledStyle = (isDisabled: boolean) => {
    return isDisabled
      ? 'cursor-not-allowed text-gray-300'
      : 'cursor-pointer hover:bg-gray-50'
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }

  // 현재 그룹 계산
  const currentGroup = Math.ceil(currentPage / GROUP_SIZE)
  const totalGroups = Math.ceil(totalPages / GROUP_SIZE)

  // 현재 그룹의 시작 페이지와 끝 페이지
  const groupStartPage = (currentGroup - 1) * GROUP_SIZE + 1
  const groupEndPage = Math.min(currentGroup * GROUP_SIZE, totalPages)

  // 현재 그룹의 페이지 번호들
  const getCurrentGroupPages = () => {
    const pages: number[] = []
    for (let i = groupStartPage; i <= groupEndPage; i++) {
      pages.push(i)
    }
    return pages
  }

  // 첫 번째 그룹인지 확인
  const isFirstGroup = currentGroup === 1

  // 마지막 그룹인지 확인
  const isLastGroup = currentGroup === totalGroups

  // 마지막 그룹의 첫 페이지 계산
  const getLastGroupFirstPage = () => {
    return (totalGroups - 1) * GROUP_SIZE + 1
  }

  const currentGroupPages = getCurrentGroupPages()

  return (
    <nav
      className={cn('flex items-center gap-4', className)}
      aria-label="Pagination"
    >
      {/* << 버튼: 첫 번째 그룹으로 이동 */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={isFirstGroup}
        className={cn(baseButtonStyle, getDisabledStyle(isFirstGroup))}
        aria-label="Go to first page group"
        title="첫 페이지 그룹"
      >
        <DoubleForwardArrow className="size-20" />
      </button>

      {/* < 버튼: 이전 페이지로 이동 (-1) */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(baseButtonStyle, getDisabledStyle(currentPage === 1))}
        aria-label="Go to previous page"
        title="이전 페이지"
      >
        <ForwardArrow className="size-20" />
      </button>

      {/* 페이지 번호 버튼들 */}
      {currentGroupPages.map((pageNumber) => {
        const isActive = pageNumber === currentPage
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={isActive}
            className={clsx(
              baseButtonStyle,
              isActive
                ? 'cursor-default bg-primary-50 typo-title-14-m text-primary-500'
                : 'cursor-pointer typo-title-14-r text-gray-800 hover:bg-gray-50',
            )}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* > 버튼: 다음 페이지로 이동 (+1) ✅ */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          baseButtonStyle,
          getDisabledStyle(currentPage === totalPages),
        )}
        aria-label="Go to next page"
        title="다음 페이지"
      >
        <NextArrow className="size-20" />
      </button>

      {/* >> 버튼: 마지막 그룹으로 이동 */}
      <button
        onClick={() => handlePageChange(getLastGroupFirstPage())}
        disabled={isLastGroup}
        className={cn(baseButtonStyle, getDisabledStyle(isLastGroup))}
        aria-label="Go to last page group"
        title="마지막 페이지 그룹"
      >
        <DoubleNextArrow className="size-20" />
      </button>
    </nav>
  )
}

export { Pagination }
