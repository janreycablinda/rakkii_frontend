<template>
    <CModal
      title="EDIT COMPLETED TIMELINE"
      color="primary"
      :show.sync="showEditCompletedModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
    <template #header>
        <h5 align="center">EDIT COMPLETED TIMELINE</h5>
    </template>
        <CInput
            type="date"
            label="Commitment Date *"
        />
        <CInput
            type="date"
            label="Date Done *"
        />
        <CInput
            label="Assign *"
        />
        <CInput
            label="Panels *"
        />
        <CInput
            label="Date Done *"
        />
        <CTextarea
            label="Remarks"
        />
        <template #footer>
            <CButton @click="showEditCompletedModal = false" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="hideCompletedModal" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showEditCompletedModal: false
        }
    },
    props: ['EditCompletedModalData'],
    watch: {
        EditCompletedModalData(){
            this.showEditCompletedModal = true;
        }
    },
    methods: {
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showEditCompletedModal = false;
        }
    }
}
</script>