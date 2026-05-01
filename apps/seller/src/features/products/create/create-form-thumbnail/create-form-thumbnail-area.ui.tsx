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
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Camera } from 'lucide-react'

import {
  ImagePreviewItem,
  SortableImageItems,
} from './create-form-thumbnail-items.ui'
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
              items={extraImages.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              {extraImages.map((file) => {
                return (
                  <SortableImageItems
                    key={file.id}
                    id={file.id}
                    file={file.file}
                    // idx 대신 고유 ID를 전달
                    onDelete={() => setDeleteTarget(file.id)}
                  />
                )
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteConfirmDialog
        isOpen={deleteTarget !== null}
        deletetarget={deleteTarget === 'main' ? '대표' : '추가'}
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
    <div className="relative">
      <label
        htmlFor={id}
        className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-16 border border-dashed border-gray-200 bg-white transition-colors outline-none focus-within:border-transparent focus-within:ring-2 focus-within:ring-gray-300"
      >
        <Camera className="w-16 text-gray-300" />
        <span className="typo-body-12-r text-gray-800">
          사진 <span className="text-primary-500">{count}</span>/{max}
        </span>

        <input
          id={id}
          type="file"
          className="sr-only"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          multiple={multiple}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

interface DeleteConfirmDialogProps {
  isOpen: boolean
  deletetarget: '대표' | '추가'
  onClose: () => void
  onConfirm: () => void
}

function DeleteConfirmDialog({
  isOpen,
  deletetarget,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>이미지를 삭제 하시겠어요?</DialogTitle>
          <DialogDescription>
            현재 등록된 {deletetarget} 이미지를 삭제하면 기존에
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
