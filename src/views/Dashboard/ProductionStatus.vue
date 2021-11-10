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
          label: 'Ongoing Tinsmith',
          backgroundColor: '#989898',
          data: [10]
        },
        {
          label: 'Ongoing Painter',
          backgroundColor: '#03A9F4',
          data: [20]
        },
        {
          label: 'Ongoing Mechanical',
          backgroundColor: '#FF6F00',
          data: [30]
        },
      ]
    }
  }
}
</script>
