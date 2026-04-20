import React, { useEffect, useRef } from 'react'

import { CameraIcon, XIcon } from 'lucide-react' // 아이콘 라이브러리 적절히 사용
import { useFieldArray, useFormContext } from 'react-hook-form'

import { cn } from '@/shared/libs/utils'

import { useProductThumbnailForm } from './use-product-thumnail-form.hook'
import { useCreateFormSteps } from '../create-form/use-create-form-steps.hook'

export function ThumbnailUploadArea() {
  const {
    form,
    mainImage,
    extraImages,
    isFormField,
    handleMainImageChange,
    handleExtraImagesChange,
  } = useProductThumbnailForm()

  const { setProductFields } = useCreateFormSteps()

  useEffect(() => {
    setProductFields((prev) => ({ ...prev, productDelivery: isFormField }))
  }, [isFormField, setProductFields])

  // 이미지 삭제 모달 상태 관리 (커스텀 필요)
  const handleDelete = (index: number | 'main') => {
    // 프로젝트 공통 모달이 있다면 window.confirm 대신 교체 가능
    if (!window.confirm('이미지를 제거하시겠습니까?')) return

    if (index === 'main') {
      handleMainImageChange(null)
    } else {
      const newImages = extraImages.filter((_, i) => i !== index)
      handleExtraImagesChange(newImages)
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'extra',
  ) => {
    const files = e.target.files
    if (!files) return

    if (type === 'main') {
      handleMainImageChange(files[0])
    } else {
      const remainingSlots = 9 - extraImages.length
      const newFiles = Array.from(files).slice(0, remainingSlots)
      handleExtraImagesChange([...extraImages, ...newFiles])
    }
    // 동일 파일 다시 선택 가능하도록 초기화
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-gray-900">썸네일 등록</h3>

      {/* 대표 이미지 영역 */}
      <div className="flex flex-col gap-4">
        <label className="typo-body-14-m text-gray-700">
          대표 이미지 등록<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col gap-2">
          {mainImage ? (
            <ImagePreviewItem
              src={URL.createObjectURL(mainImage)}
              onDelete={() => handleDelete('main')}
            />
          ) : (
            <UploadButton
              id="main-image"
              count={0}
              max={1}
              onChange={(e) => handleFileChange(e, 'main')}
            />
          )}
          <p className="mt-2 typo-body-12-r text-gray-400">
            권장 크기 1000×1000, 최소 160×160 이상 (1:1 비율) · jpg, jpeg, png
            형식 · 10MB 이하 파일만 업로드 가능해요
          </p>
        </div>
      </div>

      {/* 추가 이미지 영역 */}
      <div className="flex flex-col gap-4">
        <label className="typo-body-14-m text-gray-700">추가 이미지</label>
        <div className="flex flex-wrap gap-3">
          {/* 추가 이미지들은 업로드 버튼이 항상 앞에 오거나 뒤에 오도록 배치 */}
          {extraImages.length < 9 && (
            <UploadButton
              id="extra-images"
              count={extraImages.length}
              max={9}
              multiple
              onChange={(e) => handleFileChange(e, 'extra')}
            />
          )}
          {extraImages.map((file: File, idx: number) => (
            <ImagePreviewItem
              key={idx}
              src={URL.createObjectURL(file)}
              onDelete={() => handleDelete(idx)}
            />
          ))}
        </div>
      </div>
    </div>
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
      className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
    >
      <CameraIcon className="size-6 text-gray-300" />
      <span className="mt-2 typo-body-12-m text-gray-400">
        사진 <span className={count > 0 ? 'text-primary' : ''}>{count}</span>/
        {max}
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

// 프리뷰 아이템 컴포넌트
function ImagePreviewItem({
  src,
  onDelete,
}: {
  src: string
  onDelete: () => void
}) {
  return (
    <div className="relative h-[120px] w-[120px] overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
      <img src={src} alt="preview" className="size-full object-cover" />
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-1 right-1 rounded-full bg-gray-900/50 p-1 text-white transition-colors hover:bg-gray-900"
      >
        <XIcon className="size-3" />
      </button>
    </div>
  )
}
