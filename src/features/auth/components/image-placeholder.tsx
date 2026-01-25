import clsx from 'clsx'
import loginImg from 'src/assets/images/login.png'

interface ImagePlaceholderProps {
  className?: string
}

export const ImagePlaceholder = ({ className = '' }: ImagePlaceholderProps) => {
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
