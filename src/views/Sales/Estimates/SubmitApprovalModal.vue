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
            <CButton @click="submit" id="save-and-send-btn" color="primary" class="branding-btn">SEND & SAVE</CButton>
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
    props: ['AddSaveAndSendData'],
    watch: {
        AddSaveAndSendData(data){
            console.log(data.data)
            this.form_modal.insurance = data.data.insurance.label;
            this.form_modal.email = data.data.insurance.email;
            this.form_modal.phone = data.data.insurance.phone;
            this.form_modal.message = '<p>Dear ' + data.data.insurance.contact_person + ',</p><br /><p>Thank you for your estimate request.</p><p>Download the attachment to view document required.</p><p>Please contact us for more information.</p><br /><p>Kind Regards,</p><p>{email_signature}</p>';
            this.form = data.data;
            this.showModalSaveAndSend = true;
        }
    },
    methods: {
        submit(){
          let formData = new FormData();
          formData.append('status', 'Sent');
          formData.append('customer_id', this.form.customer_id.value);
          formData.append('date', this.form.date);
          formData.append('insurance', this.form.insurance.value);
          formData.append('vehicle_id', this.form.vehicle_id.value);
          var services = JSON.stringify(this.form.services);
          formData.append('services', services);
          var documents = JSON.stringify(this.form.documents);
          formData.append('documents', documents);
          this.form.documents.forEach(item => {
          formData.append('files[]', item.files);
            if(item.prefix == 'P'){
              Array.from(item.files).forEach(pic => {
                console.log(pic);
                formData.append('pic[]', pic);
              });
            }
          });

          var message = JSON.stringify(this.form_modal.message);
          formData.append('form_email', this.form_modal.email);
          formData.append('form_message', message);

          formData.append('user_id', this.$store.getters['auth/user'].id);
            const config = {
                  headers: { 'content-type': 'multipart/form-data' }
            }
            const params = {
              formData: formData,
              config: config
            }
            this.$root.btn_load(true, 'save-and-send-btn', 'SAVE & SEND');
            this.$store.dispatch('estimate/addEstimateSaveSend', params).then(() => {
                this.$root.btn_load(false, 'save-and-send-btn', 'SAVE & SEND');
                this.$router.replace({
                    name: "Estimates"
                });
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
                insurance: '',
                email: '',
                phone: '',
                message: ''
            }
        },
    },
}
</script>