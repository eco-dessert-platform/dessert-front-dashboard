import { Input, Label } from '@dessert/ui'

interface AddressInputProps {
  postalCode?: string
  address?: string
  detailAddress?: string
  onPostalCodeSearch?: () => void
  onDetailAddressChange?: (value: string) => void
  disabled?: boolean
}

const AddressInput = ({
  postalCode,
  address,
  detailAddress,
  onPostalCodeSearch,
  onDetailAddressChange,
  disabled = false,
}: AddressInputProps) => {
  return (
    <>
      <div className="flex items-start gap-16 self-stretch px-20 py-10">
        {/* 우편번호 + 주소 */}
        <div className="flex w-[310px] flex-col items-start gap-4">
          <Label label="우편번호" required />
          <div className="flex items-start gap-16 self-stretch">
            <Input
              className="flex flex-1/2 items-center gap-1.5 rounded-10 border border-gray-300 bg-gray-100 px-12 py-8 typo-title-16-r text-gray-400 placeholder:text-gray-400"
              placeholder="우편번호"
              value={postalCode}
              readOnly
              disabled={disabled}
            />
            <button
              className="flex min-w-[90px] cursor-pointer items-center justify-center rounded-10 bg-primary-500 px-16 py-8 disabled:cursor-not-allowed"
              onClick={onPostalCodeSearch}
              disabled={disabled}
            >
              <p className="typo-title-16-m text-white">우편번호 검색</p>
            </button>
          </div>
        </div>

        <div className="flex flex-1/2 flex-col items-start gap-4">
          <Label label="출고지 주소" required />
          <div className="flex items-start gap-16 self-stretch">
            <Input
              className="flex flex-1/2 items-center gap-1.5 rounded-10 border border-gray-300 bg-gray-100 px-12 py-8 typo-title-16-r text-gray-400 placeholder:text-gray-400"
              placeholder="출고지 주소"
              value={address}
              readOnly
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* 상세 주소 */}
      <div className="flex flex-col items-start gap-16 self-stretch px-20 py-10">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <Label label="출고지 상세 주소" required />
          <Input
            className="flex flex-1/2 items-center gap-1.5 rounded-10 border border-gray-300 bg-gray-100 px-12 py-8 typo-title-16-r text-gray-400 placeholder:text-gray-400"
            placeholder="상세주소를 입력해주세요(동/호수 포함)"
            value={detailAddress}
            onChange={(e) => onDetailAddressChange?.(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  )
}

/**
 * @deprecated `widgets` 폴더로 이동되었습니다.
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `@/widgets` 폴더에 구현된 컴포넌트를 사용해주세요.
 */
export default AddressInput
