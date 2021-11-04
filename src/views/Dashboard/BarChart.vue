<template>
  <CChartBar
    :datasets="defaultDatasets"
    labels="months"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'CChartBarExample',
  components: { CChartBar },
  computed: {
    defaultDatasets () {
      return [
        {
          label: 'Cash Collected',
          backgroundColor: '#2E58A6',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: 'Expenses',
          backgroundColor: '#FBB03B',
          data: [30, 10, 10, 29, 5, 30, 29, 70, 30, 10, 10, 10]
        },
        {
          label: 'Receivable',
          backgroundColor: '#3C4B64',
          data: [30, 10, 10, 29, 5, 30, 29, 70, 30, 10, 10, 10]
        }
      ]
    }
  }
}
</script>
