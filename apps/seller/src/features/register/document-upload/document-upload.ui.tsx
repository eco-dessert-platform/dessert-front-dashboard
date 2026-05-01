import { Controller, useFormContext } from 'react-hook-form'

import { FileUploadInput } from '@/widgets/file-upload-input'

import type { RegisterForm } from '@/entity/register'

import { handleRegisterFileUpload } from '../lib'

export function DocumentUpload() {
  const { control } = useFormContext<RegisterForm>()

  return (
    <section className="flex w-full flex-col overflow-clip rounded-[16px] bg-white">
      <header className="flex flex-col gap-1 px-24 pb-12 pt-16">
        <h2 className="typo-heading-20-sb text-gray-900">필수 서류 등록</h2>
        <p className="typo-title-16-r text-gray-700">
          파일은 10MB 이하의 jpg, jpeg, png, pdf만 등록이 가능해요
        </p>
      </header>

      <div className="flex flex-col gap-16 px-24 pb-16 pt-10">
        <Controller
          control={control}
          name="businessLicense"
          render={({ field }) => (
            <FileUploadInput
              label="사업자 등록증"
              required
              placeholder="사업자 등록증을 업로드해주세요"
              value={field.value?.name ?? ''}
              onChange={(file) => handleRegisterFileUpload(file, field.onChange)}
            />
          )}
        />
        <Controller
          control={control}
          name="mailOrderCert"
          render={({ field }) => (
            <FileUploadInput
              label="통신판매업 신고증"
              required
              placeholder="통신판매업 신고증을 업로드해주세요"
              value={field.value?.name ?? ''}
              onChange={(file) => handleRegisterFileUpload(file, field.onChange)}
            />
          )}
        />
        <Controller
          control={control}
          name="foodBusinessCert"
          render={({ field }) => (
            <FileUploadInput
              label="즉석식품제조가공업 & 식품제조업"
              required
              placeholder="즉석식품제조가공업 & 식품제조업을 업로드해주세요"
              value={field.value?.name ?? ''}
              onChange={(file) => handleRegisterFileUpload(file, field.onChange)}
            />
          )}
        />
      </div>
    </section>
  )
}
