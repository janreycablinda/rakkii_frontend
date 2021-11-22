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
            <h5>EDIT INPROGRESS TIMELINE</h5>
        </template>
       <CInput
            type="date"
            label="Date Done *"
        />
        <CTextarea
            label="Remarks"
        />
        <template #footer>
            <CButton @click="showCompletedModal = false" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="hideCompletedModal" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showCompletedModal: false
        }
    },
    props: ['CompletedModalData'],
    watch: {
        CompletedModalData(){
            this.showCompletedModal = true;
        }
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