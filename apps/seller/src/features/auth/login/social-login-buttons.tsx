import GoogleIcon from '@/assets/icons/social/google.svg?react'
import KakaoIcon from '@/assets/icons/social/kakao.svg?react'
import { OAUTH_URLS } from '@/entity/auth/constants'

export const SocialLoginButtons = () => {
  const handleKakaoLogin = () => {
    window.location.href = OAUTH_URLS.kakao
  }

  const handleGoogleLogin = () => {
    window.location.href = OAUTH_URLS.google
  }

  return (
    <div className="flex flex-col items-center gap-3 self-stretch">
      <button
        type="button"
        onClick={handleKakaoLogin}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-10 bg-[#FEE500] py-[13px] text-base font-semibold text-[#191919] transition-all duration-200 hover:bg-[#FDD835] active:scale-[0.98]"
      >
        <KakaoIcon width={16} height={16} />
        <span>카카오로 로그인</span>
      </button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-10 border border-[#F5F5F5] bg-white py-[13px] text-base font-semibold text-black transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
      >
        <GoogleIcon width={18} height={18} />
        <span>구글로 로그인</span>
      </button>
    </div>
  )
}
