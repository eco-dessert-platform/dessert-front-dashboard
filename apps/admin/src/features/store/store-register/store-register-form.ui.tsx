import { useRef, useState } from 'react'

import { Button, Input, Textarea } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { StoreFormSchema } from '@/entity/store/store-register'
import type { StoreFormValues } from '@/entity/store/store-register'

import { useCreateStoreMutation } from './store-register.mutation'

export const StoreRegisterForm = () => {
  const { mutate, isPending } = useCreateStoreMutation()
  const [profileImage, setProfileImage] = useState<File | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StoreFormValues>({
    resolver: zodResolver(StoreFormSchema),
    defaultValues: {
      storeName: '',
      identifier: '',
      introduce: '',
      phoneNumber: '',
      subPhoneNumber: '',
      email: '',
      originAddress: '',
      originAddressDetail: '',
    },
    reValidateMode: 'onSubmit',
  })

  const onSubmit = (request: StoreFormValues) => {
    mutate(
      { request, profileImage },
      {
        onSuccess: () => {
          reset()
          setProfileImage(undefined)
          if (fileInputRef.current) fileInputRef.current.value = ''
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-160 flex-col gap-16"
    >
      <Input
        label="스토어명"
        required
        placeholder="스토어명을 입력하세요"
        error={!!errors.storeName}
        errorMessage={errors.storeName?.message}
        {...register('storeName')}
      />
      <Input
        label="사업자등록번호"
        required
        placeholder="사업자등록번호를 입력하세요"
        error={!!errors.identifier}
        errorMessage={errors.identifier?.message}
        {...register('identifier')}
      />
      <Textarea
        label="스토어 소개"
        placeholder="스토어 소개를 입력하세요"
        error={!!errors.introduce}
        errorMessage={errors.introduce?.message}
        {...register('introduce')}
      />
      <Input
        label="연락처"
        required
        placeholder="연락처를 입력하세요"
        error={!!errors.phoneNumber}
        errorMessage={errors.phoneNumber?.message}
        {...register('phoneNumber')}
      />
      <Input
        label="추가 연락처"
        placeholder="추가 연락처를 입력하세요"
        error={!!errors.subPhoneNumber}
        errorMessage={errors.subPhoneNumber?.message}
        {...register('subPhoneNumber')}
      />
      <Input
        label="이메일"
        required
        placeholder="이메일을 입력하세요"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="출고지 주소"
        required
        placeholder="출고지 주소를 입력하세요"
        error={!!errors.originAddress}
        errorMessage={errors.originAddress?.message}
        {...register('originAddress')}
      />
      <Input
        label="출고지 상세주소"
        placeholder="출고지 상세주소를 입력하세요"
        error={!!errors.originAddressDetail}
        errorMessage={errors.originAddressDetail?.message}
        {...register('originAddressDetail')}
      />

      <div className="flex flex-col gap-1.5">
        <span className="typo-title-14-b">프로필 이미지</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.currentTarget.files?.[0])}
        />
      </div>

      <div className="flex justify-end">
        <Button title="스토어 등록" type="submit" disabled={isPending} />
      </div>
    </form>
  )
}
