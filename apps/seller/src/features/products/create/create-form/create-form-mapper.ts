import {
  CreateFormType,
  ProductOptionFormInput,
} from '@/entity/products/create/create-form'

const CATEGORY_MAP: Record<string, string> = {
  bread_white: 'BREAD',
  bread_bagel: 'BAGEL',
  bread_cake: 'CAKE',
  bread_etc: 'ETC',
  snack_jam: 'JAM',
  snack_cookie: 'COOKIE',
  snack_granola: 'GRANOLA',
  snack_etc: 'ETC',
}

const DAY_MAP: Record<string, string> = {
  mon: 'monday',
  tue: 'tuesday',
  wed: 'wednesday',
  thu: 'thursday',
  fri: 'friday',
  sat: 'saturday',
  sun: 'sunday',
}

const mapOption = (option: ProductOptionFormInput, index: number) => ({
  [`products[${index}].title`]: option.optionName,
  [`products[${index}].category`]: CATEGORY_MAP[option.subCategory] ?? 'ETC',
  [`products[${index}].plusPriceWithBoardPrice`]: option.additionalPrice ?? 0,
  [`products[${index}].stock`]: option.stockQuantity ?? 0,
  [`products[${index}].dietaryTags.glutenFreeTag`]:
    option.ingredientCategories.includes('glutenFree'),
  [`products[${index}].dietaryTags.highProteinTag`]:
    option.protein !== null && option.protein >= 11,
  [`products[${index}].dietaryTags.sugarFreeTag`]:
    option.sugar !== null && option.sugar < 5,
  [`products[${index}].dietaryTags.veganTag`]:
    option.ingredientCategories.includes('vegan'),
  [`products[${index}].dietaryTags.ketogenicTag`]: false,
  ...Object.entries(DAY_MAP).reduce(
    (acc, [short, full]) => ({
      ...acc,
      [`products[${index}].availability.${full}`]: option.shippingDays.includes(
        short as ProductOptionFormInput['shippingDays'][number],
      ),
    }),
    {},
  ),
  ...(option.hasNutrition
    ? {
        [`products[${index}].nutritionInfo.totalWeight`]:
          option.totalWeight ?? 0,
        [`products[${index}].nutritionInfo.servingSize`]:
          option.totalWeight ?? 0,
        [`products[${index}].nutritionInfo.carbohydrates`]:
          option.carbohydrate ?? 0,
        [`products[${index}].nutritionInfo.sugars`]: option.sugar ?? 0,
        [`products[${index}].nutritionInfo.protein`]: option.protein ?? 0,
        [`products[${index}].nutritionInfo.fat`]: option.fat ?? 0,
        [`products[${index}].nutritionInfo.calories`]: option.calories ?? 0,
      }
    : {}),
})

const toProductionTimeFormat = (time: string): string => {
  // "06:00~07:00" or "06:00" 둘 다 처리
  const start = time.split('~')[0].trim() // "06:00"
  const [hour] = start.split(':') // "06"
  const nextHour = String(Number(hour) + 1).padStart(2, '0') // "07"
  return `T_${hour}_${nextHour}` // "T_06_07"
}

// 에디터 이미지 추출 — src에서 파일명만 추출
const extractEditorImages = (
  content: string,
  imageFiles: Map<string, File>,
): { processedContent: string; files: File[] } => {
  const files: File[] = []
  const processedContent = content.replace(
    /<img[^>]+src=["']([^"']+)["'][^>]*>/g,
    (match, src) => {
      const file = imageFiles.get(src)
      if (file) {
        files.push(file)
        return match.replace(src, file.name)
      }
      return match
    },
  )
  return { processedContent, files }
}

export const buildProductFormData = (
  form: CreateFormType,
  productDetail: string,
  editorImageFiles: Map<string, File>, // blob URL → File 매핑
  storeId: number,
): FormData => {
  const multipartData = new FormData()

  // 썸네일 이미지
  if (form.mainImage) {
    multipartData.append('thumbnailImgFile', form.mainImage)
  }

  // 서브 이미지
  form.extraImages.forEach((file) => {
    multipartData.append('productImgs', file)
  })

  // 에디터 이미지 처리
  const { processedContent, files: editorFiles } = extractEditorImages(
    productDetail,
    editorImageFiles,
  )
  editorFiles.forEach((file) => {
    multipartData.append('boardDetailImages', file)
  })

  // @ModelAttribute 필드들 직접 append
  multipartData.append('storeId', String(storeId))
  multipartData.append('title', form.productName)
  multipartData.append('isFresh', String(form.isFresh))
  // 필드명도 productionStartTime으로 변경
  multipartData.append(
    'productionStartTime',
    toProductionTimeFormat(form.productionTime),
  )
  multipartData.append('price', String(form.price ?? 0))
  multipartData.append(
    'discountType',
    form.discountType === 'AMOUNT' ? 'AMOUNT' : 'RATE',
  )
  multipartData.append('discountValue', String(form.discountAmount ?? 0))
  multipartData.append('deliveryCondition', form.deliveryTerms)
  multipartData.append('deliveryCompany', form.deliveryCompany)
  multipartData.append('deliveryFee', String(form.deliveryFee ?? 0))
  multipartData.append(
    'freeShippingConditions',
    String(form.deliveryMinFee ?? 0),
  )
  multipartData.append('boardDetailRequest.content', processedContent)

  // 옵션들
  form.options.forEach((option, index) => {
    const optionFields = mapOption(option, index)
    Object.entries(optionFields).forEach(([key, value]) => {
      multipartData.append(key, String(value))
    })
  })

  // 상품 정보 고시
  Object.entries(form.productInfoNotice).forEach(([key, value]) => {
    multipartData.append(`productInfoNoticeRequest.${key}`, value)
  })

  return multipartData
}
