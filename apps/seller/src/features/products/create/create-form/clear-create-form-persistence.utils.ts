import { useCreateDraftStore } from '../create-draft/create-draft-store'
import { useCreateHeaderStore } from '../create-header/create-header-store.store'
import { useCreateFormSessionStore } from './create-form-session.store'
import { useProductCreationStore } from './product-creation.store'

const INITIAL_PRODUCT_FIELDS = {
  productInfo: false,
  productDelivery: false,
  productThumbnail: false,
  productOptions: false,
  productDetail: false,
  productDisclosure: false,
} as const

export function clearCreateFormSession() {
  useCreateFormSessionStore.getState().clearSession()
  useProductCreationStore.getState().reset()

  useCreateHeaderStore.setState({
    productFields: { ...INITIAL_PRODUCT_FIELDS },
    nutritionDataList: [
      { sugar: null, protein: null, fat: null, ingredientCategories: [] },
    ],
  })
}

export function clearCreateFormPersistence() {
  clearCreateFormSession()
  useCreateDraftStore.getState().clearDraft()
}
