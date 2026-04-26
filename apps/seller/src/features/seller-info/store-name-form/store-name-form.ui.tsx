import { useState } from 'react'

import { Button } from '@dessert/ui'

import { cn } from '@/shared/libs/utils'
import { InputField } from '@/widgets/input-field'

const STORE_NAME_MIN = 3
const STORE_NAME_MAX = 50
const ERROR_MESSAGE = '스토어명은 3~50자 이내로 입력해주세요.'

export function StoreNameForm() {
  const [storeName, setStoreName] = useState<string>('')

  const hasInput = storeName.length > 0
  const isInvalidStoreName =
    storeName.length < STORE_NAME_MIN || storeName.length > STORE_NAME_MAX
  const isError = hasInput && isInvalidStoreName
  const isSubmitDisabled = !hasInput || isError

  return (
    <section className="flex flex-col rounded-20 bg-white p-24">
      <h2 className="text-[20px] font-semibold">스토어명 변경 </h2>
      <p className="mt-[3px] gap-[22px] text-[16px] font-normal text-gray-700">
        스토어명은 최초 한 번만 변경할 수 있어요.
      </p>
      <InputField
        label="스토어명"
        placeholder="스토어명은 3~50자로 작성해주세요"
        required
        buttonText="중복확인"
        maxLength={50}
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        onButtonClick={() => {}}
        error={isError}
        errorMessage={ERROR_MESSAGE}
        className="mt-[22px]"
      />
      <span className="mt-32 flex flex-row justify-end gap-10">
        <Button
          title="취소하기"
          size="md"
          className={cn(
            'w-[160px]',
            !hasInput && 'pointer-events-none invisible',
          )}
          variant="primary-outlined"
          onClick={() => setStoreName('')}
        />
        <Button
          title="수정하기"
          size="md"
          className="w-[160px]"
          disabled={isSubmitDisabled}
        />
      </span>
    </section>
  )
}
