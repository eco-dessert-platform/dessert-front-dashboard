import {
  SerializableFormData,
  useCreateFormSessionStore,
} from './create-form-session.store'
import { CreateProductForm } from './product-create.types'

function readSessionFormDataFromStorage(): SerializableFormData | null {
  try {
    const raw = sessionStorage.getItem('product-create-session')
    if (!raw) return null

    const parsed = JSON.parse(raw) as {
      state?: { formData?: SerializableFormData | null }
    }
    return parsed.state?.formData ?? null
  } catch {
    return null
  }
}

export function buildSessionPayload(
  formValues: CreateProductForm,
  productDetail: string,
) {
  const { mainImage, extraImages, ...rest } = formValues

  return {
    formData: { ...rest, productDetail },
    fileData: { mainImage, extraImages },
  }
}

export function getSessionFormDefaults(): Partial<CreateProductForm> | undefined {
  const { formData: memoryFormData, fileData } =
    useCreateFormSessionStore.getState()
  const formData = memoryFormData ?? readSessionFormDataFromStorage()
  if (!formData) return undefined

  const { productDetail: _productDetail, ...rest } = formData
  return {
    ...rest,
    mainImage: fileData?.mainImage ?? null,
    extraImages: fileData?.extraImages ?? [],
  }
}

export function getStoredSessionFormData(): SerializableFormData | null {
  return (
    useCreateFormSessionStore.getState().formData ??
    readSessionFormDataFromStorage()
  )
}

export function getSavedProductDetail(): string {
  const formData = getStoredSessionFormData()
  return formData?.productDetail ?? ''
}
