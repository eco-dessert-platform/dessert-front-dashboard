import { Button } from '@dessert/ui'

export const ProductFooter = () => {
  return (
    <div className="sticky bottom-0 left-0 z-20 -mb-36 -ml-[90px] flex w-[calc(100%+180px)] justify-end gap-12 border-t border-t-gray-200 bg-white px-[90px] py-24">
      <Button title="미리보기" variant="primary-outlined" size="lg" />
      <Button title="임시저장" variant="primary-outlined" size="lg" />
      <Button title="저장하기" variant="primary-filled" size="lg" />
    </div>
  )
}
