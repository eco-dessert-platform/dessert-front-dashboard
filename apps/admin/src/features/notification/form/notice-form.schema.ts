import { z } from 'zod'

export const noticeFormSchema = z.object({
  title: z.string().trim().min(1, '공지사항명을 입력해주세요.'),
  content: z.string().trim().min(1, '내용을 입력해주세요.'),
  profileImage: z.array(z.instanceof(File)).optional(),
})

export type NoticeFormValues = z.infer<typeof noticeFormSchema>
