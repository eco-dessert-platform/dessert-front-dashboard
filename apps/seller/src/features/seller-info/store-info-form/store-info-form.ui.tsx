import { useEffect, useState } from 'react'

import { Button } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'

import {
  StoreDetailFormValues,
  sellerInfoQueries,
  storeDetailSchema,
} from '@/entity/seller-info'

import {
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'
import { StoreContactAddressForm } from '../store-contact-address-form'
import { StoreProfileForm } from '../store-profile-form'

export function StoreInfoForm() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

  const { data } = useQuery(sellerInfoQueries.store())

  const methods = useForm<StoreDetailFormValues>({
    resolver: zodResolver(storeDetailSchema),
    defaultValues: {
      introduce: '',
      phoneNumber: '',
      subPhoneNumber: '',
      emailLocal: '',
      emailDomain: '',
      originAddress: '',
      originAddressDetail: '',
    },
    mode: 'onChange',
  })

  const { reset } = methods

  // 스토어 정보 응답이 도착하면 폼에 prefill (이메일은 local@domain 으로 분리)
  useEffect(() => {
    if (!data) return

    const { store } = data
    const email = store.email ?? ''
    const atIndex = email.lastIndexOf('@')

    reset({
      introduce: store.introduce ?? '',
      phoneNumber: store.phoneNumber ?? '',
      subPhoneNumber: store.subPhoneNumber ?? '',
      emailLocal: atIndex >= 0 ? email.slice(0, atIndex) : email,
      emailDomain: atIndex >= 0 ? email.slice(atIndex + 1) : '',
      originAddress: store.originAddress ?? '',
      originAddressDetail: store.originAddressDetail ?? '',
    })
  }, [data, reset])

  const onSubmit = () => {
    setIsSubmitDialogOpen(true)
  }

  return (
    <FormProvider {...methods}>
      <section className="rounded-20 bg-white p-24">
        <h2 className="mb-4 text-[20px] font-semibold">스토어 정보 변경</h2>

        <div className="flex flex-col gap-20 2xl:flex-row">
          <div className="w-full xl:w-[220px] 2xl:shrink-0">
            <StoreProfileForm />
          </div>
          <div className="w-full min-w-0 2xl:flex-1">
            <StoreContactAddressForm />
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <Button
            title="수정하기"
            className="min-w-[160px]"
            onClick={methods.handleSubmit(onSubmit)}
          />
        </div>

        <SellerInfoConfirmDialog
          open={isSubmitDialogOpen}
          title={SELLER_INFO_SUBMIT_DIALOG_CONTENT.title}
          description={SELLER_INFO_SUBMIT_DIALOG_CONTENT.description}
          onOpenChange={setIsSubmitDialogOpen}
          onConfirm={() => setIsSubmitDialogOpen(false)}
        />
      </section>
    </FormProvider>
  )
}
