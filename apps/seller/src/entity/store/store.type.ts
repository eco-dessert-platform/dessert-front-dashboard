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

export interface StoreNameCheckResult {
  available: boolean
  store: Store | null
}
