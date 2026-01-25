import { useNavigate } from 'react-router-dom'
import BgrButton from 'src/shared/components/button/BgrButton'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="mb-8">
        <h1 className="text-primary-500 text-9xl font-black">404</h1>
        <p className="mt-4 text-2xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </p>
        <p className="mt-2 text-gray-600">
          죄송합니다. 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>

      <div className="flex gap-4">
        <BgrButton
          title="이전으로"
          variant="secondary-outlined"
          onClick={() => navigate(-1)}
          className="min-w-[140px]"
        />
        <BgrButton
          title="홈으로 이동"
          onClick={() => navigate('/')}
          className="min-w-[140px]"
        />
      </div>
    </div>
  )
}

export default NotFoundPage
