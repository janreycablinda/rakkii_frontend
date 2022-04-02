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
                            onblur="this.placeholder = 'Supplier *'" 
                            onfocus="this.placeholder = ''"
                            description="Supplier *"
                            placeholder="Supplier *"
                            v-model="form.supplier_name"
                            invalidFeedback="Supplier is required!"
                            :value.sync="$v.form.supplier_name.$model"
                            :isValid="checkIfValid('supplier_name')"
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
                        <CInput
                            onblur="this.placeholder = 'Contact Person *'" 
                            onfocus="this.placeholder = ''"
                            description="Contact Person *"
                            placeholder="Contact Person *"
                            v-model="form.contact_person"
                            invalidFeedback="Contact person is required!"
                            :value.sync="$v.form.contact_person.$model"
                            :isValid="checkIfValid('contact_person')"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Contact No. *'" 
                            onfocus="this.placeholder = ''"
                            description="Contact No. *"
                            placeholder="Contact No. *"
                            v-model="form.phone"
                            invalidFeedback="Contact no. is required!"
                            :value.sync="$v.form.phone.$model"
                            :isValid="checkIfValid('phone')"
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
                            v-model="form.tin"
                            invalidFeedback="TIN is required!"
                            :value.sync="$v.form.tin.$model"
                            :isValid="checkIfValid('tin')"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                            onblur="this.placeholder = 'Terms'" 
                            onfocus="this.placeholder = ''"
                            description="Terms"
                            placeholder="Terms"
                            v-model="form.terms"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CSelect
                            placeholder="Nothing Selected"
                            :value.sync="form.payment_mode"
                            :options="['Cash', 'Check']"
                            onblur="this.placeholder = 'Mode of Payment'" 
                            onfocus="this.placeholder = ''" 
                            description="Mode of Payment"
                        />
                    </CCol>
                    <CCol v-if="form.payment_mode == 'Check'" lg="6">
                        <CSelect
                            :value.sync="form.check_dated"
                            :options="['PDC30', 'PDC60', 'PDC90', 'PDC120']"
                            placeholder="Nothing Selected"
                            onblur="this.placeholder = 'Dated'" 
                            onfocus="this.placeholder = ''" 
                            description="Dated"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CSelect
                            :value.sync="form.shipping_mode"
                            :options="['Deliver', 'Pickup']"
                            placeholder="Nothing Selected"
                            onblur="this.placeholder = 'Shipping Mode'" 
                            onfocus="this.placeholder = ''" 
                            description="Shipping Mode"
                        />
                    </CCol>
                    <CCol v-if="form.shipping_mode == 'Deliver'" lg="6">
                        <CSelect
                            :value.sync="form.deliver_type"
                            placeholder="Nothing Selected"
                            :options="['Free', 'Delivery Fee']"
                            onblur="this.placeholder = 'Deliver'" 
                            onfocus="this.placeholder = ''" 
                            description="Deliver"
                        />
                    </CCol>
                    <CCol v-if="form.deliver_type == 'Delivery Fee'" lg="6">
                        <CInput
                            onblur="this.placeholder = 'Specify Cost:'" 
                            onfocus="this.placeholder = ''"
                            description="Specify Cost:"
                            placeholder="Specify Cost:"
                            v-model="form.deliver_cost"
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
import { required } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            placement: 'bottom',
            showModalAddSupplier: false,
            form: this.getFormData(),
        }
    },
    validations: {
        form: {
            supplier_name: { required },
            tin: { required },
            contact_person: { required },
            phone: { required },
            payment_mode: { required },
            shipping_mode: { required },
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
        checkIfValid(fieldName) {
            let field = this.$v.form[fieldName];
            if (!field.$dirty) return null
            return !(field.$invalid || field.$model === '')
        },
        submit() {
            this.$v.form.$touch()
            if (!this.$v.form.$invalid) {
                this.$root.btn_load(true, 'add-services-sub-btn-modal', 'ADD');
                this.$store.dispatch('supplier/addSupplier', this.form)
                .then(() => {
                    this.$root.btn_load(false, 'add-services-sub-btn-modal', 'ADD');
                    this.showModalAddSupplier = false;
                    this.form = this.getFormData();
                });
            }
        },
        openAddVehicle(){

        },
        getFormData(){
            return {
                supplier_name: '',
                tin: '',
                contact_person: '',
                phone: '',
                email: '',
                address: '',
                terms: '',
                payment_mode: '',
                check_dated: '',
                shipping_mode: '',
                deliver_type: '',
                deliver_cost: ''
            }
        },
    },
}
</script>