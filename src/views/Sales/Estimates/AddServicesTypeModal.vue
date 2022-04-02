<template>
    <CModal
      title="ADD SERVICES TYPE"
      color="primary"
      :show.sync="showModalAddServicesType"
      centered
      :closeOnBackdrop="false"
    >
            <CForm >
                <CRow class="mt-3">
                    <CCol lg="12">
                        <CInput
                            onblur="this.placeholder = 'Services Type Name'" 
                            onfocus="this.placeholder = ''" 
                            description="Services Type Name" 
                            placeholder="Services Type Name"
                            v-model="form.name"
                            invalidFeedback="Services type name is required!"
                            :value.sync="$v.form.name.$model"
                            :isValid="checkIfValid('name')"
                        />
                    </CCol>
                </CRow>
            </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-type-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddServicesType = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddServicesType: false,
            form: this.getFormData(),
        }
    },
    validations: {
        form: {
            name: { required }
        }
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
    props: ['AddServicesTypeData'],
    watch: {
        AddServicesTypeData(){
            this.showModalAddServicesType = true;
        }
    },
    methods: {
        checkIfValid(fieldName) {
            let field = this.$v.form[fieldName];
            if (!field.$dirty) return null
            return !(field.$invalid || field.$model === '')
        },
        submit() {
            this.$v.form.$touch()
            if (!this.$v.form.$invalid) {
                this.$root.btn_load(true, 'add-services-type-btn-modal', 'ADD');
                this.$store.dispatch('services_type/addServicesType', this.form)
                .then(() => {
                    this.$root.btn_load(false, 'add-services-type-btn-modal', 'ADD');
                    this.showModalAddServicesType = false;
                    this.form = this.getFormData();
                });
            }
        },
        getFormData(){
            return {
                name: '',
            }
        },
    },
}
</script>