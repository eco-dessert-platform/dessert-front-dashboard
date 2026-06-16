import type { StoreFormSchema, StoreSchema } from './store-register.contract'
import type { z } from 'zod'

export type Store = z.infer<typeof StoreSchema>
export type StoreFormValues = z.infer<typeof StoreFormSchema>

// 생성: multipart의 request JSON 파트 + 프로필 이미지 파일
export type CreateStoreInput = {
  request: StoreFormValues
  profileImage?: File
}

// 수정: storeId 경로 + 동일 폼 필드
export type UpdateStoreInput = {
  storeId: number
  request: StoreFormValues
}
