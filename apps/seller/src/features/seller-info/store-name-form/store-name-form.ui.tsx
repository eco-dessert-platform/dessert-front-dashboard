import { ChangeEvent, useState } from 'react'

import { Button } from '@dessert/ui'

import { cn } from '@/shared/libs/utils'
import { InputField } from '@/widgets/input-field'

import { SellerInfoConfirmDialog } from '../seller-info-confirm-dialog'
import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
} from '../seller-info-confirm-dialog-content'
import {
  STORE_NAME_RULE,
  getStoreNameValidationState,
} from '../store-name-validation/store-name.validation'

type ConfirmDialogType = 'cancel' | 'submit'

export function StoreNameForm() {
  const [storeName, setStoreName] = useState('')
  const [confirmDialogType, setConfirmDialogType] =
    useState<ConfirmDialogType | null>(null)

  const { hasStoreName, shouldShowStoreNameError, isSubmitButtonDisabled } =
    getStoreNameValidationState(storeName)

  const confirmDialogContent =
    confirmDialogType === null
      ? null
      : confirmDialogType === 'cancel'
        ? SELLER_INFO_CANCEL_DIALOG_CONTENT
        : SELLER_INFO_SUBMIT_DIALOG_CONTENT

  const handleCancelButtonClick = () => {
    setConfirmDialogType('cancel')
  }

  const handleSubmitButtonClick = () => {
    setConfirmDialogType('submit')
  }

  const handleDialogClose = () => {
    setConfirmDialogType(null)
  }

  const handleStoreNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStoreName(event.target.value)
  }

  const handleDialogConfirm = () => {
    if (confirmDialogType === 'cancel') {
      setStoreName('')
    }

    handleDialogClose()
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      handleDialogClose()
    }
  }

  return (
    <section className="flex flex-col rounded-20 bg-white p-24">
      <h2 className="text-[20px] font-semibold">스토어명 변경</h2>
      <p className="mt-[3px] gap-[22px] text-[16px] font-normal text-gray-700">
        스토어명은 최초 한 번만 변경할 수 있어요.
      </p>

      <InputField
        label="스토어명"
        placeholder="스토어명은 3~50자로 작성해주세요"
        required
        buttonText="중복확인"
        maxLength={STORE_NAME_RULE.MAX_LENGTH}
        value={storeName}
        onChange={handleStoreNameChange}
        onButtonClick={() => {}}
        error={shouldShowStoreNameError}
        errorMessage={STORE_NAME_RULE.ERROR_MESSAGE}
        className="mt-[22px]"
      />

      <span className="mt-32 flex flex-row justify-end gap-10">
        <Button
          title="취소하기"
          size="md"
          className={cn(
            'w-[160px]',
            !hasStoreName && 'pointer-events-none invisible',
          )}
          variant="primary-outlined"
          onClick={handleCancelButtonClick}
        />
        <Button
          title="수정하기"
          size="md"
          className="w-[160px]"
          disabled={isSubmitButtonDisabled}
          onClick={handleSubmitButtonClick}
        />
      </span>

      {confirmDialogContent !== null && (
        <SellerInfoConfirmDialog
          open
          title={confirmDialogContent.title}
          description={confirmDialogContent.description}
          onOpenChange={handleDialogOpenChange}
          onConfirm={handleDialogConfirm}
        />
      )}
    </section>
  )
}
