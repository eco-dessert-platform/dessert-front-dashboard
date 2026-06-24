import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { ChevronRightIcon, XIcon } from '@dessert/icons'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Input,
} from '@dessert/ui'

import { registerQueries } from '@/entity/register'
import { cn } from '@/shared/libs/utils'

export interface StoreSelection {
  id: number | null
  name: string
}

interface StoreSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCheckDuplicate: (store: StoreSelection) => void
  isChecking?: boolean
  resetKey?: number
}

export function StoreSearchModal({
  open,
  onOpenChange,
  onCheckDuplicate,
  isChecking = false,
  resetKey = 0,
}: StoreSearchModalProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selected, setSelected] = useState<StoreSelection | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 500)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (resetKey === 0) return
    setQuery('')
    setDebouncedQuery('')
    setSelected(null)
  }, [resetKey])

  const { data, isFetching, isError } = useQuery(
    registerQueries.storeNames(debouncedQuery),
  )

  const results = data?.content ?? []
  const hasResults = results.length > 0
  const hasQuery = query.trim().length > 0
  const canSubmit = Boolean(selected) && !isChecking

  const handleSelect = (store: StoreSelection) => {
    setSelected(store)
  }

  const handleSubmit = () => {
    if (!selected) return
    onCheckDuplicate(selected)
  }

  const handleManualEntry = () => {
    setSelected({ id: null, name: query.trim() })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[900px] max-w-[calc(100%-2rem)] min-w-[326px] gap-0 overflow-hidden rounded-[16px] border-0 bg-white p-0 sm:max-w-[calc(100%-2rem)]"
      >
        <div className="flex w-full flex-col gap-0 bg-white px-20 pt-16 pb-12">
          <div className="flex w-full items-center gap-8">
            <DialogTitle className="flex-1 truncate typo-heading-24-m text-gray-800">
              내 스토어 검색
            </DialogTitle>
            <DialogClose
              aria-label="닫기"
              className="relative flex size-[30px] shrink-0 cursor-pointer items-center justify-center text-gray-800"
            >
              <XIcon className="size-[15px]" />
            </DialogClose>
          </div>
          <DialogDescription className="typo-title-16-r text-gray-600">
            빵그리의 오븐에 자동 등록되어 있는 스토어라면 검색 후 검색된 결과를
            선택해주세요.
          </DialogDescription>
        </div>

        <div className="flex w-full flex-col gap-16 rounded-b-[16px] bg-white px-20 pt-10 pb-16">
          <div className="flex w-full items-start gap-16">
            <Input
              placeholder="스토어를 검색해주세요"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelected(null)
              }}
              className="flex-1"
            />
            <Button
              title="중복검사"
              size="md"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="shrink-0 whitespace-nowrap"
            />
          </div>

          <div className="relative h-[288px] w-full overflow-hidden rounded-10 border border-gray-300">
            <div className="flex h-full flex-col items-start overflow-y-auto p-16 pb-[52px]">
              {hasQuery && hasResults ? (
                results.map((store) => (
                  <button
                    type="button"
                    key={store.id}
                    onClick={() =>
                      handleSelect({ id: store.id, name: store.name })
                    }
                    className={cn(
                      'flex w-full cursor-pointer items-center rounded-10 p-8 text-left typo-title-16-r text-gray-900',
                      selected?.id === store.id
                        ? 'bg-primary-50'
                        : 'hover:bg-primary-50',
                    )}
                  >
                    <HighlightedText
                      text={store.name}
                      highlight={query.trim()}
                    />
                  </button>
                ))
              ) : (
                <p className="typo-title-16-r text-gray-400">
                  {hasQuery
                    ? isFetching
                      ? '검색 중이에요'
                      : isError
                        ? '검색에 실패했어요. 다시 시도해주세요'
                        : '검색되는 스토어가 없어요'
                    : '스토어명을 검색해주세요'}
                </p>
              )}
            </div>

            {hasQuery && (
              <button
                type="button"
                onClick={handleManualEntry}
                className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center gap-4 border-t border-gray-300 bg-gray-100 px-24 py-8"
              >
                <span className="typo-title-16-sb text-primary-500">
                  {query.trim()}
                </span>
                <span className="typo-title-16-r text-gray-900">
                  {hasResults ? '스토어 신규 등록' : '직접입력'}
                </span>
                <ChevronRightIcon
                  aria-hidden
                  className="size-[18px] text-gray-700"
                />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function HighlightedText({
  text,
  highlight,
}: {
  text: string
  highlight: string
}) {
  if (!highlight) return <>{text}</>
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (idx < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary-500">
        {text.slice(idx, idx + highlight.length)}
      </span>
      {text.slice(idx + highlight.length)}
    </>
  )
}
