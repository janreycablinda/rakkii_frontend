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
      
      if(this.job_orders){
        // this.job_orders.forEach(item => {
        //     item.timeline.forEach(timeline => {
        //         if(timeline.personal_type == '')
        //     })
        // });
      }
      
      if(this.$store.state.services_type.services_type){
        var dataset = [];
        this.$store.state.services_type.services_type.forEach(item => {
            var sum = 0;
            if(this.job_orders){
              this.job_orders.forEach(job_order => {
                  job_order.timeline.forEach(timeline => {
                    if(timeline.status == 'inprogress'){
                      if(timeline.services_type.name == item.name){
                        sum += 1;
                      }
                    }
                  })
              });
            }

            dataset.push({
              label: 'Ongoing '+ item.name,
              backgroundColor: '#' +Math.floor(Math.random()*16777215).toString(16),
              data: [sum]
            });
        })
      }
      return dataset;
    }
  },
  created(){
    this.$store.dispatch('services_type/fetchServicesType');
  }
}
</script>
