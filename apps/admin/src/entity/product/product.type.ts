export interface ProductOption {
  optionId: number
  optionName: string
  price: number
  stock: number
  tags: string[]
}

export interface Product {
  productId: number
  storeName: string
  productName: string
  productPrice: number
  productOptions: ProductOption[]
}

export interface ProductResponse {
  success: boolean
  code: number
  message: string
  result: {
    contents: Product[]
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}
