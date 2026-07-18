import { DailySettlementSummary } from './settlement.type'
import { Settlement } from './types'

export function toSettlement(summary: DailySettlementSummary): Settlement {
  return {
    id: summary.settlementNumber,
    expectedDate: summary.scheduledDate,
    completedDate: summary.completedDate,
    totalAmount: summary.totalSettlementAmount,
    paymentAmount: summary.amount,
    commission: summary.fee,
    deduction: summary.deductibleRefund,
    deductionDetails: {
      shippingFeeChange: summary.deductibleRefundDetail.deliveryFeeChange,
      chargeOffset: summary.deductibleRefundDetail.balanceOffset,
    },
    withheld: summary.withHoldingPayment,
    method: summary.settlementMethod,
  }
}
