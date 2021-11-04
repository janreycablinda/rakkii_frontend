<template>
  <CChartBar
    class="mb-1"
    :datasets="defaultDatasets"
    :labels="['stats']"
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
          label: 'Not Started',
          backgroundColor: '#989898',
          data: [10]
        },
        {
          label: 'In Progress',
          backgroundColor: '#03A9F4',
          data: [20]
        },
        {
          label: 'On Hold',
          backgroundColor: '#FF6F00',
          data: [30]
        },
        {
          label: 'Cancelled',
          backgroundColor: '#989898',
          data: [40]
        },
        {
          label: 'Finished',
          backgroundColor: '#84C529',
          data: [50]
        }
      ]
    }
  }
}
</script>
