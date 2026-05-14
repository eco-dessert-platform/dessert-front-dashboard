export const STORE_NAME_RULE = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 50,
  ERROR_MESSAGE: '스토어명은 3~50자 이내로 입력해주세요.',
} as const

export function getStoreNameValidationState(storeName: string) {
  const storeNameLength = storeName.length
  const hasStoreName = storeNameLength > 0
  const isStoreNameLengthInvalid =
    storeNameLength < STORE_NAME_RULE.MIN_LENGTH ||
    storeNameLength > STORE_NAME_RULE.MAX_LENGTH

  const shouldShowStoreNameError = hasStoreName && isStoreNameLengthInvalid
  const isSubmitButtonDisabled = !hasStoreName || shouldShowStoreNameError

  return {
    hasStoreName,
    shouldShowStoreNameError,
    isSubmitButtonDisabled,
  }
}
