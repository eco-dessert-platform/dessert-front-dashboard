import loginImg from '@/assets/images/login.png'
import { cn } from '@/shared/libs/utils'

interface AuthFlowImageProps {
  className?: string
  alt?: string
}

export const AuthFlowImage = ({
  className = '',
  alt = '',
}: AuthFlowImageProps) => {
  const isDecorative = alt === ''
  return (
    <div className={cn('relative flex-1 shrink-0 overflow-hidden', className)}>
      <img
        src={loginImg}
        alt={alt}
        aria-hidden={isDecorative || undefined}
        className="size-full rounded-20 object-cover"
      />
    </div>
  )
}
