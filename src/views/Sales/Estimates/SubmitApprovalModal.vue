<template>
    <CModal
      title="INSURANCE INFORMATION"
      color="primary"
      :show.sync="showModalSaveAndSend"
      centered
      :closeOnBackdrop="false"
    >
        <CForm >
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Insurance'" 
                        onfocus="this.placeholder = ''" 
                        description="Insurance" 
                        placeholder="Insurance"
                        v-model="form.insurance"
                    />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Email'" 
                        onfocus="this.placeholder = ''" 
                        description="Email" 
                        placeholder="Email"
                        v-model="form.email"
                    />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <vue-editor :content="content"></vue-editor>
                </CCol>
            </CRow>
            
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-type-btn-modal" color="primary" class="branding-btn">SEND & SAVE</CButton>
            <CButton @click="showModalSaveAndSend = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
    data(){
        return {
            placement: 'bottom',
            showModalSaveAndSend: false,
            form: this.getFormData(),
            content: ''
        }
    },
    components: {
        VueEditor
    },
    filters: {
        countryFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.nicename, value: item.nicename})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['AddSaveAndSendData'],
    watch: {
        AddSaveAndSendData(data){
            console.log(data.data);
            this.form.insurance = data.data.insurance.label;
            this.showModalSaveAndSend = true;
            this.$store.dispatch('estimate/addEstimateSaveSend');
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'add-services-type-btn-modal', 'ADD');
            this.$store.dispatch('services_type/addServicesType', this.form).then(() => {
                this.$root.btn_load(false, 'add-services-type-btn-modal', 'ADD');
                this.showModalSaveAndSend = false;
                this.form = this.getFormData();
            });
        },
        getFormData(){
            return {
                insurance: '',
                email: '',
                message: ''
            }
        },
    },
}
</script>