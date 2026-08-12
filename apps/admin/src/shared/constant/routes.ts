export const ROUTES = {
  HOME: '/',
  STORE: {
    MEMBER_APPROVAL: '/store/member-approval',
    NAME_CHANGE_APPROVAL: '/store/name-change-approval',
  },
  PRODUCTS: {
    UPLOAD_APPROVAL: '/products/upload-approval',
    ALL: '/products/all',
  },
  HOMEPAGE: {
    NOTICE: '/homepage/notice',
    NOTICE_CREATE: '/homepage/notice/create',
    NOTICE_EDIT: '/homepage/notice/:noticeId/edit',
  },
  LOGIN: '/login',
} as const
