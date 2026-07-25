import { useEffect } from 'react'

import { PlusIcon, SquarePenIcon } from '@dessert/icons'
import { Button, Label } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import AppLogoImage from '@/assets/images/apple-120x120.png'
import { ROUTES } from '@/shared/constant/routes'

import { useProductCreationStore } from '../create-form'
import { useCreateHeaderSteps } from '../create-header'

export const ProductDetailArea = () => {
  const navigate = useNavigate()
  const { productDetail } = useProductCreationStore()
  const { setProductFields } = useCreateHeaderSteps()

  const hasContent =
    productDetail.trim() !== '' && productDetail !== '<p><br></p>'

  useEffect(() => {
    setProductFields({ productDetail: hasContent })
  }, [hasContent, setProductFields])

  const handleEditClick = () => {
    navigate(ROUTES.PRODUCTS.CREATE_DETAIL)
  }

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
            onClick={handleEditClick}
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
          onClick={handleEditClick}
        />
      )}
    </>
  )
}
