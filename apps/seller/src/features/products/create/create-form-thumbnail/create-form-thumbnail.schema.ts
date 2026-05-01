import { z } from 'zod'

export const thumbnailSchema = z.object({
  mainImage: z
    .instanceof(File, {
      message: '대표 이미지는 필수 입력사항입니다.',
    })
    .nullable(),

  extraImages: z
    .array(
      z.object({
        id: z.string(),
        file: z.instanceof(File),
      }),
    )
    .max(9, { message: '추가 이미지는 최대 9개까지 등록 가능합니다.' })
    .default([]),
})
