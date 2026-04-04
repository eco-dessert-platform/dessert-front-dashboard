import { useNavigate } from 'react-router-dom'

import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button, Editor } from '@dessert/ui'

import { useProductCreationStore } from '@/features/products/create/create-form/product-creation.store'

export function DetailEditPage() {
  const navigate = useNavigate()
  const { productDetail, setProductDetail } = useProductCreationStore()

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#fafafa]">
      {/* Header */}
      <header className="flex h-[80px] shrink-0 items-center border-b border-gray-300 bg-white px-24 py-10">
        <div className="flex items-center">
          <BbanggreuiOvenLogo className="h-[42px] w-auto" />
        </div>
      </header>

      {/* Content Body */}
      <main className="flex flex-1 flex-col items-center overflow-auto px-[196px] pb-[100px]">
        {/* Editor wrapper */}
        <div className="mt-32 flex min-h-[710px] w-full max-w-[1440px] flex-col bg-white p-32 shadow-sm">
          <Editor
            value={productDetail}
            onChange={setProductDetail}
            image={true}
            height={600}
            placeholder="자유롭게 상세페이지를 작성해보세요 (권장크기 : 가로 860px)"
          />
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="fixed bottom-0 z-10 flex w-full shrink-0 items-center justify-end gap-12 border-t border-gray-200 bg-white p-24">
        <Button
          type="button"
          title="취소"
          variant="primary-outlined"
          size="lg"
          onClick={() => navigate(-1)}
        />
        <Button
          type="button"
          title="등록하기"
          variant="primary-filled"
          size="lg"
          onClick={() => {
            // 구현 후속 시 상태를 저장하고 이전 폼 페이지로 돌아가도록 수정 필요
            navigate(-1)
          }}
        />
      </footer>
    </div>
  )
}
