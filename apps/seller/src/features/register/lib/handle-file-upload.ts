import { toast } from '@dessert/ui'

import {
  FILE_UPLOAD_LIMITS,
} from '@/entity/register'
import { REGISTER_TOAST_MESSAGES } from '@/features/register'

type FileUploadResult = 'success' | 'size-exceeded' | 'type-invalid' | 'cleared'

export const handleRegisterFileUpload = (
  file: File | null,
  onAccept: (file: File | undefined) => void,
): FileUploadResult => {
  if (!file) {
    onAccept(undefined)
    return 'cleared'
  }

  if (file.size > FILE_UPLOAD_LIMITS.MAX_SIZE_BYTES) {
    const msg = REGISTER_TOAST_MESSAGES.FILE_SIZE_EXCEEDED
    toast.error(msg.title, msg.description)
    return 'size-exceeded'
  }

  const allowed = FILE_UPLOAD_LIMITS.ALLOWED_TYPES as readonly string[]
  if (!allowed.includes(file.type)) {
    const msg = REGISTER_TOAST_MESSAGES.FILE_TYPE_INVALID
    toast.error(msg.title, msg.description)
    return 'type-invalid'
  }

  onAccept(file)
  toast.success(REGISTER_TOAST_MESSAGES.FILE_UPLOAD_SUCCESS.title)
  return 'success'
}
