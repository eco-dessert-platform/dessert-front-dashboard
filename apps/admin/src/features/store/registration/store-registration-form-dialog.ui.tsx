import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { StoreRegistrationFormFields } from './store-registration-form-fields.ui'
import {
  DEFAULT_STORE_REGISTRATION_FORM_VALUES,
  createStoreRegistrationFormSchema,
  toStoreDetailRequest,
} from './store-registration-form.schema'
import { useCreateAdminStoreMutation } from './store-registration.mutation'

import type { StoreRegistrationFormValues } from './store-registration-form.schema'

interface StoreRegistrationFormDialogProps {
  open: boolean
  onClose: () => void
}

export const StoreRegistrationFormDialog = ({
  open,
  onClose,
}: StoreRegistrationFormDialogProps) => {
  const { mutate, isPending } = useCreateAdminStoreMutation()
  const form = useForm<StoreRegistrationFormValues>({
    resolver: zodResolver(createStoreRegistrationFormSchema),
    defaultValues: DEFAULT_STORE_REGISTRATION_FORM_VALUES,
    mode: 'onChange',
  })

  const handleClose = () => {
    if (isPending) return
    form.reset(DEFAULT_STORE_REGISTRATION_FORM_VALUES)
    onClose()
  }

  const onSubmit = (values: StoreRegistrationFormValues) => {
    if (!values.profileImage) return

    mutate(
      {
        request: toStoreDetailRequest(values),
        profileImage: values.profileImage,
      },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) handleClose()
      }}
    >
      <DialogContent className="h-[722px] w-[1060px] gap-20 py-10 pr-20 pl-24 sm:max-w-[1060px]">
        <DialogHeader className="gap-4">
          <DialogTitle
            showCloseButton
            className="typo-heading-24-m text-gray-800"
          >
            스토어 생성
          </DialogTitle>
          <DialogDescription>스토어 정보를 입력하세요</DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-[264px_1fr]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <StoreRegistrationFormFields
            form={form}
            disabled={isPending}
            submitTitle="등록하기"
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
