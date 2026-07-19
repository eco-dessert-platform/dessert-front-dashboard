import { Tab, TabContent, TabList, TabTrigger, toast } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'

import { getDailySettlementsExcel } from '@/entity/settlement/settlement.api'
import { settlementQueries } from '@/entity/settlement/settlement.query'
import { DailySettlementTable } from '@/features/settlement/history/history-daily-table'
import { SettlementFilter } from '@/features/settlement/history/history-filter'
import { SettlementOverview } from '@/features/settlement/history/history-overview'
import { TransactionSettlementTable } from '@/features/settlement/history/history-transaction-table'
import { useDailySettlementFilter } from '@/features/settlement/history/model/use-daily-settlement-filter'
import { useSettlementFilter } from '@/features/settlement/history/model/use-settlement-filter'
import { downloadBlob } from '@/shared/utils/download-file'

import Layout from './layout'

const SettlementPage = () => {
  const {
    draftFilters: dailyDraftFilters,
    setDraftFilters: setDailyDraftFilters,
    appliedFilters: dailyAppliedFilters,
    apply: applyDailyFilters,
    setPage: setDailyPage,
  } = useDailySettlementFilter()

  const { data: dailyData } = useQuery(
    settlementQueries.daily(dailyAppliedFilters),
  )

  const { draftFilters, setDraftFilters, appliedFilters, apply, setPage } =
    useSettlementFilter()

  const handleDownloadDailyExcel = async () => {
    if (!dailyAppliedFilters.startDate || !dailyAppliedFilters.endDate) {
      toast.error('조회기간을 먼저 선택한 후 조회해주세요.', undefined, {
        position: 'bottom-right',
      })
      return
    }

    try {
      const blob = await getDailySettlementsExcel({
        startDate: dailyAppliedFilters.startDate,
        endDate: dailyAppliedFilters.endDate,
      })

      if (!blob) {
        toast.info('정산목록 엑셀 파일이 다운로드 되었어요.', undefined, {
          position: 'bottom-right',
        })
        return
      }

      downloadBlob(blob, '일별_정산내역.xlsx')
      toast.success('정산목록 엑셀 파일이 다운로드 되었어요.', undefined, {
        position: 'bottom-right',
      })
    } catch {
      toast.error('엑셀 다운로드에 실패했습니다.', undefined, {
        position: 'bottom-right',
      })
    }
  }

  return (
    <Layout>
      <Tab defaultValue="daily" variant="btn">
        <TabList>
          <TabTrigger value="daily">일별 정산내역</TabTrigger>
          <TabTrigger value="transaction">건별 정산내역</TabTrigger>
        </TabList>

        {/** Tab의 gap-2(8px) 때문에 mt-20(80px) 대신 mt-[18px] 사용 */}
        <TabContent value="daily" className="mt-[18px] space-y-10">
          <SettlementOverview
            filters={dailyDraftFilters}
            onChange={setDailyDraftFilters}
            onSearch={applyDailyFilters}
            summary={dailyData?.summary}
          />
          <DailySettlementTable
            pageResponse={dailyData?.settlements}
            onPageChange={(page) => setDailyPage(page - 1)}
            onDownloadExcel={handleDownloadDailyExcel}
          />
        </TabContent>

        {/** Tab의 gap-2(8px) 때문에 mt-20(80px) 대신 mt-[18px] 사용 */}
        <TabContent value="transaction" className="mt-[18px] space-y-10">
          <SettlementFilter
            filters={draftFilters}
            onChange={setDraftFilters}
            onSearch={apply}
          />
          <TransactionSettlementTable
            filters={appliedFilters}
            onPageChange={setPage}
          />
        </TabContent>
      </Tab>
    </Layout>
  )
}

export default SettlementPage
