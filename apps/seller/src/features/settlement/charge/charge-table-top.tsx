import { Pagination } from '@dessert/ui'

interface IChargeTableTopProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const ChargeTableTop = ({
  currentPage,
  totalPages,
  onPageChange,
}: IChargeTableTopProps) => {
  return (
    <div className="flex w-full justify-end">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default ChargeTableTop
