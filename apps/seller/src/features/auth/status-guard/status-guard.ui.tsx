import { useEffect } from 'react'

import { getCookie } from '@dessert/core'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getPostLoginPath, useAuthStore } from '@/entity/auth'
import { ROUTES } from '@/shared/constant/routes'

function AuthBootstrapping() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">잠시만 기다려 주세요</p>
    </div>
  )
}

function useClearStaleSession() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    if (!hasHydrated) return
    if (isLoggedIn && !getCookie('accessToken')) {
      logout()
    }
  }, [hasHydrated, isLoggedIn, logout])
}

function hasValidSession(isLoggedIn: boolean, sellerStatus: string | null) {
  return Boolean(isLoggedIn && sellerStatus && getCookie('accessToken'))
}

/** 로그인 화면 — 이미 로그인된 경우 상태별 경로로 이동 */
export function GuestOnlyRoute() {
  useClearStaleSession()
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const sellerStatus = useAuthStore((s) => s.sellerStatus)

  if (!hasHydrated) {
    return <AuthBootstrapping />
  }

  if (hasValidSession(isLoggedIn, sellerStatus) && sellerStatus) {
    return <Navigate to={getPostLoginPath(sellerStatus)} replace />
  }

  return <Outlet />
}

/** 회원가입 플로우 — NEW/PENDING/REJECTED만 접근, APPROVED는 대시보드로 */
export function RegisterAccessRoute() {
  useClearStaleSession()
  const location = useLocation()
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const sellerStatus = useAuthStore((s) => s.sellerStatus)

  if (!hasHydrated) {
    return <AuthBootstrapping />
  }

  if (!hasValidSession(isLoggedIn, sellerStatus) || !sellerStatus) {
    return <Navigate to={ROUTES.AUTH} replace />
  }

  if (sellerStatus === 'APPROVED') {
    return <Navigate to={ROUTES.PRODUCTS.ALL} replace />
  }

  // 승인 대기/거절은 완료 화면만 허용
  if (
    (sellerStatus === 'PENDING' || sellerStatus === 'REJECTED') &&
    location.pathname !== ROUTES.REGISTER.COMPLETE
  ) {
    return <Navigate to={ROUTES.REGISTER.COMPLETE} replace />
  }

  return <Outlet />
}

/** 셀러 대시보드 — APPROVED만 접근 */
export function ApprovedOnlyRoute() {
  useClearStaleSession()
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const sellerStatus = useAuthStore((s) => s.sellerStatus)

  if (!hasHydrated) {
    return <AuthBootstrapping />
  }

  if (!hasValidSession(isLoggedIn, sellerStatus) || !sellerStatus) {
    return <Navigate to={ROUTES.AUTH} replace />
  }

  if (sellerStatus !== 'APPROVED') {
    return <Navigate to={getPostLoginPath(sellerStatus)} replace />
  }

  return <Outlet />
}
