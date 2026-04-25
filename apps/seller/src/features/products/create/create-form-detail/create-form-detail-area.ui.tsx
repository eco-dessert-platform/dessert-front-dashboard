import { useEffect, useState } from 'react'

import { PlusIcon, SquarePenIcon } from '@dessert/icons'
import { Button, Label } from '@dessert/ui'

import AppLogoImage from '@/assets/images/apple-120x120.png'

import { ProductEditorModal } from './create-detail-editor-modal.ui'
import { useProductCreationStore } from '../create-form/product-creation.store'
import { useCreateFormSteps } from '../create-form/use-create-form-steps.hook'

export const ProductDetailArea = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const { productDetail } = useProductCreationStore()
  const { setProductFields } = useCreateFormSteps()

  // Quill 에디터의 빈 콘텐츠 체크 로직 (Zustand 상태 기반)
  const hasContent =
    productDetail.trim() !== '' && productDetail !== '<p><br></p>'

  // 내용 유무에 따라 상품 등록 폼의 완료 상태 업데이트
  useEffect(() => {
    setProductFields((prev) => ({
      ...prev,
      productDetail: hasContent,
    }))
  }, [hasContent, setProductFields])

  return (
    <>
      <div className="mb-24 flex flex-col gap-4">
        <Label
          label="상세페이지 등록"
          className="typo-heading-20-sb text-gray-900"
        />
        <p className="typo-title-16-r text-gray-700">권장 크기 : 가로 860px</p>
      </div>

      {hasContent ? (
        // 1. 작성된 데이터가 있을 때 나오는 UI
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center justify-center gap-8 pt-10 pb-20">
            <img
              src={AppLogoImage}
              alt="App Logo"
              className="size-[60px] rounded-10 object-contain"
            />
            <p className="typo-heading-18-sb text-primary-500">
              작성된 내용이 있어요!
            </p>
          </div>
          <Button
            type="button"
            title="상세페이지 수정"
            variant="primary-outlined"
            size="lg"
            leftIcon={<SquarePenIcon width={24} height={24} />}
            className="w-full"
            onClick={() => setIsEditorOpen(true)}
          />
        </div>
      ) : (
        // 2. 처음 렌더링 시 빈 화면 UI
        <Button
          type="button"
          title="상세페이지 등록"
          variant="primary-outlined"
          size="lg"
          leftIcon={<PlusIcon width={24} height={24} />}
          className="w-full"
          onClick={() => setIsEditorOpen(true)}
        />
      )}

      <ProductEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  )
}
