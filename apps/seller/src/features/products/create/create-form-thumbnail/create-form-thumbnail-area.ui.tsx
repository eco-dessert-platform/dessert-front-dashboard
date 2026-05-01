import React, { useEffect } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
} from '@dessert/ui'
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Camera, XIcon } from 'lucide-react'

import { useProductThumbnailForm } from './use-product-thumbnail.hook'
// import { useCreateHeaderSteps } from '../create-store'

export const ThumbnailUploadArea = () => {
  const {
    mainImage,
    extraImages,
    isFormField,
    deleteTarget,
    sensors,
    setDeleteTarget,
    handleFileChange,
    handleImageDelete,
    handleReorderExtraImages,
    handleDragEnd,
  } = useProductThumbnailForm()

  //   const { setProductFields } = useCreateHeaderSteps()

  //   useEffect(() => {
  //     setProductFields({ productThumbnail: isFormField })
  //   }, [isFormField, setProductFields])

  // 16,29~33line : 대표 이미지 등록은 필수 입력 사항으로, 이미지를 등록할 시
  // sticky header 우측 상단의 필수 입력 폼 잔여 갯수와 연동되는 기능입니다.
  // 추후 header 관련 기능을 ContextAPI -> zustand로 마이그레이션 하면서 롤백 할 예정입니다.

  return (
    <>
      <div className="mb-24 flex items-center gap-2">
        <Label
          label="썸네일 등록"
          className="typo-heading-20-sb text-gray-900"
        />
      </div>

      {/* 대표 이미지 영역 */}
      <div className="flex flex-col gap-8">
        <Label
          label="대표 이미지 등록"
          required
          className="typo-heading-18-r text-gray-800"
        />
        <div className="flex flex-col gap-8">
          {mainImage ? (
            <ImagePreviewItem
              file={mainImage}
              onDelete={() => setDeleteTarget('main')}
            />
          ) : (
            <UploadButton
              id="main-image"
              count={0}
              max={1}
              onChange={(e) => handleFileChange(e, 'main')}
            />
          )}
          <p className="mt-8 typo-title-16-r text-gray-600">
            권장 크기 1000×1000, 최소 160×160 이상 (1:1 비율) · jpg, jpeg, png
            형식 · 10MB 이하 파일만 업로드 가능해요
          </p>
        </div>
      </div>

      {/* 추가 이미지 영역 */}
      <div className="mt-32 flex flex-col gap-8">
        <Label
          label="추가 이미지"
          className="typo-heading-18-r text-gray-800"
        />
        <div className="flex flex-wrap gap-12">
          {extraImages.length < 9 && (
            <UploadButton
              id="extra-images"
              count={extraImages.length}
              max={9}
              multiple
              onChange={(e) => handleFileChange(e, 'extra')}
            />
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              // File 객체의 고유 식별자 배열을 넘겨줍니다.
              items={(extraImages as File[]).map(
                (f) => `${f.name}-${f.lastModified}`,
              )}
              strategy={rectSortingStrategy}
            >
              {(extraImages as File[]).map((file, idx) => (
                <SortableImageItem
                  key={`${file.name}-${file.lastModified}`}
                  id={`${file.name}-${file.lastModified}`}
                  file={file}
                  onDelete={() => setDeleteTarget(idx)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleImageDelete}
      />
    </>
  )
}

interface UploadButtonProps {
  id: string
  count: number
  max: number
  multiple?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function UploadButton({
  id,
  count,
  max,
  multiple = false,
  onChange,
}: UploadButtonProps) {
  return (
    <label
      htmlFor={id}
      className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-16 border border-dashed border-gray-200 bg-white transition-colors hover:bg-gray-100"
    >
      <Camera className="w-16 text-gray-300" />
      <span className="typo-body-12-r text-gray-800">
        사진 <span className="text-primary-500">{count}</span>/{max}
      </span>
      <input
        id={id}
        type="file"
        className="hidden"
        accept="image/*"
        multiple={multiple}
        onChange={onChange}
      />
    </label>
  )
}

function ImagePreviewItem({
  file,
  onDelete,
}: {
  file: File
  onDelete: () => void
}) {
  const [previewUrl, setPreviewUrl] = React.useState<string>('')

  useEffect(() => {
    // URL 생성
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // 클린업 함수: 컴포넌트가 언마운트되거나 file이 바뀔 때 메모리를 해제합니다.
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
        onClick={onDelete}
        className="absolute top-6 right-6 rounded-full bg-black/10 p-2 text-white transition-colors hover:bg-gray-900/50"
      >
        <XIcon className="size-12" />
      </button>
    </div>
  )
}

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>이미지를 삭제 하시겠어요?</DialogTitle>
          <DialogDescription>
            현재 등록된 대표 이미지를 삭제하면 기존에
            <br /> 등록된 이미지를 복구할 수 없어요.{' '}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            title="취소"
            variant="secondary-outlined"
            onClick={onClose}
            className="flex-1"
          />
          <Button
            title="확인"
            variant="secondary-filled"
            onClick={onConfirm}
            className="flex-1"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
function SortableImageItem({
  id,
  file,
  onDelete,
}: {
  id: string
  file: File
  onDelete: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
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
