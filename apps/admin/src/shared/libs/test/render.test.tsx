import { render, screen } from '@dessert/core/test'

describe('커스텀 render 유틸리티', () => {
  it('JSX를 DOM에 렌더링한다', () => {
    render(<div>테스트 텍스트</div>)

    expect(screen.getByText('테스트 텍스트')).toBeInTheDocument()
  })
})
