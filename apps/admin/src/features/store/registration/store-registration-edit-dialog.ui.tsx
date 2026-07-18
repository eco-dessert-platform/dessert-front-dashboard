import { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { StoreRegistration } from '@/entity/store/registration'

import { StoreRegistrationFormFields } from './store-registration-form-fields.ui'
import {
  DEFAULT_STORE_REGISTRATION_FORM_VALUES,
  toStoreDetailRequest,
  toStoreRegistrationFormValues,
  updateStoreRegistrationFormSchema,
} from './store-registration-form.schema'
import { useUpdateAdminStoreMutation } from './store-registration.mutation'

import type { StoreRegistrationFormValues } from './store-registration-form.schema'

interface StoreRegistrationEditDialogProps {
  store: StoreRegistration | null
  onClose: () => void
}

export const StoreRegistrationEditDialog = ({
  store,
  onClose,
}: StoreRegistrationEditDialogProps) => {
  const { mutate, isPending } = useUpdateAdminStoreMutation()
  const form = useForm<StoreRegistrationFormValues>({
    resolver: zodResolver(updateStoreRegistrationFormSchema),
    defaultValues: DEFAULT_STORE_REGISTRATION_FORM_VALUES,
    mode: 'onChange',
  })
  const { reset, trigger } = form

  useEffect(() => {
    reset(
      store
        ? toStoreRegistrationFormValues(store)
        : DEFAULT_STORE_REGISTRATION_FORM_VALUES,
    )
    if (store) void trigger()
  }, [reset, store, trigger])

  const handleClose = () => {
    if (isPending) return
    reset(DEFAULT_STORE_REGISTRATION_FORM_VALUES)
    onClose()
  }

  const onSubmit = (values: StoreRegistrationFormValues) => {
    if (!store) return

    mutate(
      {
        storeId: store.id,
        body: toStoreDetailRequest(values),
      },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog
      open={store !== null}
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
            스토어 수정
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
            submitTitle="수정"
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
