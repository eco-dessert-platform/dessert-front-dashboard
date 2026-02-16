import { cn } from '@/shared/lib/utils'
import Button from '../button/button'

export interface ModalProps {
  open: boolean
  title: React.ReactNode
  contents: React.ReactNode
  cancelable: boolean
  onClose?: () => void
  onClick: () => void
}

const Modal = ({
  open,
  title,
  contents,
  cancelable,
  onClose,
  onClick,
}: ModalProps) => {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 -z-5 bg-black/40 opacity-0 transition-opacity duration-50',
          open && 'z-5 opacity-100',
        )}
        role="button"
        tabIndex={0}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'rounded-16 fixed top-1/2 left-1/2 -z-6 max-w-90 min-w-83.5 -translate-x-1/2 -translate-y-1/2 bg-white px-20 py-16 opacity-0',
          open && 'z-6 opacity-100',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
      >
        <p className="typo-heading-24-m mb-12" id="modal-title">
          {title}
        </p>
        <p className="typo-title-16-r mb-24 text-gray-700" id="modal-content">
          {contents}
        </p>
        <div className="flex justify-end gap-8">
          {cancelable && (
            <Button
              title="취소"
              onClick={onClose}
              variant="secondary-outlined"
            />
          )}
          <Button title="확인" onClick={onClick} variant="secondary-filled" />
        </div>
      </div>
    </>
  )
}

export default Modal
