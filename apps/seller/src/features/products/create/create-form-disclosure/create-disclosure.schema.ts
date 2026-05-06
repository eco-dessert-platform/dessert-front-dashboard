import { z } from 'zod'

import { DISCLOSURE_FIELDS } from './product-disclosure.constant'

// DISCLOSURE_FIELDS 상수를 기반으로 스키마 객체를 동적 생성합니다.
// 타입 추론을 위해 ZodTypeAny를 사용합니다.
const noticeSchemaObject = DISCLOSURE_FIELDS.reduce(
  (acc, field) => ({
    ...acc,
    [field.key]: z.string(),
  }),
  {} as Record<(typeof DISCLOSURE_FIELDS)[number]['key'], z.ZodString>,
)

const modeSchemaObject = DISCLOSURE_FIELDS.reduce(
  (acc, field) => ({
    ...acc,
    [field.key]: z.enum(['default', 'manual']),
  }),
  {} as Record<(typeof DISCLOSURE_FIELDS)[number]['key'], z.ZodTypeAny>,
)

export const disclosureSchema = z
  .object({
    productInfoNotice: z.object(noticeSchemaObject),
    productInfoNoticeMode: z.object(modeSchemaObject),
  })
  .superRefine((data, ctx) => {
    const noticeMode = data.productInfoNoticeMode as Record<string, string>
    const noticeValue = data.productInfoNotice as Record<string, string>

    DISCLOSURE_FIELDS.forEach((field) => {
      if (noticeMode[field.key] === 'manual') {
        const val = noticeValue[field.key]
        if (val.trim().length < 3 || val.trim().length >= 50) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '3자 이상 50자 미만으로 입력해 주세요',
            path: ['productInfoNotice', field.key],
          })
        }
      }
    })
  })
