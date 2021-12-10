<template>
    <CModal
      title="EDIT INPROGRESS TIMELINE"
      color="primary"
      :show.sync="showCompletedModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
        <template #header>
            <h5>COMPLETE {{header}}</h5>
        </template>
       <CInput
            type="date"
            v-model="form.date_done"
            onblur="this.placeholder = 'Date Done *'" 
            onfocus="this.placeholder = ''" 
            description="Date Done *" 
            placeholder="Date Done *"
        />
        <CTextarea
            v-model="form.remarks"
            onblur="this.placeholder = 'Remarks *'" 
            onfocus="this.placeholder = ''" 
            description="Remarks *" 
            placeholder="Remarks *"
        />
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="hideCompletedModal" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showCompletedModal: false,
            header: '',
            form: {
                job_order_id: '',
                timeline_id: '',
                date_done: '',
                remarks: ''
            }
        }
    },
    props: ['CompletedModalData'],
    watch: {
        CompletedModalData(data){
            this.header = data.timeline_name;
            this.form.job_order_id = data.id;
            this.form.timeline_id = data.timeline_id;
            this.showCompletedModal = true;
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('job_orders/completeTimeline', this.form).then(() => {
                this.showCompletedModal = false;
                this.form = {
                    job_order_id: '',
                    timeline_id: '',
                    date_done: '',
                    remarks: ''
                }
                this.$router.replace({
                    name: "Monitoring"
                });
            });
        },
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showCompletedModal = false;
        }
    }
}
</script>