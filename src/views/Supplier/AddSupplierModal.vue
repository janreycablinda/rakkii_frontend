<template>
    <CModal
      title="ADD SUPPLIER"
      color="primary"
      :show.sync="showModalAddSupplier"
      centered
      :closeOnBackdrop="false"
      size="lg"
    >
            <CForm >
                <CRow class="mt-3">
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Supplier'" 
                            onfocus="this.placeholder = ''"
                            description="Supplier"
                            placeholder="Supplier"
                            v-model="form.insurance_name"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CTextarea
                            onblur="this.placeholder = 'Address'" 
                            onfocus="this.placeholder = ''"
                            description="Address"
                            placeholder="Address"
                            v-model="form.address"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CSelect
                            :value.sync="form.insurance_type"
                            placeholder="Nothing Selected"
                            :options="['Private Insurance', 'Third Party Claim', 'GSIS', 'Bidding']"
                            onblur="this.placeholder = 'Insurance Type'" onfocus="this.placeholder = ''" description="Insurance Type"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Contact Person'" 
                            onfocus="this.placeholder = ''"
                            description="Contact Person"
                            placeholder="Contact Person"
                            v-model="form.contact_person"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Contact No.'" 
                            onfocus="this.placeholder = ''"
                            description="Contact No."
                            placeholder="Contact No."
                            v-model="form.phone"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Email'" 
                            onfocus="this.placeholder = ''"
                            description="Email"
                            placeholder="Email"
                            v-model="form.email"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Tin No.:'" 
                            onfocus="this.placeholder = ''"
                            description="Tin No.:"
                            placeholder="Tin No.:"
                            v-model="form.email"
                        />
                    </CCol>
                </CRow>
            </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-sub-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddSupplier = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddSupplier: false,
            form: this.getFormData(),
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
    props: ['AddSupplierData'],
    watch: {
        AddSupplierData(data){
            this.showModalAddSupplier = true;
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'add-services-sub-btn-modal', 'ADD');
            this.$store.dispatch('insurance/addInsurance', this.form).then(() => {
                this.$root.btn_load(false, 'add-services-sub-btn-modal', 'ADD');
                this.showModalAddSupplier = false;
                this.form = this.getFormData();
            });
        },
        openAddVehicle(){

        },
        getFormData(){
            return {
                insurance_name: '',
                insurance_type: '',
                contact_person: '',
                phone: '',
                email: '',
                address: '',
            }
        },
    },
}
</script>