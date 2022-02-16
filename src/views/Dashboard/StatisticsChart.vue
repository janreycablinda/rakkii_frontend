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
  props: ['job_orders'],
  computed: {
    defaultDatasets () {
      console.log(this.job_orders);
      var pending = 0;
      var inprogress = 0;
      var on_hold = 0;
      var cancelled = 0;
      var completed = 0;
      if(this.job_orders){
        this.job_orders.forEach(item => {
          if(item.status == 'Pending'){
            pending += 1;
          }
          if(item.status == 'Inprogress'){
            inprogress += 1;
          }
          if(item.status == 'On Hold'){
            on_hold += 1;
          }
          if(item.status == 'Cancel'){
            cancelled += 1;
          }
          if(item.status == 'Completed'){
            cancelled += 1;
          }
        })
      }
      
      return [
        {
          label: 'Pending',
          backgroundColor: '#989898',
          data: [pending, 0]
        },
        {
          label: 'In Progress',
          backgroundColor: '#F9BC08',
          data: [inprogress]
        },
        {
          label: 'On Hold',
          backgroundColor: '#000000',
          data: [on_hold]
        },
        {
          label: 'Cancelled',
          backgroundColor: '#FF0000',
          data: [cancelled]
        },
        {
          label: 'Completed(This Month)',
          backgroundColor: '#84C529',
          data: [completed]
        },
      ]
    }
  }
}
</script>
