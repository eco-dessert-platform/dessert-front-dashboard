import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { cn } from '@dessert/core'
import { CameraIcon, XIcon } from '@dessert/icons'


interface StoreProfileImagePreviewProps {
  className?: string
  file?: File | null
  onChange: (file: File | null) => void
}

export function StoreProfileImagePreview({
  className,
  file,
  onChange,
}: StoreProfileImagePreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleUploadAreaClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0]

    if (!nextFile) {
      return
    }

    onChange(nextFile)
    event.target.value = ''
  }

  const handleRemove = () => {
    onChange(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!file) {
      setPreviewUrl('')
      return
    }

    const nextPreviewUrl = URL.createObjectURL(file)
    setPreviewUrl(nextPreviewUrl)

    return () => {
      URL.revokeObjectURL(nextPreviewUrl)
    }
  }, [file])

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="relative size-[200px] overflow-hidden rounded-32 border border-gray-100">
        {previewUrl ? (
          <div className="relative size-full">
            <img
              src={previewUrl}
              alt="스토어 프로필 미리보기"
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="이미지 제거"
              className="absolute top-12 right-12 flex size-20 cursor-pointer items-center justify-center"
            >
              <XIcon className="size-20" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleUploadAreaClick}
            className="flex size-full cursor-pointer flex-col items-center justify-center text-gray-400"
          >
            <CameraIcon
              className="size-24 text-gray-300"
              aria-label="이미지 업로드"
            />
            <span className="text-[14px] font-medium text-gray-400">
              이미지를 업로드해주세요
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
