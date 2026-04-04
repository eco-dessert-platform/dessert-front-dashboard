import { clsx } from 'clsx'

import loginImg from '@/assets/images/login.png'

interface LoginImageProps {
  className?: string
}

export const AuthLoginImage = ({ className = '' }: LoginImageProps) => {
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
