<template>
  <CChartBar
    class="mb-1"
    :datasets="defaultDatasets"
    :labels="['Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
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
          label: 'This Week Payments',
          backgroundColor: '#A2D37D',
          data: [10]
        },
        {
          label: 'Last Week Payments',
          backgroundColor: '#D46EBF',
          data: [20]
        },
      ]
    }
  }
}
</script>
