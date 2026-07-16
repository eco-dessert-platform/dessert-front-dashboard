import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dropdown,
  Textarea,
} from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  STORE_NAME_CHANGE_REJECT_CATEGORY_LABELS,
  StoreNameChangeRejectCategorySchema,
} from '@/entity/store/name-change-approval'
import type { StoreNameChangeRejectCategory } from '@/entity/store/name-change-approval'

import { useRejectStoreNameChangeMutation } from './name-change-approval.mutation'

const rejectCategoryOptions = StoreNameChangeRejectCategorySchema.options.map(
  (value) => ({
    value,
    label: STORE_NAME_CHANGE_REJECT_CATEGORY_LABELS[value],
  }),
)

const STORE_NAME_CHANGE_REJECT_DETAIL_TEMPLATES: Record<
  StoreNameChangeRejectCategory,
  string
> = {
  ADMIN_INAPPROPRIATE:
    '운영정책 또는 서비스 품질 유지를 위해 부적합하다고 판단돼요',
  BRAND_NAME_MISUSE:
    '등록된 상표 또는 타 브랜드의 명칭을 포함하고 있어 타인의 권리를 침해할 우려가 있어요',
  OFFICIAL_STORE_CONFUSION:
    '특정 브랜드의 공식몰로 오인될 수 있는 명칭은 사용할 수 없어요',
  INAPPROPRIATE_LANGUAGE:
    '사회적으로 부적절하거나 불쾌감을 줄 수 있는 단어가 포함되어 있어요',
  PRODUCT_CATEGORY_NAME:
    "'가방전문', '화장품판매' 등 특정 상품군을 일반화한 표현은 스토어명으로 사용할 수 없어요",
  CONTACT_INFO_INCLUDED:
    '전화번호, 이메일, 웹사이트 주소 등 연락처 정보는 스토어명에 포함할 수 없어요',
  ADVERTISING_PHRASE:
    '"최저가", "무료배송", "정품보장" 등 광고성 문구는 스토어명에 사용할 수 없어요',
  SIMILAR_TO_EXISTING_STORE: '기존 스토어명과 유사하여 혼동을 줄 수 있어요',
  ETC: '',
}

const StoreNameRejectFormSchema = z.object({
  category: StoreNameChangeRejectCategorySchema,
  rejectDetail: z
    .string()
    .trim()
    .max(500, '거절 사유는 500자 이하로 입력해주세요.'),
})

type StoreNameRejectFormValues = z.infer<typeof StoreNameRejectFormSchema>

interface NameChangeRejectDialogProps {
  requestId: number | null
  onClose: () => void
}

export const NameChangeRejectDialog = ({
  requestId,
  onClose,
}: NameChangeRejectDialogProps) => {
  const { mutate, isPending } = useRejectStoreNameChangeMutation()
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StoreNameRejectFormValues>({
    resolver: zodResolver(StoreNameRejectFormSchema),
    defaultValues: {
      category: 'ADMIN_INAPPROPRIATE',
      rejectDetail:
        STORE_NAME_CHANGE_REJECT_DETAIL_TEMPLATES.ADMIN_INAPPROPRIATE,
    },
    reValidateMode: 'onSubmit',
  })

  const handleClose = () => {
    if (isPending) return
    reset()
    onClose()
  }

  const onSubmit = (data: StoreNameRejectFormValues) => {
    if (!requestId) return

    const rejectDetail = data.rejectDetail.trim()
    mutate(
      {
        requestId,
        body: {
          category: data.category,
          rejectDetail: rejectDetail || null,
        },
      },
      { onSuccess: handleClose },
    )
  }

  const handleCategorySelect = (value: string) => {
    const category = value as StoreNameChangeRejectCategory

    setValue('category', category, { shouldValidate: true })
    setValue(
      'rejectDetail',
      STORE_NAME_CHANGE_REJECT_DETAIL_TEMPLATES[category],
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    )
  }

  return (
    <Dialog
      open={requestId !== null}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent className="w-[945px] gap-16 sm:max-w-[945px]">
        <DialogHeader className="gap-0">
          <DialogTitle
            showCloseButton
            className="typo-heading-24-m text-gray-800"
          >
            거절 사유
          </DialogTitle>
          <DialogDescription>
            스토어명 변경 거절에 대한 사유를 입력하세요
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          <div className="flex flex-col gap-2">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={rejectCategoryOptions}
                  value={field.value}
                  listClassName="max-h-none overflow-y-visible"
                  disabled={isPending}
                  onSelect={handleCategorySelect}
                />
              )}
            />
            <p className="min-h-5 text-sm text-red-500">
              {errors.category?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Textarea
              {...register('rejectDetail')}
              placeholder="사유"
              maxLength={500}
              disabled={isPending}
              textareaClassName="h-[300px] min-h-[300px]"
            />
            <p className="min-h-5 text-sm text-red-500">
              {errors.rejectDetail?.message}
            </p>
          </div>
          <div className="flex justify-start">
            <Button title="전송" size="md" type="submit" disabled={isPending} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
