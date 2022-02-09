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
  props:['job_orders', 'cash_collected', 'cash_collectables'],
  computed: {
    defaultDatasets () {
      if(this.cash_collected){
        var data = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < 12; i++) {
          if(this.cash_collected[i]){
            data.splice(this.cash_collected[i].month-1, 1 ,this.cash_collected[i].amount);
          }
        }
      }
      if(this.cash_collectables){
        var data_collectables = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < 12; i++) {
          if(this.cash_collectables[i]){
            let sub = parseInt(this.cash_collectables[i].total_payables) - parseInt(this.cash_collectables[i].discount);
            console.log(sub);
            data_collectables.splice(this.cash_collectables[i].month-1, 1 ,sub);
          }
        }
      }
      return [
        {
          label: 'Cash Collected',
          backgroundColor: '#2E58A6',
          data: data
        },
        {
          label: 'Cash Collectables',
          backgroundColor: '#C69446',
          data: data_collectables
        },
      ]
    }
  }
}
</script>
