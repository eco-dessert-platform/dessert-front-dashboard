import clsx from 'clsx'
import loginImg from '../../../assets/images/login.png'

interface AuthLoginImageProps {
  className?: string
}

const AuthLoginImage = ({ className = '' }: AuthLoginImageProps) => {
  return (
    <div
      className={clsx('relative flex-1 shrink-0 overflow-hidden', className)}
    >
      <img
        src={loginImg}
        alt="Login Illustration"
        className="h-full w-full rounded-[20px] object-cover"
      />
    </div>
  )
}

export default AuthLoginImage
