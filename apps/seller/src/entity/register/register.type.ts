export interface Store {
  storeId: number
  name: string
  introduce: string
  profile: string
  phoneNumber: string
  subPhoneNumber: string
  email: string
  originAddress: string
  originAddressDetail: string
}

export interface StoreNamesResult {
  content: { id: number; name: string }[]
  nextCursor: number
  hasNext: boolean
  totalCount: number | null
}

export interface StoreNameCheckResult {
  available: boolean
  store: Store | null
}

export type StoreApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface StoreApplicationRequest {
  storeName: string
  profile: string
  introduce: string
  phoneNumber: string
  subPhoneNumber: string | null
  email: string
  originAddress: string
  originAddressDetail: string
  storeId: number | null
}

export interface SubmitStoreApplicationInput {
  request: StoreApplicationRequest
  profileImage?: File | null
}

export interface AccountVerificationRequest {
  bankCode: string
  accountNumber: string
}

export interface AccountVerificationResult {
  id: number
  seller_id: number
  verified: boolean
  createdAt: string
}

export interface AccountVerificationDetail {
  id: number
  sellerId: number
  bankCode: string
  accountNumber: string
  accountHolder: string
  verified: boolean
  createdAt: string
}

export type SellerDocumentType =
  | 'BUSINESS_REGISTRATION_CERTIFICATE'
  | 'MAIL_ORDER_SALES_REPORT'
  | 'FOOD_MANUFACTURE_LICENSE'
  | 'BANKBOOK_COPY'

export type SellerDocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface SellerDocument {
  sellerDocumentId: number
  sellerId: number
  url: string
  documentName: string
  documentType: SellerDocumentType
  status: SellerDocumentStatus
  createdAt: string
}

export interface RegisterDocumentsRequest {
  businessLicense: File
  mailOrderLicense: File
  bankbookCopy: File
  foodManufactureLicense: File
  accountVerificationId: number
}

export type RegisterDocumentsResult = SellerDocument[]

export interface StoreApplicationResult {
  storeApplicationId: number
  sellerId: number
  storeId: number
  name: string
  introduce: string
  profile: string
  status: StoreApplicationStatus
  phoneNumber: string
  subPhoneNumber: string
  email: string
  originAddress: string
  originAddressDetail: string
  createdAt: string
  modifiedAt: string
}
