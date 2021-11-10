<template>
    <CModal
      title="CAR IN"
      color="primary"
      :show.sync="showModalCarIn"
      centered
      size="sm"
    >
       <CInput
            type="date"
            label="Date In *"
            autocomplete="name"
        />
        <CInput
            type="date"
            label="Date Out *"
            autocomplete="name"
        />
        <template #footer>
            <CButton @click="showModalCarIn = false" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="showModalCarIn = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showModalCarIn: false
        }
    },
    props: ['ModalCarInData'],
    watch: {
        ModalCarInData(){
            this.showModalCarIn = true;
        }
    }
}
</script>