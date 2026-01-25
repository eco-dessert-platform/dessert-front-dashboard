import { openCenteredPopup } from 'src/shared/utils/popup'
import ButtonKakao from 'src/assets/icons/button/bbangle-kakao-button.svg?react'
import ButtonGoogle from 'src/assets/icons/button/bbangle-google-button.svg?react'
import { KAKAO, GOOGLE } from 'src/entity/auth/constants'
import { useAuthStore } from 'src/entity/auth/auth-store'
import { setKakaoPopup, setGooglePopup } from './login-hooks'

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
      <ButtonKakao onClick={openKakaoLoginPopup} className="cursor-pointer" />
      <ButtonGoogle onClick={openGoogleLoginPopup} className="cursor-pointer" />
    </div>
  )
}
