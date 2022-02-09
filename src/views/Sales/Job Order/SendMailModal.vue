<template>
    <CModal
      title="INSURANCE INFORMATION"
      color="primary"
      :show.sync="showModalSendMail"
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
                        v-model="form_modal.insurance"
                        readonly
                    />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Contact No.'" 
                        onfocus="this.placeholder = ''" 
                        description="Contact No." 
                        placeholder="Contact No."
                        v-model="form_modal.phone"
                        readonly
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
                        v-model="form_modal.email"
                    />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <vue-editor 
                    v-model="form_modal.message"
                    >
                    </vue-editor>
                </CCol>
            </CRow>
            
        </CForm>
        <template #footer>
            <CButton @click="submit" id="send-mail-estimate-btn" color="primary" class="branding-btn">SEND</CButton>
            <CButton @click="showModalSendMail = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
    data(){
        return {
            placement: 'bottom',
            showModalSendMail: false,
            form_modal: this.getFormData(),
            form: ''
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
    props: ['SendMailData'],
    watch: {
        SendMailData(data){
            this.form_modal.insurance = data.data.insurance.insurance_name;
            this.form_modal.email = data.data.insurance.email;
            this.form_modal.phone = data.data.insurance.phone;
            this.form_modal.message = '<p>Dear ' + data.data.insurance.contact_person + ',</p><br /><p>Thank you for your estimate request.</p><p>Download the attachment to view document required.</p><p>Please contact us for more information.</p><br /><p>Kind Regards,</p><p>{email_signature}</p>';
            this.form = data.data;
            this.showModalSendMail = true;
        }
    },
    methods: {
        submit(){
            const params = {
                email: this.form_modal.email,
                message: this.form_modal.message,
                id: this.form.id
            }

            this.$root.btn_load(true, 'send-mail-estimate-btn', 'SEND');
            this.$store.dispatch('job_orders/sendJobOrderEstimateToLoa', params).then(response => {
                this.$root.btn_load(false, 'send-mail-estimate-btn', 'SEND');
                this.$emit('document_added', response);
                this.showModalSendMail = false;
            });
            // this.$root.btn_load(true, 'add-services-type-btn-modal', 'ADD');
            // this.$store.dispatch('services_type/addServicesType', this.form).then(() => {
            //     this.$root.btn_load(false, 'add-services-type-btn-modal', 'ADD');
            //     this.showModalSaveAndSend = false;
            //     this.form = this.getFormData();
            // });
        },
        getFormData(){
            return {
                id: '',
                insurance: '',
                email: '',
                phone: '',
                message: '<p>Dear {contact_firstname} {contact_lastname}</p><br /><p>Thank you for your estimate request.</p><p>Download the attachment to view document required.</p><p>Please contact us for more information.</p><br /><p>Kind Regards,</p><p>{email_signature}</p>'
            }
        },
    },
}
</script>