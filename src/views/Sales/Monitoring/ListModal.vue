<template>
    <CModal
      title="PENDING JOB ORDER"
      color="primary"
      :show.sync="showListModal"
      centered
      size="lg"
      :closeOnBackdrop="false"
    >
        <JobOrderTable
        :items="pending"
        />
        <template #footer>
            <!-- <CButton @click="showListModal = false" color="primary" class="branding-btn">SUBMIT</CButton> -->
            <CButton @click="showListModal = false" color="danger">Close</CButton>
        </template>
    </CModal>
</template>
<script>
import JobOrderTable from './JobOrderTable';

export default {
    data(){
        return {
            showListModal: false
        }
    },
    components: {
        JobOrderTable
    },
    props: ['ListModalData'],
    watch: {
        ListModalData(){
            this.showListModal = true;
        }
    },
    computed: {
        pending(){
            let items =[];
            if(this.$store.state.job_orders.job_orders){
                this.$store.state.job_orders.job_orders.forEach(item => {
                    if(item.status == 'pending'){
                        items.push(item);
                    }
                });
            }
            return items;
        },
    },
    methods: {
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showCompletedModal = false;
        }
    }
}
</script>