export type ThumbnailFormType = {
  mainImage: File | null
  extraImages: { id: string; file: File }[]
}
