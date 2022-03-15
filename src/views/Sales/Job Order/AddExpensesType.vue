<template>
    <CModal
      title="ADD EXPENSES TYPE"
      color="primary"
      :show.sync="showModalAddExpensesType"
      centered
      :closeOnBackdrop="false"
      size="sm"
    >
        <CForm>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Expenses Type Name'" 
                        onfocus="this.placeholder = ''" 
                        description="Expenses Type Name" 
                        placeholder="Expenses Type Name"
                        v-model="form.expenses_name"
                    />
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-expenses-type-btn" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddExpensesType = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddExpensesType: false,
            form: this.getFormData(),
        }
    },
    props: ['AddExpensesTypeData'],
    watch: {
        AddExpensesTypeData(data){
            this.showModalAddExpensesType = true;
        },
    },
    methods: {
        submit(){

            this.$root.btn_load(true, 'add-expenses-type-btn', 'ADD');
            this.$store.dispatch('expenses_type/createExpensesType', this.form).then(() => {
                this.$root.btn_load(false, 'add-expenses-type-btn', 'ADD');
                this.form = this.getFormData();
                this.showModalAddExpensesType = false;
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
                expenses_name: ''
            }
        },
    },
    created(){
        this.$store.dispatch('agent/fetchAgent');
    }
}
</script>