<template>
    <CModal
      title="ADD UNIT"
      color="primary"
      :show.sync="showModalAddUnit"
      centered
      :closeOnBackdrop="false"
      size="sm"
    >
        <CForm>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Unit Name'" 
                        onfocus="this.placeholder = ''" 
                        description="Unit Name" 
                        placeholder="Unit Name"
                        v-model="form.name"
                        invalidFeedback="Unit name is required!"
                        :value.sync="$v.form.name.$model"
                        :isValid="checkIfValid('name')"
                    />
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-unit-btn" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddUnit = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddUnit: false,
            form: this.getFormData(),
        }
    },
    validations: {
        form: {
            name: { required },
        }
    },
    props: ['AddUnitData'],
    watch: {
        AddUnitData(data){
            this.showModalAddUnit = true;
        },
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
                this.$root.btn_load(true, 'add-unit-btn', 'ADD');
                this.$store.dispatch('unit/addUnit', this.form).then(() => {
                    this.$root.btn_load(false, 'add-unit-btn', 'ADD');
                    this.form = this.getFormData();
                    this.showModalAddUnit = false;
                });
            }
        },
        getFormData(){
            return {
                name: ''
            }
        },
    },
    created(){
        this.$store.dispatch('agent/fetchAgent');
    }
}
</script>