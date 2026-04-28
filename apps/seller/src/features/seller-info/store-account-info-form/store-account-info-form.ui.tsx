import { useRef, useState } from 'react'

import { Button, Input, Label } from '@dessert/ui'

import { SellerInfoConfirmDialog } from '../seller-info-confirm-dialog'
import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
} from '../seller-info-confirm-dialog-content'

export function StoreAccountInfoForm() {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<'cancel' | 'submit' | null>(null)

  const lastDialogTypeRef = useRef<'cancel' | 'submit'>('cancel')

  const currentDialogType = dialogType ?? lastDialogTypeRef.current

  const dialogCopy =
    currentDialogType === 'cancel'
      ? SELLER_INFO_CANCEL_DIALOG_CONTENT
      : SELLER_INFO_SUBMIT_DIALOG_CONTENT

  if (dialogType !== null) {
    lastDialogTypeRef.current = dialogType
  }

  const handleDialogClose = () => {
    setDialogType(null)
  }

  const handleDialogConfirm = () => {
    if (dialogType === 'cancel') {
      setIsEditable(false)
    }

    handleDialogClose()
  }

  return (
    <section className="w-full overflow-hidden rounded-20 bg-white p-24">
      <h2 className="text-[20px] font-semibold text-gray-900">
        계좌 정보 변경
      </h2>
      <p className="mt-8 text-[16px] font-normal text-gray-500">
        예금주는 대표자명 혹은 사업자명과 일치하는 계좌번호만 인증이 가능해요
      </p>

      <div className="mt-32 flex flex-col gap-24">
        <div className="flex w-full flex-col gap-16 xl:flex-row">
          <Input
            label="은행명"
            placeholder="신한은행"
            className="flex-1"
            disabled={!isEditable}
          />
          <Input
            label="예금주"
            placeholder="이빵글"
            className="flex-1"
            disabled={!isEditable}
          />
        </div>

        <div className="flex flex-col gap-6">
          <Label label="계좌번호" />
          <div className="flex w-full flex-col gap-16 md:items-end xl:flex-row">
            <Input
              placeholder="111-2222-3333-44"
              className="flex-1"
              disabled={!isEditable}
            />
            <Button
              title={isEditable ? '취소하기' : '변경하기'}
              className="shrink-0"
              onClick={() => {
                if (isEditable) {
                  setDialogType('cancel')
                  return
                }

                setIsEditable(true)
              }}
            />
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button
            title="수정하기"
            className="min-w-[160px]"
            onClick={() => setDialogType('submit')}
          />
        </div>
      </div>
      <SellerInfoConfirmDialog
        open={dialogType !== null}
        title={dialogCopy.title}
        description={dialogCopy.description}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose()
          }
        }}
        onConfirm={handleDialogConfirm}
      />
    </section>
  )
}
