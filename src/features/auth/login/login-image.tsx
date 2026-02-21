import clsx from 'clsx'
import loginImg from 'src/assets/images/login.png'

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
        className="size-full rounded-20 object-cover"
      />
    </div>
  )
}

export default AuthLoginImage
