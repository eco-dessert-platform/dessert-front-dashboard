// FE는 ID를 string으로 들고 다니다 wire 직전에만 number(int64)로 변환한다.
// invalid 값(예: NaN)은 잘라낸다.
export function toWireOrderItemIds(orderItemIds: string[]): number[] {
  return orderItemIds
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id))
}
