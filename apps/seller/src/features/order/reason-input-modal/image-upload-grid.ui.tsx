import { useRef } from 'react'

import { ImageIcon, XIcon } from '@dessert/icons'

const MAX_IMAGES = 5
const ACCEPTED_TYPES = 'image/jpeg,image/jpg,image/png'

interface ImageUploadGridProps {
  images: File[]
  onChange: (images: File[]) => void
}

export function ImageUploadGrid({ images, onChange }: ImageUploadGridProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const remaining = MAX_IMAGES - images.length
    const filesToAdd = newFiles.slice(0, remaining)

    onChange([...images, ...filesToAdd])

    // input 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = ''
  }

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="flex gap-6 rounded-10 border border-gray-300 bg-gray-100 p-12">
      {/* 업로드 버튼 */}
      <button
        type="button"
        onClick={handleClick}
        disabled={images.length >= MAX_IMAGES}
        className="flex size-[94px] shrink-0 cursor-pointer flex-col items-center justify-center gap-0 rounded-16 border border-gray-200 bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ImageIcon className="size-[30px] text-gray-400" />
        <div className="flex items-center gap-4 typo-body-12-r">
          <span className="text-gray-800">사진</span>
          <span>
            <span className="text-primary-500">{images.length}</span>
            <span className="text-gray-800">/{MAX_IMAGES}</span>
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 이미지 미리보기 목록 */}
      {images.map((file, index) => (
        <ImagePreview
          key={`${file.name}-${index}`}
          file={file}
          onRemove={() => handleRemove(index)}
        />
      ))}
    </div>
  )
}

function ImagePreview({
  file,
  onRemove,
}: {
  file: File
  onRemove: () => void
}) {
  const url = URL.createObjectURL(file)

  return (
    <div className="relative size-[94px] shrink-0 overflow-clip rounded-16 border border-gray-200">
      <img
        src={url}
        alt={file.name}
        className="size-full object-cover"
        onLoad={() => URL.revokeObjectURL(url)}
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-[5px] top-[5px] flex size-[20px] cursor-pointer items-center justify-center rounded-full bg-black/10"
      >
        <XIcon className="size-[16px] text-white" />
      </button>
    </div>
  )
}
