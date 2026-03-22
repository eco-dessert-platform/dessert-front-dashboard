import { Button, Pagination } from '@dessert/ui'

interface ProductActionGroupProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onProductAction: (action: string) => void
  onOptionAction: (action: string) => void
}

export const ProductActionGroup = ({
  currentPage,
  totalPages,
  onPageChange,
  onProductAction,
  onOptionAction,
}: ProductActionGroupProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex shrink-0 items-center gap-16">
        <div className="flex w-[287px] shrink-0 flex-col items-start gap-4">
          <div className="flex w-full shrink-0 items-center gap-12">
            <span className="w-[50px] shrink-0 text-right typo-body-12-m text-gray-800">
              상품
            </span>
            <div className="flex shrink-0 items-center gap-10">
              <Button
                title="상품추가"
                size="sm"
                variant="secondary-outlined"
                onClick={() => onProductAction('ADD')}
              />
              <Button
                title="상품수정"
                size="sm"
                variant="secondary-outlined"
                onClick={() => onProductAction('EDIT')}
              />
              <Button
                title="상품삭제"
                size="sm"
                variant="secondary-outlined"
                onClick={() => onProductAction('DELETE')}
              />
            </div>
          </div>
          <div className="flex w-full shrink-0 items-center gap-12">
            <span className="w-[50px] shrink-0 text-right typo-body-12-m text-gray-800">
              상품옵션
            </span>
            <div className="flex shrink-0 items-center gap-10">
              <Button
                title="상품옵션삭제"
                size="sm"
                variant="secondary-outlined"
                onClick={() => onOptionAction('DELETE_OPTION')}
              />
              <Button
                title="품절"
                size="sm"
                variant="secondary-outlined"
                onClick={() => onOptionAction('SOLD_OUT')}
              />
              <Button
                title="재고증가"
                size="sm"
                variant="secondary-outlined"
                onClick={() => onOptionAction('INCREASE_STOCK')}
              />
            </div>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
