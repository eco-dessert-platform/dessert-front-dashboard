export const REGISTER_TOAST_MESSAGES = {
  FILE_SIZE_EXCEEDED: {
    title: '파일 크기가 초과되었어요',
    description: '10MB 이하의 파일을 첨부해주세요',
  },
  FILE_TYPE_INVALID: {
    title: '파일 형식이 올바르지 않아요',
    description: '파일은 10MB 이하의 jpg, jpeg, png, pdf만 첨부가 가능해요',
  },
  FILE_UPLOAD_SUCCESS: {
    title: '파일 업로드를 완료했어요',
  },
  FILE_UPLOAD_MISSING: {
    title: '파일 업로드가 안되었어요',
    description: '업로드 버튼을 눌러 파일 업로드를 진행해주세요',
  },
  ACCOUNT_VERIFY_MISMATCH: {
    title: '해당 계좌 정보로 등록할 수 없어요',
    description: '예금주명이 대표자명 혹은 사업자명과 일치하지 않아요',
  },
  ACCOUNT_VERIFY_ERROR: {
    title: '계좌 인증 도중 문제가 발생했어요',
    description: '잠시 후 다시 시도해주세요',
  },
  ACCOUNT_VERIFY_SUCCESS: {
    title: '계좌정보 인증을 완료했어요',
  },
  ACCOUNT_VERIFY_REQUIRED: {
    title: '계좌인증을 먼저 완료해주세요',
    description: '계좌인증 후 다음 단계로 진행할 수 있어요',
  },
  DOCUMENT_REGISTER_ERROR: {
    title: '서류 등록 도중 문제가 발생했어요',
    description: '잠시 후 다시 시도해주세요',
  },
  TERMS_AGREEMENT_REQUIRED: {
    title: '필수 약관에 동의해주세요',
    description:
      '이용약관과 개인정보 처리방침에 모두 동의해야 등록할 수 있어요',
  },
  STORE_APPLICATION_ERROR: {
    title: '스토어 등록 신청에 실패했어요',
    description: '잠시 후 다시 시도해주세요',
  },
  PROFILE_IMAGE_REQUIRED: {
    title: '스토어 프로필 이미지를 업로드해주세요',
    description: 'jpg, jpeg, png 형식의 10MB 이하 파일만 업로드할 수 있어요',
  },
} as const
