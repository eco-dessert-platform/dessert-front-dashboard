export type SocialProvider = 'google' | 'kakao'

export type SellerStatus = 'NEW' | 'PENDING' | 'APPROVED' | 'REJECTED'

export interface OAuthTokenRequest {
  generateToken: string
}

export interface OAuthTokenResult {
  sellerId: number
  status: SellerStatus
}

export interface ApiResponse<T = undefined> {
  success: boolean
  code: number
  message: string
  result?: T
}
