/**
 * 다건 비동기 작업을 chunk 단위로 끊어 호출하면서 모든 결과(성공/실패)를 누적한다.
 *
 * @example
 * const results = await settledInBatches(ids, 10, (id) => api.update(id))
 */
export async function settledInBatches<T, R>(
  items: T[],
  size: number,
  fn: (item: T) => Promise<R>,
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = []

  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size)
    const settled = await Promise.allSettled(chunk.map(fn))
    results.push(...settled)
  }

  return results
}
