export type OptionTags = {
  title: string
  tooltip: string
}

export const ESSENTIAL_OPTIONS: OptionTags[] = [
  {
    title: '글루텐프리',
    tooltip: '밀·보리·호밀 등 글루텐 함유 곡물 미포함',
  },
  {
    title: '비건',
    tooltip: '동물성 성분 전혀 없음',
  },
  {
    title: '고단백',
    tooltip: '100g당 11g 이상',
  },
  {
    title: '저지방',
    tooltip: '100g당 3g 미만 / 100ml당 1.5g 미만',
  },
  {
    title: '저당',
    tooltip: '100g당 5g 미만 / 100ml당 2.5g 미만',
  },
]

export const CATEGORY_OPTIONS: OptionTags[] = [
  {
    title: '칼로리 다운',
    tooltip: '저당, 저지방 성분 기준을 충족시 제품에 표시됩니다.',
  },
  {
    title: '단백질 듬뿍',
    tooltip: '고단백 성분 기준을 충족시 제품에 표시됩니다.',
  },
  {
    title: '속 편한 즐거움',
    tooltip: '비건과 글루텐프리 성분 기준을 충족시 제품에 표시됩니다.',
  },
]
