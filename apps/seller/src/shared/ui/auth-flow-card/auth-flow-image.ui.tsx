import { clsx } from 'clsx'

import loginImg from '@/assets/images/login.png'

interface AuthFlowImageProps {
  className?: string
  alt?: string
}

export const AuthFlowImage = ({
  className = '',
  alt = 'Auth Flow Illustration',
}: AuthFlowImageProps) => {
  return (
    <div
      className={clsx('relative flex-1 shrink-0 overflow-hidden', className)}
    >
      <img
        src={loginImg}
        alt={alt}
        className="size-full rounded-20 object-cover"
      />
    </div>
  )
}
