import { Button, Editor, Input, Label } from '@dessert/ui'
import { Controller } from 'react-hook-form'

import { useNoticeForm } from './use-notice-form.hook'

import type { NoticeFormValues } from './notice-form.schema'

interface NoticeFormProps {
  title: string
  submitLabel: string
  defaultValues: NoticeFormValues
  onSubmit: (values: NoticeFormValues) => Promise<void> | void
}

export const NoticeForm = ({
  title,
  submitLabel,
  defaultValues,
  onSubmit,
}: NoticeFormProps) => {
  const {
    control,
    errors,
    handleImageUpload,
    handleSubmit,
    isSubmitting,
    register,
  } = useNoticeForm({ defaultValues, onSubmit })

  return (
    <form
      className="flex w-[900px] flex-col gap-24 p-40"
      onSubmit={handleSubmit}
    >
      <h1 className="typo-heading-20-sb text-gray-900">{title}</h1>

      <Input
        label="공지사항명"
        required
        placeholder="제목을 입력하세요."
        error={!!errors.title}
        errorMessage={errors.title?.message}
        {...register('title')}
      />

      <div className="flex flex-col gap-8">
        <Label label="공지사항 내용" required />
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <Editor
              value={field.value}
              onChange={field.onChange}
              placeholder="내용을 입력하세요."
              image
              onImageUpload={handleImageUpload}
              height={340}
              className={errors.content ? 'border-error-500' : ''}
            />
          )}
        />
        {errors.content?.message && (
          <span className="typo-body-12-r text-error-500">
            {errors.content.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        title={submitLabel}
        size="lg"
        className="ml-auto w-[160px]"
        disabled={isSubmitting}
      />
    </form>
  )
}
