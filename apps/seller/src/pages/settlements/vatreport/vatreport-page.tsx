import SettlementTitles from '@/features/settlement/common/titles'
import Layout from '../layout'
import { vatDescriptions } from '@/entity/settlement/vatreport/constants'

const Vatreport = () => {
  return (
    <Layout>
      <SettlementTitles
        title="부가세 신고 내역"
        descriptions={vatDescriptions}
      />
    </Layout>
  )
}

export default Vatreport
