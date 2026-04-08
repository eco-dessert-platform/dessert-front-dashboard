import { Button, Input } from '@dessert/ui'

import { useLoginForm } from './login-form.hook'

export const LoginForm = () => {
  const { register, handleSubmit, onSubmit, isValid, isPending } =
    useLoginForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col justify-center gap-3.75 px-5 py-10 lg:py-0"
    >
      <div className="flex flex-col items-start gap-1">
        <h1 className="typo-heading-18-b text-gray-900">🎉 환영합니다</h1>
        <p className="typo-title-16-m whitespace-pre-wrap text-gray-900">
          빵그리의 오븐 <span className="text-primary-500">어드민 채널</span>
          입니다.
          <br />
          로그인 또는 회원가입을 진행하시려면 아래 버튼을 눌러주세요.
        </p>
      </div>

      <div>
        <Input
          label="아이디"
          required
          placeholder="아이디를 입력해주세요"
          {...register('accountId')}
        />
        <Input
          label="비밀번호"
          type="password"
          className="mt-5"
          required
          placeholder="비밀번호를 입력해주세요"
          {...register('password')}
        />
      </div>

      <Button
        title="로그인"
        className="mt-10 ml-auto max-w-56"
        size="lg"
        disabled={!isValid || isPending}
      />
    </form>
  )
}
