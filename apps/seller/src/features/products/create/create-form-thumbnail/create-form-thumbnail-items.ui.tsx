import { useEffect, useState } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { XIcon } from 'lucide-react'

interface SortableImageItemsProps {
  id: string
  file: File
  onDelete: () => void
}

export const SortableImageItems = ({
  id,
  file,
  onDelete,
}: SortableImageItemsProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    // transform이 null일 때의 방어 로직 추가
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? 999 : 1, // 드래그 시 최상단으로
    opacity: isDragging ? 0.3 : 1, // 드래그 중인 원본은 투명하게
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // 드래그 중 커서 모양 변경 및 터치 스크롤 방지
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      <ImagePreviewItem file={file} onDelete={onDelete} />
    </div>
  )
}

interface ImagePreviewItemProps {
  file: File | null
  onDelete: () => void
}

export const ImagePreviewItem = ({ file, onDelete }: ImagePreviewItemProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    // URL 생성
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // 클린업 함수: 컴포넌트가 언마운트되거나 file이 바뀔 때 메모리를 해제
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])
  return (
    <div className="relative h-[120px] w-[120px] overflow-hidden rounded-16 border border-gray-100 bg-gray-50">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className="size-full object-cover"
        />
      )}
      <button
        type="button"
        aria-label="이미지 삭제"
        onClick={onDelete}
        className="absolute top-6 right-6 rounded-full bg-black/10 p-2 text-white transition-colors hover:bg-gray-900/50"
      >
        <XIcon className="size-12" />
      </button>
    </div>
  )
}
