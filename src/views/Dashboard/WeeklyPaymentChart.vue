<template>
  <CChartBar
    class="mb-1"
    :datasets="defaultDatasets"
    :labels="['Sunday', 'Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday']"
  />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'CChartBarExample',
  components: { CChartBar },
  props: ['weekly_payments'],
  computed: {
    defaultDatasets () {
      if(this.weekly_payments){
        var last_week = [0, 0, 0, 0, 0, 0, 0, 0];
        var current_week = [0, 0, 0, 0, 0, 0, 0, 0];
        if(this.weekly_payments.data){
          var middle = new Date(this.weekly_payments.middle).toLocaleDateString();
          
          this.weekly_payments.data.forEach(item => {
            var getIndex = new Date(item.month + ' ' + item.day + ', ' + item.year);
            
            var item_date = new Date(item.month + ' ' + item.day + ', ' + item.year).toLocaleDateString();
            console.log(middle);
            if(item_date > middle){
              last_week.splice(getIndex.getDay(), 1 ,item.data);
            }else{
              current_week.splice(getIndex.getDay(), 1 ,item.data);
            }
          })
        }
      }
      
      return [
        {
          label: 'This Week Payments',
          backgroundColor: '#A2D37D',
          data: current_week
        },
        {
          label: 'Last Week Payments',
          backgroundColor: '#D46EBF',
          data: last_week
        },
      ]
    }
  }
}
</script>
