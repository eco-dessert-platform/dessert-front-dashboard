export type StoreNameRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type StoreReservationStatus = 'RESERVED' | 'ACTIVE' | 'NONE'
export type RejectCategory = 'ETC'

export interface StoreDetail {
  storeId: number
  name: string
  introduce: string
  phoneNumber: string
  email: string
  originAddress: string
  originAddressDetail: string
}

export interface CheckStoreNameResponse {
  available: boolean
  store: StoreDetail
}

export interface UpdateStoreNameResponse {
  sellerId: number
  storeId: number
  storeNameReuqestId: number
  currentName: string
  newName: string
  status: StoreNameRequestStatus
  rejectCategory: RejectCategory
  rejectDetail: string
}

export interface updateStoreDetailRequest {
  introduce: string
  phoneNumber: string
  subPhoneNumber?: string
  email: string
  originAddress: string
  originAddressDetail: string
}

export type UpdateStoreDetailResponse = StoreDetail

export interface SellerAccountVerification {
  id: number
  sellerId: number
  bankCode: string
  accountNumber: string
  accountHolder: string
  verifed: boolean
  createdAt: string
}

export interface UpdateSellerAccountRequest {
  bankCode: string
  accountNumber: string
  accountHolder: string
}
