import { CREATE_FORM_STEP_IDS } from './create-header.constant'
import { ProductStageCompletion } from './create-header-store.type'

export type ProductStageKey = (typeof CREATE_FORM_STEP_IDS)[number]

export function isStageComplete(
  stageKey: ProductStageKey,
  productFields: ProductStageCompletion,
): boolean {
  return productFields[stageKey] ?? false
}

export function getCompletedSteps(
  productFields: ProductStageCompletion,
): boolean[] {
  return CREATE_FORM_STEP_IDS.map((id) => isStageComplete(id, productFields))
}
