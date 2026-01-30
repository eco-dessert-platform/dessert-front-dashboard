import { openCenteredPopup } from '@/shared/utils/popup'
import GoogleIcon from 'src/assets/icons/social/google.svg?react'
import KakaoIcon from 'src/assets/icons/social/kakao.svg?react'
import { useAuthStore } from 'src/entity/auth/auth-store'
import { GOOGLE, KAKAO } from 'src/entity/auth/constants'
import { setGooglePopup, setKakaoPopup } from './login-hooks'

export const SocialLoginButtons = () => {
  const { setSocialLoginType } = useAuthStore()

  const openKakaoLoginPopup = () => {
    const query = new URLSearchParams({
      client_id: KAKAO.client_id,
      redirect_uri: KAKAO.redirect_uri,
      response_type: KAKAO.response_type,
    } as Record<string, string>)

    const url = `${KAKAO.authUrl}?${query}`
    const popup = openCenteredPopup(url, 'kakao-login', {
      width: 400,
      height: 650,
    })

    if (popup) {
      setKakaoPopup(popup)
      setSocialLoginType('KAKAO')
    }
  }

  const openGoogleLoginPopup = () => {
    const query = new URLSearchParams({
      client_id: GOOGLE.client_id,
      redirect_uri: GOOGLE.redirect_uri,
      response_type: GOOGLE.response_type,
      scope: GOOGLE.scope,
    } as Record<string, string>)

    const url = `${GOOGLE.authUrl}?${query}`
    const popup = openCenteredPopup(url, 'google-login', {
      width: 400,
      height: 650,
    })

    if (popup) {
      setGooglePopup(popup)
      setSocialLoginType('GOOGLE')
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 self-stretch">
      <button
        type="button"
        onClick={openKakaoLoginPopup}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#FEE500] py-[13px] text-base font-semibold text-[#191919] transition-all duration-200 hover:bg-[#FDD835] active:scale-[0.98]"
      >
        <KakaoIcon width={16} height={16} />
        <span>카카오로 로그인</span>
      </button>
      <button
        type="button"
        onClick={openGoogleLoginPopup}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#F5F5F5] bg-white py-[13px] text-base font-semibold text-black transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
      >
        <GoogleIcon width={18} height={18} />
        <span>구글로 로그인</span>
      </button>
    </div>
  )
}
