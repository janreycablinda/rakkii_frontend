<template>
    <CModal
      title="START WORK"
      color="primary"
      :show.sync="showStartModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
    <template #header>
        <h5 align="center">START WORK</h5>
    </template>
        <CInput
            type="date"
            label="Commitment Date *"
        />
        <CInput
            label="Assign *"
        />
        <CInput
            label="Panels *"
        />
        <template #footer>
            <CButton @click="showStartModal = false" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="hideCompletedModal" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showStartModal: false
        }
    },
    props: ['StartData'],
    watch: {
        StartData(){
            this.showStartModal = true;
        }
    },
    methods: {
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showStartModal = false;
        }
    }
}
</script>