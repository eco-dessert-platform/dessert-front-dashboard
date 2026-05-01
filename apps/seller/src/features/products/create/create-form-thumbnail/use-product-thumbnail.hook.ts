import { useState } from 'react'

import { toast } from '@dessert/ui'
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useFormContext } from 'react-hook-form'

//import { CreateFormType } from '@/entity/products/create/create-form'
import { CreateProductForm } from '../create-form/product-create.types'
//추후 type과 상수 관련 파일 수정하며 CreateProductForm -> CreateFormType으로 변경 예정

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const MIN_SIZE = 160

const validateImage = (
  file: File,
): Promise<{ error: string | null; warning: string | null }> => {
  return new Promise((resolve) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      resolve({
        error: 'jpg, jpeg, png 형식의 이미지만 업로드 가능해요',
        warning: null,
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      resolve({ error: '10MB 이하의 이미지만 업로드 가능해요', warning: null })
      return
    }

    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let warning = null
      if (
        img.width < MIN_SIZE ||
        img.height < MIN_SIZE ||
        img.width !== img.height
      ) {
        warning = '권장 크기는 1000×1000 (1:1 비율)이에요'
      }
      resolve({ error: null, warning })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve({ error: '이미지를 읽을 수 없어요', warning: null })
    }
    img.src = url
  })
}

export function useProductThumbnailForm() {
  const form = useFormContext<CreateProductForm>()

  const mainImage = form.watch('mainImage')
  const extraImages = form.watch('extraImages') || []

  const [deleteTarget, setDeleteTarget] = useState<string | 'main' | null>(null)

  const isFormField = mainImage !== null

  const handleMainImageChange = (file: File | null) => {
    form.setValue('mainImage', file, { shouldValidate: true })
  }

  const handleExtraImagesChange = (files: File[]) => {
    form.setValue('extraImages', files, { shouldValidate: true })
  }

  const handleReorderExtraImages = (newImages: File[]) => {
    form.setValue('extraImages', newImages, { shouldValidate: true })
  }
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const images = extraImages as File[]
      const oldIndex = images.findIndex(
        (f) => `${f.name}-${f.lastModified}` === active.id,
      )
      const newIndex = images.findIndex(
        (f) => `${f.name}-${f.lastModified}` === over.id,
      )
      if (oldIndex < 0 || newIndex < 0) return
      handleReorderExtraImages(arrayMove(images, oldIndex, newIndex))
    }
  }

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'extra',
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (type === 'main') {
      const file = files[0]
      const { error, warning } = await validateImage(file)
      if (error) {
        toast.error(error)
        e.target.value = ''
        return
      }
      if (warning) toast.info(warning)
      handleMainImageChange(file)
    } else {
      const remainingSlots = 9 - extraImages.length
      const selectedFiles = Array.from(files).slice(0, remainingSlots)
      const validFiles: File[] = []

      for (const file of selectedFiles) {
        const { error, warning } = await validateImage(file)
        if (error) {
          toast.error(`${file.name}: ${error}`)
        } else {
          if (warning) toast.info(`${file.name}: ${warning}`)
          validFiles.push(file)
        }
      }

      if (validFiles.length > 0) {
        handleExtraImagesChange([...extraImages, ...validFiles])
      }
    }
    e.target.value = ''
  }

  const handleImageDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget === 'main') {
      handleMainImageChange(null)
    } else {
      // deleteTarget이 'main'이 아닌 문자열(fileId)인 경우
      const newExtraImages = (extraImages as File[]).filter(
        (f) => `${f.name}-${f.lastModified}` !== deleteTarget,
      )
      handleExtraImagesChange(newExtraImages)
    }
    setDeleteTarget(null)
  }

  return {
    form,
    mainImage,
    extraImages,
    isFormField,
    deleteTarget,
    sensors,
    setDeleteTarget,
    handleFileChange,
    handleImageDelete,
    handleReorderExtraImages,
    handleDragEnd,
  }
}
