export const REGISTER_MESSAGES = {
  COMPLETE: {
    PENDING: {
      TITLE: '승인 대기 중',
      DESCRIPTION:
        '빵그리의 오븐 판매자 채널에 가입해 주셔서 진심으로 감사드립니다. 고객님의 가입 정보는 확인 후 승인 절차를 거치게 되며, 승인까지는 영업일 기준 1~2일 정도 소요됩니다. 승인될 때까지 조금만 기다려 주세요.',
      CTA: '로그인 화면으로 이동',
    },
    APPROVED: {
      TITLE: '승인 완료',
      DESCRIPTION:
        '스토어 등록이 승인되었습니다. 셀러 대시보드에서 상품을 등록하고 판매를 시작해 보세요.',
      CTA: '대시보드로 이동',
    },
    REJECTED: {
      TITLE: '승인 거절',
      DESCRIPTION:
        '스토어 등록 신청이 거절되었습니다. 거절 사유를 확인한 뒤 고객센터로 문의해 주세요.',
      CTA: '로그인 화면으로 이동',
    },
  },
} as const
